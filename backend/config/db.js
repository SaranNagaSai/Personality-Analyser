const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB Compass default connection string for local database
        const conn = await mongoose.connect('mongodb://localhost:27017/personality-analyser');


        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
