const mongoose = require('mongoose');

const dbURI=process.env.MONGO_URI
// const dbURI="mongodb://127.0.0.1:27017/HRMS_DATA"
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose.connection;
