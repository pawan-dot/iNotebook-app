// const mongoose = require('mongoose');
// const mongoUrl = "mongodb://localhost:27017//iNotebook";

// const connectToMongo = () => {
//     mongoose.connect(mongoUrl, () => {
//         console.log("connected")
//     })

// }
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/iNotebook";
mongoose.connect(url, {}).then(() => {
    console.log("connection done");
})

//module.exports = connectToMongo;