import express, { Request, Response } from 'express';
import { IToDo } from '../models/IToDo';
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/todo';
const db = require('monk')(URI)
const router = express.Router();
const todoDB = db.get('todo')

router.get('/api/todo', async(req: Request, res: Response) => {
    const all = await todoDB.find({}).then((docs: any) => {
        console.log(docs)
        return res.send(docs);
    })
    // console.log(all);
})

router.post('/api/todo', async(req: Request, res: Response) => {
    const data: IToDo = await { title: '', description: '' }
    req.on('data', (chunk) => {
        const x = JSON.parse(chunk)
        data.title = x.title
        data.description = x.description
    })
    req.on('end', () => {
        console.log(data)
        todoDB.insert({ title: data.title, description: data.description });
    })
    console.log(req.body);
    return res.send('new todo created');
})


export { router as todoRouter }
