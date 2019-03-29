//const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
const { headers } = require('./middlewares/headers');

// middlewares
app.use(bodyParser.json());
app.use(headers);

app.listen(4000,() => {
    console.log('\x1b[32m%s\x1b[0m', 'Server Listening at 4000');
});
