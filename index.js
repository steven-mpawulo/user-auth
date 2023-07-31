const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

app.use('/', userRouter);
const PORT = 5001;

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db connected");
    app.listen(PORT, () => {
        console.log("Server started");
    });

});
