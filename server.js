const express = require('express');
const app = express();
const env = process.env.NODE_ENV || "production";
global.config = require('./config')[env];
const port = process.env.PORT || config.port;
const ether = require('./app/routes/ether');

app.use('/api/v1', ether);
app.listen(port);
console.log("App listening on port " + port);