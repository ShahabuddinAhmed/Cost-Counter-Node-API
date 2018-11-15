const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const adminRoutes = require('./api/routes/admins');
const janRoutes = require('./api/routes/jan');
const febRoutes = require('./api/routes/feb');
const marRoutes = require('./api/routes/mar');
const aprRoutes = require('./api/routes/apr');
const mayRoutes = require('./api/routes/may');
const junRoutes = require('./api/routes/jun');
const julRoutes = require('./api/routes/jul');
const augRoutes = require('./api/routes/aug');
const sepRoutes = require('./api/routes/sep');
const octRoutes = require('./api/routes/oct');
const novRoutes = require('./api/routes/nov');
const decRoutes = require('./api/routes/dec');

mongoose.connect('mongodb://cost-counter:cost-counter@database-shard-00-00-v0ueh.gcp.mongodb.net:27017,database-shard-00-01-v0ueh.gcp.mongodb.net:27017,database-shard-00-02-v0ueh.gcp.mongodb.net:27017/house-renting?ssl=true&replicaSet=database-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});

// morgan used for show colsole http request and error handleing
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // extended false means only parse url data.
app.use(bodyParser.json());

// Corese Origin Resource Sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Origin",
        "Origin, X-Requested-With, Control-Type, Accept, Authorization"
    );
    // Browser send 1st option request that is preparation the request for post put or get request
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); // End middleware and go to next route
});

// Routes which should handle request
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/jan', janRoutes);
app.use('/feb', febRoutes);
app.use('/mar', marRoutes);
app.use('/apr', aprRoutes);
app.use('/may', mayRoutes);
app.use('/jun', junRoutes);
app.use('/jul', julRoutes);
app.use('/aug', augRoutes);
app.use('/sep', sepRoutes);
app.use('/oct', octRoutes);
app.use('/nov', novRoutes);
app.use('/dec', decRoutes);

// This meddileware Handle every http request error
// This error means could not find any route
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// passed 1st middleware error and check another error such database error 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;