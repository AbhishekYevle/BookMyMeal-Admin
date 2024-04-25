const mongoose = require('mongoose');

// URI is comming from dotenv
const URI = process.env.MONGODB_URI;

// database connection 
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successfull to Database.");
    } catch (error) {
        console.error("Databse Connection Error!");
        process.exit(0);
    }
}

module.exports = connectDB;