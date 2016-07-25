const http         = require('http'),
    fs           = require('fs'),
    path         = require('path'),
    contentTypes = require('./utils/content-types'),
    sysInfo      = require('./utils/sys-info'),
    database      = require('./databaseController.js'),
    env          = process.env,
    express = require('express'),
    app = express(),
    mongoose = require('mongoose');

const routes = require('./routerController.js');

// database().connect();
// database().registerShemaAndModule();
routes(app);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  // console.log(`Example app listening on port ${env.NODE_PORT || 3000}!`);
  console.log(`Application worker ${process.pid} started...`);
});