const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.MONGO_DB_CONNECTION_STRING;

mongoose.connect(url);