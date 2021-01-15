import express from "express";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todo"
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const port = process.env.SERVER_PORT ?? 8080;
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/todo';
// const db = require('../node_modules/monk')(URI)

const app = express();

app.use(express.json());
app.use(cors);
app.use(urlencoded({ extended: true }));
app.use('/api',todoRouter);

app.get("/", (req, res) => {
    res.send('route check path');
});

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to database');
})

mongoose.connection.on('error', (err: any) => {
    console.log(`error while connecting with db: ${err}`)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
