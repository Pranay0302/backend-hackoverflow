import express, { Request, Response } from 'express';
import { IToDo } from '../models/IToDo';
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;
const db = require('monk')(URI)
const router = express.Router();
const todoDB = db.get('todo')

router.get('/api/todo', (req: Request, res: Response) => {
    const all = todoDB.find({}).then((docs: any) => {
        console.log(docs)
        return res.send(docs);
    })
})

router.post('/api/todo', (req: Request, res: Response) => {
    const data: IToDo = { title: '', description: '' }
    req.on('data', (chunk) => {
        const x = JSON.parse(chunk)
        data.title = x.title
        data.description = x.description
    })
    req.on('end', () => {
        console.log(data)
        todoDB.insert({ title: data.title, description: data.description });
    })
    return res.send('new todo created');
})


export { router as todoRouter }