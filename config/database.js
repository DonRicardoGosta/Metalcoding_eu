const mongoose = require("mongoose");
const config = require("config");

const url = config.get('dbConfig.host');

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};