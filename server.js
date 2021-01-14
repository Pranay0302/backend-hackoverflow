var express = require('express');
const app = express();
const port = 5000;


app.get('/', (req, res) => {
    // console.log(req);
    res.end("hey checking");
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});