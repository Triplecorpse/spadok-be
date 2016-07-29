var routerController = (app) => {
    const fs = require('fs');
    const express = require('express');
    const database = require('./databaseProjectController.js');

    app.get('/', function (req, res) {
        fs.readFile('./static/dist/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });

    app.get('/health', function (req, res) {
        res.writeHead(200);
        res.end('1');
    });
};

module.exports = routerController;