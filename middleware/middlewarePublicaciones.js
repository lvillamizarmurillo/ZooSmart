import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storagePublicaciones} from "../controller/storagePublicaciones.js"
import {validate} from 'class-validator';

const appmiddlewarePublicaciones = express();
appmiddlewarePublicaciones.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storagePublicaciones, req.body, { excludeExtraneousValues: true });
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export default appmiddlewarePublicaciones;