import express, { Request, Response } from 'express';
import { IToDo } from '../models/IToDo';
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;
const db = require('monk')(URI)
const router = express.Router();
const todoDB = db.get('todo')

router.get('/api/todo', async (req: Request, res: Response) => {
    const all = await todoDB.find({}).then((docs: any) => {
        return res.send(docs);
    })
    // console.log(all);
})

router.post('/api/todo', async (req: Request, res: Response) => {
    const data: IToDo = await { title: '', description: '' }
    await req.on('data', (chunk) => {
        const x = JSON.parse(chunk)
        data.title = x.title
        data.description = x.description
    })
    await req.on('end', () => {
        todoDB.insert({ title: data.title, description: data.description });
        return res.send('new todo created');
    })
    if (!(Object.keys(req.body).length === 0 && req.body.constructor === Object)) {
        todoDB.insert({ title: req.body.title, description: req.body.description });
        return res.send('new todo from req.body');
    }

})


export { router as todoRouter }
