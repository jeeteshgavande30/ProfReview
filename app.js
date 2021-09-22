const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const ratingRoutes = require('./routes/Rating');
const compression = require("compression");
const helemt = require("helmet");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(feedRoutes);
app.use(messageRoutes);
app.use(ratingRoutes);
app.use('/auth',authRoutes);
app.use(helemt());
app.use(compression());
app.get('/',(req,res)=>{
    res.send("App is running");
})
app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message,data:data});
})
//const mongodb_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cd2f9.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
mongoose.connect(process.env.MONGO_URL)
.then(result=>{
    console.log('connected');
    app.listen(process.env.PORT || 8080)})
.catch(err=>console.log(err));
