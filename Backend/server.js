
connectToMongo = require('./db')
const express = require("express");
const bodyparser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 4000;
var cors = require('cors')
//db connection
require("./db");
require("./Routes/Notes");
//handdle cores
app.use(cors())
//  handle json requiest from body
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//calling routes function
require("./Routes/auth")(app);
app.use('/api/notes', require('./Routes/Notes'));
app.listen(PORT, () => {
    console.log(` Backend server is listening on ${PORT}`);
});
