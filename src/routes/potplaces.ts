import express, { Request, Response } from 'express';
import { ICO } from '../models/ICO';
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;
const db = require('monk')(URI)
const router = express.Router();
const placesDB = db.get('places')

router.get('/api/places', async (req: Request, res: Response) => {
    const all = await placesDB.find({}).then((docs: any) => {
        return res.send(docs);
    })
})

router.post('/api/places', async (req: Request, res: Response) => {
    const data: ICO = { longitude: 0.000000, latitude: 0.000000, count: 0 }
    await req.on('data', (chunk) => {
        const x = JSON.parse(chunk)
        data.longitude = x.longitude
        data.latitude = x.latitude
        data.count = 0
    })
    await req.on('end', async () => {
        const x = await placesDB.findOne({ longitude: data.longitude, latitude: data.latitude })
        if (x) {
            placesDB.update(x._id, { $set: { count: x.count + 1 } });
            return res.send('updated with ' + (x.count + 1));
        }
        else {
            placesDB.insert({ longitude: data.longitude, latitude: data.latitude });
            return res.send('new place created');
        }
    })
    if (!(Object.keys(req.body).length === 0 && req.body.constructor === Object)) {
        const x = await placesDB.findOne({ longitude: req.body.longitude, latitude: req.body.latitude })
        if (x) {
            placesDB.update(x._id, { $set: { count: x.count + 1 } });
            return res.send('updated with ' + (x.count + 1));
        }
        else {
            placesDB.insert({ longitude: data.longitude, latitude: data.latitude });
            return res.send('new place created from req.body');
        }
    }
})


export { router as potPlacesRouter }
