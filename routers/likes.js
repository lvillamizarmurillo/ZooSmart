import appmiddlewareLikes from "../middleware/middlewareLikes.js";
import {Router} from 'express';
import dotenv from "dotenv";
import mysql from "mysql2"

dotenv.config();
const appLikes = Router();



let con = undefined;
appLikes.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.MY_CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to "+con);
   } 
});

appLikes.get("/",(req, res) => {
    con.query(
        `SELECT * FROM me_gusta `, (error,data)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appLikes.get("/id",(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere buscar un like, debe poner id: y el like_id"); 
    }
    con.query(
        `SELECT * FROM me_gusta WHERE like_id = ?`,
        [id],(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else if(data.length === 0){
                res.status(404).send("El like que esta buscando no existe");
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appLikes.post("/", appmiddlewareLikes, (req,res)=>{
    const {like_id, user_id, post_id} = req.body;
    con.query(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [user_id],(err,data)=>{
            if(err){
                res.status(404).send("El user_id no existe, debe relacionarse el animal a un usuario valido.");
            }else if(data.length === 0){
                res.status(500).send("Error: El like esta referenciado a un usuario que no existe, verifique el user_id");
            }else{
                con.query(
                    `SELECT post_id FROM publicaciones WHERE post_id = ?`,
                    [post_id],(err,data)=>{
                        if(err){
                            res.status(404).send("El post_id no existe, debe relacionarse el animal a una publicacion valida.");
                        }else if(data.length === 0){
                            res.status(500).send("Error: El like esta referenciado a una publicacion que no existe, verifique el post_id");
                        }else{
                            con.query(
                                'INSERT INTO me_gusta(like_id, user_id, post_id) VALUE(?,?,?)',
                                [like_id, user_id, post_id],
                                (err,data)=>{
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                      } else {
                                        console.log(data);
                                        res.status(200).send("Nuevo like agregado exitosamente");
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

appLikes.put("/", appmiddlewareLikes,(req,res)=>{
    const {like_id, user_id, post_id} = req.body;
    con.query(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [user_id],(err,data)=>{
            if(err){
                res.status(404).send("El user_id no existe, debe relacionarse el animal a un usuario valido.");
            }else if(data.length === 0){
                res.status(500).send("Error: El like esta referenciada a un usuario que no existe, verifique el user_id");
            }else{
                con.query(
                    `SELECT post_id FROM publicaciones WHERE post_id = ?`,
                    [post_id],(err,data)=>{
                        if(err){
                            res.status(404).send("El post_id no existe, debe relacionarse el animal a una publicacion valida.");
                        }else if(data.length === 0){
                            res.status(500).send("Error: El like esta referenciada a una publicacion que no existe, verifique el post_id");
                        }else{
                            con.query(
                                `UPDATE me_gusta SET user_id = ?, post_id = ? WHERE like_id = ?`,
                                [user_id, post_id, like_id],
                                (err,data)=>{
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                      }else if(data.length === 0){
                                        res.status(500).send("Error: El like no existe en la tabla de animales");
                                      } else {
                                        console.log(data);
                                        res.status(200).send("Like actualizado con exito");
                                      }
                                }
                            )
                        }
                    }
                )
                
            }
        }
    );
});

appLikes.delete("/", (req,res)=>{
    res.status(404).send("No se pueden eliminar los likes una vez creados")
})


export default appLikes;