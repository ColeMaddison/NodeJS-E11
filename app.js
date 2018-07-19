"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.PORT || 3000;

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

const config = require('./config');
const routes = require('./routes');

mongoose.connect(config.mongo.uri, config.mongo.options);
if(process.env.NODE_ENV === "dev") {
    mongoose.set("debug", true);
}

mongoose.connection.on('error', (err) => {
    console.error("MongoDB err", err);
    process.exit(0);
});

mongoose.connection.on('open', () => {
    console.error("MongoDB connect success");
});

const app = express();

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

routes(app);

app.listen(PORT, () => {
    console.log(`Server started with env: ${process.env.NODE_ENV} on port ${PORT}`);
});

module.exports = app;