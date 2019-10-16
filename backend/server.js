const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
// console.log("This is process >>>>>>>", process)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongoose database connection succesfully");
});

app.use(express.static(path.join(__dirname, '../build')))



const exercisesRouter = require('./routes/excercises');
const usersRouter = require('./routes/users');

// Set "Access-Control-Allow-Origin" header

app.use('/exercises',  exercisesRouter);
app.use('/users', usersRouter);


    app.use(
      cors({
        origin: (origin, cb) => {
          cb(null, true)
        },
        optionsSuccessStatus: 200,
        credentials: true,
      })
    )

app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
