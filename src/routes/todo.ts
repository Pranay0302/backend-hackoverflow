import express, { Request, Response } from 'express';
import {todo} from "../models/ToDo";
// const check = require('../models/ToDo');
const router = express.Router();

router.get('/api/todo' , async(req: Request, res: Response) => {
        try {
            const gtodo = await todo.find({});
            res.send(gtodo);
        } catch (error) {
            res.status(404).send(error);
        }
    // res.send("checkingg");
})

router.post('/api/todo', async(req: Request, res: Response) => {

    const ptodo = new todo({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const saved = await ptodo.save()
        res.send(saved);
    } catch (error) {
        res.status(404).send(error);
    }
    return res.send('new todo created');
})


export { router as todoRouter }
