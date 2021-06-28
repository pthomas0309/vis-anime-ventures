// bring in express
const express = require('express');

// make express available as app
const app = express();

// bring in body parser
const bodyParser = require('body-parser');

// bring in the characters router
const charactersRouter = require('./routes/characters.router');

// declare PORT
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/characters', charactersRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});