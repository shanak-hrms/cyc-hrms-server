const express = require('express');
const cors = require('cors');
const app = express();
const dotenv=require("dotenv")
const index = require('./routes/index');
const cron = require('node-cron');
const router = express.Router();
const { autoClockoutMidNight }=require("./controller/attendanceCtrl")
const {getCurrentDate,isLastDayOfMonth}=require("./services/common")


dotenv.config()
const db = require('./config/dbConnection');

const bodyParser = require('body-parser');
const { calculateAndCreditLeaveEveryMonth } = require('./services/leaveCalculator');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', index)


cron.schedule('0 0 * * *', () => {
    autoClockoutMidNight()
  });

cron.schedule('59 23 28-31 * *', () => {
    calculateAndCreditLeaveEveryMonth();
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad request!"
    });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
