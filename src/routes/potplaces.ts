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
    const data: ICO = { longitude: 0.000000, latitude: 0.000000, count: 0, contact_phone: 0, address: '', imageLink: '' }
    req.on('data', (chunk) => {
        const x: ICO = JSON.parse(chunk);
        data.longitude = x.longitude;
        data.latitude = x.latitude;
        data.count = 1;
        data.address = x.address;
        data.contact_phone = x.contact_phone;
        data.imageLink = x.imageLink;
    })
    req.on('end', async () => {
        const x = await placesDB.findOne({ longitude: data.longitude, latitude: data.latitude });
        if (x) {
            placesDB.update(x._id, { $set: { count: x.count + 1 }, $push: { address: data.address, contact_phone: data.contact_phone, imageLink: data.imageLink } });
            return res.send('updated with ' + (x.count + 1) + ' in end');
        }
        else {
            placesDB.insert({ longitude: data.longitude, latitude: data.latitude, count: data.count, address: [data.address], contact_phone: [data.contact_phone], imageLink: [data.imageLink] });
            return res.send('new place created from req.on');
        }
    })
    if (!(Object.keys(req.body).length === 0 && req.body.constructor === Object)) {
        data.longitude = req.body.longitude;
        data.latitude = req.body.latitude;
        data.count = 1;
        data.address = req.body.address;
        data.contact_phone = req.body.contact_phone;
        data.imageLink = req.body.imageLink;
        const x = await placesDB.findOne({ longitude: data.longitude, latitude: data.latitude });
        if (x) {
            placesDB.update(x._id, { $set: { count: x.count + 1 }, $push: { address: data.address, contact_phone: data.contact_phone, imageLink: data.imageLink } });
            return res.send('updated with ' + (x.count + 1) + ' in end');
        }
        else {
            placesDB.insert({ longitude: data.longitude, latitude: data.latitude, count: data.count, address: [data.address], contact_phone: [data.contact_phone], imageLink: [data.imageLink] });
            return res.send('new place created from req.on');
        }
    }
})


export { router as potPlacesRouter }
