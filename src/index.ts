import express from "express";
import { todoRouter } from "./routes/todo"
const port = process.env.SERVER_PORT ?? 8080;
const app = express();

app.use(express.json());

app.use(todoRouter)

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});