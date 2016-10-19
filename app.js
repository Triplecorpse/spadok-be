const http = require('http');
const contentTypes = require('./utils/content-types');
const env = process.env;
const local = 'mongodb://localhost/spadok';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerGeneralController = require('./routerGeneralController.js');
const routerUserController = require('./routerUserController.js');
const routerProjectController = require('./routerProjectController.js');
const routerImagesController = require('./routerImagesController.js');
const routerReviewController = require('./routerReviewController.js');
const routerPartnerController = require('./routerPartnerController.js');

mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || env.MONGODB_URI || local);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('static/dist'));
app.use(express.static('media'));

routerUserController(app);
routerProjectController(app);
routerGeneralController(app);
routerImagesController(app);
routerReviewController(app);
routerPartnerController(app);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});