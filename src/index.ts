import express from "express";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todo"
dotenv.config();
const port = process.env.SERVER_PORT ?? 8080;
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/todo';
const db = require('../node_modules/monk')(URI)
const app = express();


app.use(express.json());

app.use(todoRouter)

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
