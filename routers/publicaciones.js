import appmiddlewarePublicaciones from "../middleware/middlewarePublicaciones.js";
import {Router} from 'express';
import dotenv from "dotenv";
import mysql from "mysql2"

dotenv.config();
const appPublicaciones = Router();



let con = undefined;
appPublicaciones.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.MY_CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to "+con);
   } 
});

appPublicaciones.get("/",(req, res) => {
    con.query(
        `SELECT post_id,user_id,animal_id,titulo,descripcion,imagen_ruta,estado,DATE_FORMAT(fecha_creacion, '%d-%m-%Y') AS fecha_creacion FROM publicaciones `, (error,data)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appPublicaciones.get("/id",(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere buscar a una usuario, debe poner id: y el user_id"); 
    }
    con.query(
        `SELECT user_id,animal_id,titulo,descripcion,imagen_ruta,estado,DATE_FORMAT(fecha_creacion, '%d-%m-%Y') AS fecha_creacion FROM publicaciones WHERE post_id = ?`,
        [id],(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else if(data.length === 0){
                res.status(404).send("La publicacion que esta buscando no existe");
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appPublicaciones.post("/", appmiddlewarePublicaciones, (req,res)=>{
    const {post_id, user_id, titulo, descripcion, imagen_ruta,animal_id} = req.body;
    let estado = true
    if(!user_id){
        return res.status(422).send("El parametro user-id es obligatorio");
    }else if(!animal_id){
        return res.status(422).send("El parametro animal-id es obligatorio");
    }
    con.query(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [user_id],(err,data)=>{
            if(err){
                res.status(404).send("El user_id no existe, debe relacionarse la publicacion a un usuario valido.");
            }else if(data.length === 0){
                res.status(500).send("Error: La publicacion esta referenciada a un usuario que no existe, verifique el user_id");
            }else{
                con.query(
                    `SELECT animal_id FROM animales WHERE animal_id = ?`,
                    [animal_id],(err,data)=>{
                        if(err){
                            res.status(404).send("El animal_id no existe, debe relacionarse la publicacion a un animal valido.");
                        }else if(data.length === 0){
                            res.status(500).send("Error: La publicacion esta referenciada a un animal que no existe, verifique el animal_id");
                        }else{
                            con.query(
                                'INSERT INTO publicaciones(post_id, user_id, titulo, descripcion, imagen_ruta, estado,animal_id) VALUE(?,?,?,?,?,?,?)',
                                [post_id, user_id, titulo, descripcion, imagen_ruta,estado,animal_id],
                                (err,data)=>{
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                      } else {
                                        console.log(data);
                                        res.status(200).send("Nueva publicacion agregada exitosamente");
                                      }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
});
    
    
appPublicaciones.put("/", appmiddlewarePublicaciones,(req,res)=>{
    let {post_id, user_id, titulo, descripcion, imagen_ruta,animal_id} = req.body;
    let estado = true
    if((user_id)||(animal_id)){
        return res.status(422).send("El parametro user-id o animal_id no se puede modificar");
    }
    con.query(
        `UPDATE publicaciones SET titulo = ?, descripcion = ?, imagen_ruta = ?, estado = ? WHERE post_id = ?`,
        [titulo, descripcion, imagen_ruta,estado,post_id],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            } else if(data.length === 0){
                res.status(500).send("Error: la publicacion no existe en la tabla de publicaciones");
            } else {
                con.query(
                    `SELECT estado FROM me_gusta WHERE post_id = ?`,
                    [id],(err,data)=>{
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error en el servidor: "+err.sqlMessage);
                        }else if(data.length === 0){
                            console.log("pase")
                        } else {
                            con.query(
                                `UPDATE me_gusta SET estado = ? WHERE post_id = ?`,
                                [estado,id],(err)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                    }
                                }
                            )
                        }
                    }
                )
                console.log(data);
                res.status(200).send("publicacion actualizada con exito");
            }
        }
    )
});

appPublicaciones.delete("/",(req,res)=>{
    const {id} = req.body;
    let estado = false
    if(!id){
        return res.status(422).send("Si quiere desabilitar una publicacion, debe poner id: y el post_id");
    }
    con.query(
        `SELECT estado FROM publicaciones WHERE post_id = ?`,
        [id],(err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            } else if(data.length === 0){
                res.status(500).send("Error: la publicacion no existe en la tabla de publicaciones");
            } else {
                con.query(
                    `UPDATE publicaciones SET estado = ? WHERE post_id = ?`,
                    [estado,id],(err,data)=>{
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error en el servidor: "+err.sqlMessage);
                        }else{
                            con.query(
                                `SELECT estado FROM me_gusta WHERE post_id = ?`,
                                [id],(err,data)=>{
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                    }else if(data.length === 0){
                                        console.log("pase")
                                    } else {
                                        con.query(
                                            `UPDATE me_gusta SET estado = ? WHERE post_id = ?`,
                                            [estado,id],(err)=>{
                                                if(err){
                                                    console.log(err);
                                                    res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                            res.status(200).send("Publicacion inhabilitada exitosamente.")
                        }
                    }
                )
            }
        }
    )
})

export default appPublicaciones;