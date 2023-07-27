import appmiddlewareUsers from "../middleware/middlewareUsers.js";
import {Router} from 'express';
import dotenv from "dotenv";
import mysql from "mysql2"

dotenv.config();
const appUsers = Router();



let con = undefined;
appUsers.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.MY_CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to "+con);
   } 
});

appUsers.get("/",(req, res) => {
    con.query(
        /*sql*/`SELECT user_id,nombre,email,numero,password,DATE_FORMAT(fecha_registro, '%d-%m-%Y') AS fecha_registro FROM users `, (error,data)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appUsers.get("/id",(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere buscar a un usuario, debe poner id: y el user_id"); 
    }
    con.query(
        `SELECT nombre,email,numero,password,DATE_FORMAT(fecha_registro, '%d-%m-%Y') AS fecha_registro FROM users WHERE user_id = ?`,
        [id],(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else if(data.length === 0){
                res.status(500).send("Error: el usuario no existe en la tabla de usuarios");
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appUsers.post("/", appmiddlewareUsers, (req,res)=>{
    const {user_id, nombre, email, numero, password} = req.body;
    con.query(
        'INSERT INTO users(user_id, nombre, email, numero, password) VALUE(?,?,?,?,?)',
        [user_id, nombre, email, numero, password],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
              }else {
                console.log(data);
                res.status(200).send("Nuevo usuario agregada exitosamente");
              }
        }
    )
});

appUsers.put("/", appmiddlewareUsers,(req,res)=>{
    const {user_id, nombre, email, numero, password} = req.body;
    con.query(
        `UPDATE users SET nombre = ?, email = ?, numero = ?, password = ? WHERE user_id = ?`,
        [nombre, email, numero, password,user_id],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
              }else if(data.length === 0){
                res.status(500).send("Error: el usuario no existe en la tabla de usuarios");
              } else {
                console.log(data);
                res.status(200).send("Usuario actualizado con exito");
              }
        }
    )
});

appUsers.delete("/",(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere borrar un usuario, debe poner id: y el user_id"); 
    }
    con.query(
            `DELETE FROM me_gusta WHERE user_id = ?`,
            [id],(err,data)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Error en el servidor: "+err.sqlMessage);
                }else{
                    con.query(
                        `DELETE FROM animales WHERE user_id = ?`,
                        [id],(err,data)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send("Error en el servidor: "+err.sqlMessage);
                            }else{
                                con.query(
                                    `DELETE FROM publicaciones WHERE user_id = ?`,
                                    [id],(err,data)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                        }else{
                                            con.query(
                                                `DELETE FROM users WHERE user_id = ?`,
                                                [id],(error, results) => {
                                                    if (error) {
                                                    console.log(error);
                                                    res.status(500).send("Error en el servidor: "+err.sqlMessage);
                                                    } else {
                                                    console.log(results);
                                                    res.status(200).send("Usuario eliminado exitosamente");
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        
    )
})

export default appUsers;
