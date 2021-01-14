import express, { Request, Response } from 'express';
import { IToDo } from '../models/IToDo';
// import mongoose from 'mongoose';


const router = express.Router();

router.get('/api/todo', (req: Request, res: Response) => {
    const todo: IToDo = { title: 'get title', description: 'get description' };
    console.log(todo)
    // mongoose.;
    return res.send('the todo');
})

router.post('/api/todo', (req: Request, res: Response) => {
    const todo: IToDo = { title: 'post title', description: 'post description' };
    console.log(todo)
    return res.send('new todo created');
})


export { router as todoRouter }