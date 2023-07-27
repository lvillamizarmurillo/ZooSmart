import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storageLikes} from "../controller/storageLikes.js"
import {validate} from 'class-validator';

const appmiddlewareLikes = express();
appmiddlewareLikes.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storageLikes, req.body, { excludeExtraneousValues: true });
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export default appmiddlewareLikes;