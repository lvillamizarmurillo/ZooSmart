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
        `SELECT post_id,user_id,titulo,descripcion,imagen_ruta,DATE_FORMAT(fecha_creacion, '%d-%m-%Y') AS fecha_creacion FROM publicaciones `, (error,data)=>{
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
        `SELECT user_id,titulo,descripcion,imagen_ruta,DATE_FORMAT(fecha_creacion, '%d-%m-%Y') AS fecha_creacion FROM publicaciones WHERE post_id = ?`,
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
    const {post_id, user_id, titulo, descripcion, imagen_ruta} = req.body;
    con.query(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [user_id],(err,data)=>{
            if(err){
                res.status(404).send("El user_id no existe, debe relacionarse la publicacion a un usuario valido.");
            }else if(data.length === 0){
                res.status(500).send("Error: La publicacion esta referenciada a un usuario que no existe, verifique el user_id");
            }else{
                con.query(
                    'INSERT INTO publicaciones(post_id, user_id, titulo, descripcion, imagen_ruta) VALUE(?,?,?,?,?)',
                    [post_id, user_id, titulo, descripcion, imagen_ruta],
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
});

appPublicaciones.put("/", appmiddlewarePublicaciones,(req,res)=>{
    const {post_id, user_id, titulo, descripcion, imagen_ruta} = req.body;
    con.query(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [user_id],(err,data)=>{
            if(err){
                res.status(404).send("El user_id no existe, debe relacionarse la publicacion a un usuario valido.");
            }else if(data.length === 0){
                res.status(500).send("Error: La publicacion esta referenciada a un usuario que no existe, verifique el user_id");
            }else{
                con.query(
                    `UPDATE publicaciones SET user_id = ?, titulo = ?, descripcion = ?, imagen_ruta = ? WHERE post_id = ?`,
                    [user_id, titulo, descripcion, imagen_ruta,post_id],
                    (err,data)=>{
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error en el servidor: "+err.sqlMessage);
                          }else if(data.length === 0){
                            res.status(500).send("Error: la publicacion no existe en la tabla de publicaciones");
                          } else {
                            console.log(data);
                            res.status(200).send("publicacion actualizada con exito");
                          }
                    }
                )
            }
        }
    );
});

appPublicaciones.delete("/",(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere borrar una publicacion, debe poner id: y el post_id"); 
    }
    con.query(
        `DELETE FROM animales WHERE post_id = ?`
        [id],(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else{
                con.query(
                    `DELETE FROM publicaciones WHERE post_id = ?`,
                    [id],(error, results) => {
                        if (error) {
                          console.log(error);
                          res.status(500).send("Error en el servidor: "+err.sqlMessage);
                        } else {
                          console.log(results);
                          res.status(200).send("Publicacion eliminada exitosamente");
                        }
                    }
                )
            }
        }
    )
})

export default appPublicaciones;