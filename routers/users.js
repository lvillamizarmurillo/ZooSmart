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
        /*sql*/`SELECT * FROM users`, (error,data)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error executing query");
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appUsers.post("/", appmiddlewareUsers, (req,res)=>{
    const {user_id, nombre, email, numero, password, fecha_registro} = req.body;
    con.query(
        'INSERT INTO users(user_id, nombre, email, numero, password, fecha_registro) VALUE(?,?,?,?,?,?)',
        [user_id, nombre, email, numero, password, fecha_registro],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("El usuario ya existe");
              } else {
                console.log(data);
                res.status(200).send("Nuevo usuario agregada exitosamente");
              }
        }
    )
});

export default appUsers;