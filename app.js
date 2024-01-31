const express = require('express');
const cors = require('cors');
const app = express();
const dotenv=require("dotenv")
const index = require('./routes/index');


dotenv.config()
const db = require('./config/dbConnection');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', index)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad request!"
    });
});



module.exports = app;
