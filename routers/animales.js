import appmiddlewareAnimales from "../middleware/middlewareAnimales.js";
import {Router} from 'express';
import dotenv from "dotenv";
import mysql from "mysql2"

dotenv.config();
const appAnimales = Router();



let con = undefined;
appAnimales.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.MY_CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to "+con);
   } 
});

appAnimales.get("/",(req, res) => {
    con.query(
        `SELECT * FROM animales `, (error,data)=>{
            if(error){
                console.log(error);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appAnimales.get("/id",(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).send("Si quiere buscar un animal, debe poner id: y el animal_id"); 
    }
    con.query(
        `SELECT * FROM animales WHERE animal_id = ?`,
        [id],(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
            }else if(data.length === 0){
                res.status(404).send("El animal que esta buscando no existe");
            }else{
                console.log(data);
                res.status(200).send(data);
            }
    });
});

appAnimales.post("/", appmiddlewareAnimales, (req,res)=>{
    const {animal_id, nombre, especie, edad} = req.body;
    con.query(
        'INSERT INTO animales(animal_id, nombre, especie, edad) VALUE(?,?,?,?)',
        [animal_id, nombre, especie, edad],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
                } else {
                console.log(data);
                res.status(200).send("Nuevo animal agregado exitosamente");
                }
        }
    )
});

appAnimales.put("/", appmiddlewareAnimales, (req,res)=>{
    const {animal_id, nombre, especie, edad} = req.body;
    con.query(
        `UPDATE animales SET nombre = ?, especie = ?, edad = ? WHERE animal_id = ?`,
        [nombre, especie, edad, animal_id],
        (err,data)=>{
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor: "+err.sqlMessage);
              }else if(data.length === 0){
                res.status(500).send("Error: el animal no existe en la tabla de usuarios");
              } else {
                console.log(data);
                res.status(200).send("Animal actualizado con exito");
              }
        }
    )
})

appAnimales.delete("/", (req,res)=>{
    res.status(404).send("No se pueden eliminar los animales una vez creados, puede quejarse al correo: nomeimporta@gmail.com :)")
})

export default appAnimales;
