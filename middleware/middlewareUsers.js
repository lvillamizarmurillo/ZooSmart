import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storageUsers} from "../controller/storageUsers.js"
import {validate} from 'class-validator';

const appmiddlewareUsers = express();
appmiddlewareUsers.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storageUsers, req.body, { excludeExtraneousValues: true });
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export default appmiddlewareUsers;