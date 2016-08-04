var routerController = (app) => {
    const fs = require('fs');
    const express = require('express');
    const lang = require('./services/lang.js');

    app.get('/api/language', (req, res) => {
        var al = req.get('Accept-Language');
        res.set('Content-Language', lang(al));
        res.sendStatus(200);
    });

    app.get('/health', function (req, res) {
        res.writeHead(200);
        res.end('1');
    });

    app.get('/*', function (req, res) {
        fs.readFile('./static/dist/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });
};

module.exports = routerController;