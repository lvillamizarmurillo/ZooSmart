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
    const {like_id, post_id} = req.body;
    let estado = true;
    con.query(
        `SELECT post_id FROM publicaciones WHERE post_id = ?`,
        [post_id],(err,data)=>{
            if(err){
                res.status(404).send("El post_id no existe, debe relacionarse el like a una publicacion valida.");
            }else if(data.length === 0){
                res.status(500).send("Error: El like esta referenciado a una publicacion que no existe, verifique el post_id");
            }else{
                con.query(
                    'INSERT INTO me_gusta(like_id,post_id,estado) VALUE(?,?,?)',
                    [like_id, post_id,estado],
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
});

appLikes.delete("/", (req,res)=>{
    res.status(404).send("No se pueden eliminar los likes una vez creados, puede quejarse al correo: nomeimporta@gmail.com :)")
})


export default appLikes;