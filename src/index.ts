import express from "express";
import { potPlacesRouter } from "./routes/potplaces";
import { todoRouter } from "./routes/todo";
const cors = require('cors');
const { urlencoded } = require('body-parser');
const port = process.env.PORT ?? 8080;
const app = express();
const server = require('http').createServer(app)
// const io = require('socket.io')(server)

app.use(express.json());
// app.use(cors);
// app.use(urlencoded({ extended: true }));
app.use(todoRouter);
app.use(potPlacesRouter)
app.get("/", (req, res) => {
    res.send('route check');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

// server.listen(port,()=>{
//     console.log(`server started at http://localhost:${port}`)
// })