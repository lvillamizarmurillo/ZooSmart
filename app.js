import dotenv from "dotenv";
import express from "express";
import appUsers from './routers/users.js';
import appPublicaciones from './routers/publicaciones.js';
dotenv.config()
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/users", appUsers);
appExpress.use("/publicaciones", appPublicaciones);
const config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, ()=>{
  console.log(`http://${config.hostname}:${config.port}`);
})