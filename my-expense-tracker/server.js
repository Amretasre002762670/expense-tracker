const express = require('express');
const db = require("./server/model");
require('dotenv').config();
const cors = require("cors");

global.__basedir = __dirname;
const app = express();

const signupRoute = require('./server/routes/Signup');
const healthRoutes = require('./server/routes/Health');

app.use(express.json());

app.use(cors());

app.use("/healthz", healthRoutes);

app.use('/signup', signupRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
