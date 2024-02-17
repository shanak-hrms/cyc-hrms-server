const express = require('express');
const cors = require('cors');
const app = express();
const dotenv=require("dotenv")
const index = require('./routes/index');
const cron = require('node-cron');
const router = express.Router();
const { autoClockoutMidNight }=require("./controller/attendanceCtrl")

dotenv.config()
const db = require('./config/dbConnection');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', index)


cron.schedule('0 0 * * *', () => {
    autoClockoutMidNight()
  });

// cron.schedule('48 18 * * *', () => {
//     autoClockoutMidNight()
//   });

app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad request!"
    });
});



module.exports = app;
