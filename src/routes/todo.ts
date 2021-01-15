import express, { Request, Response } from 'express';
import { type } from 'os';
import { IToDo } from '../models/IToDo';
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/todo';
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
    // console.log(req);
    let data: IToDo
    req.on('data', (chunk) => {
        data = JSON.parse(chunk)
    })
    req.on('end', () => {
        console.log(data)
    })
    console.log(typeof (data))
    todoDB.insert({ title: data.title, description: data.description });
    return res.send('new todo created');
})


export { router as todoRouter }