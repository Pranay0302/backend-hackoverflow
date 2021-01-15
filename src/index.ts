import express from "express";
import { todoRouter } from "./routes/todo";
const cors = require('cors');
const { urlencoded } = require('body-parser');
const port = process.env.SERVER_PORT ?? 8080;
const app = express();


app.use(express.json());
app.use(cors);
app.use(urlencoded({ extended: true }));
app.use(todoRouter);

app.get("/", (req, res) => {
    res.send('route check');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
