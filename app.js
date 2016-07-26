const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentTypes = require('./utils/content-types'),
    sysInfo = require('./utils/sys-info'),
    env = process.env,
    express = require('express'),
    app = express(),
    mongoose = require('mongoose');

const routerDatabaseController = require('./routerGeneralController.js');
const routerLoginController = require('./routerUserController.js');

app.use(express.static('static/dist'));

routerDatabaseController(app);
routerLoginController(app);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});