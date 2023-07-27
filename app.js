import dotenv from "dotenv";
import express from "express";
import { autenticacion } from './tokens/autenticacion.js';
import { verifyToken } from './tokens/verifyToken.js';
import { dynamicRouter } from './tokens/tokenRouter.js';
dotenv.config()
const appExpress = express();

appExpress.use(express.json());
appExpress.get('/autorizacion/:endpoint', autenticacion);
appExpress.use('/:tabla', verifyToken, dynamicRouter);
const config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, ()=>{
  console.log(`http://${config.hostname}:${config.port}`);
})

export default appExpress;