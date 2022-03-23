const express = require('express');
const app = express();

const board = require('./apis/board');
const book = require('./apis/book');

app.use("/public", express.static(__dirname + "public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/board', board);
app.use('/book', book);

app.get('/', (_, res) => {
    return res.json('Hello World');
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});