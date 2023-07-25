import appmiddlewareUsers from "../middleware/middlewareUsers.js";
import {Router} from 'express';
import dotenv from "dotenv"
const appUsers = Router();

dotenv.config();

let con = undefined;
appUsers.use((req,res,next)=>{
   try {
        let config_con = JSON.parse(process.env.MY_CONECTION);
        con = mysql.createPool(config_con);
        next();
   } catch (error) {
        res.status(404).send("Couldn't connect to")
   } 
});

appUsers.post("/", appmiddlewareUsers, (req,res)=>{
    con.query(
        'INSERT INTO users SET ?',
        req.body
    )
});

export default appUsers;