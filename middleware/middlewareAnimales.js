import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storageAnimales} from "../controller/storageAnimales.js"
import {validate} from 'class-validator';

const appmiddlewareAnimales = express();
appmiddlewareAnimales.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storageAnimales, req.body, { excludeExtraneousValues: true });
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export default appmiddlewareAnimales;