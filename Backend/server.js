
require('dotenv').config()
// console.log(process.env.JWT_SECRET)
const { connectDatabase } = require('./db.js')
const express = require("express");
const bodyparser = require('body-parser')
var cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 4000;
var cors = require('cors')

//db connection

connectDatabase();
//require("./Routes/Notes");
//handdle cores
app.use(cors())
//  handle json requiest from body
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// Importing Routes
const notes = require("./Routes/Notes");
const user = require("./Routes/auth.js");

// Using Routes
app.use('/api', notes)
app.use("/api", user);
app.listen(PORT, () => {
    console.log(` Backend server is listening on ${PORT}`);
});
