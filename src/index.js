const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose} = require('mongoose');
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config()
require('dotenv').config();

const cors = require('cors');
const app  = express()
const port = process.env.PORT || 3001


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);





mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect to database success!')
    })
    .catch((err) => {
        console.log(err)
    })

    app.listen(port, () => {
    console.log('run', + port)
})