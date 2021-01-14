import express from "express";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todo"
// import mongoose from 'mongoose';

dotenv.config();

const port = process.env.SERVER_PORT ?? 8080;
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/todo';
const app = express();

app.use(express.json());

app.use(todoRouter)

// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("Connected to database");
// })


app.get("/", (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});