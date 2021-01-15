import express from "express";
import { todoRouter } from "./routes/todo"
const port = process.env.SERVER_PORT ?? 8080;
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.json());

app.use(todoRouter)

app.get("/", (req, res) => {
    res.send('Hello World');
});

// app.listen(port, () => {
//     console.log(`server started at http://localhost:${port}`);
// });

server.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})