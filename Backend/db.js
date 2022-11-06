require('dotenv').config()

// console.log(process.env.DB_URL)
const mongoose = require("mongoose");
// const url = process.env.DB_URL;
// mongoose.connect(process.env.DB_URL, {}).then(() => {
//     console.log("connection done");
// })

//module.exports = connectToMongo
exports.connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URL, {})
        .then((con) => console.log(`Database Connected: ${con.connection.host}`))
        .catch((err) => console.log(err));
};