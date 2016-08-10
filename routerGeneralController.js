var routerController = (app) => {
    const fs = require('fs');
    const express = require('express');
    const lang = require('./services/lang.js');
    const multer  = require('multer');
    const upload = multer({ dest: `static/media/` });

    const dbGetters = require('./services/dbGetters');

    app.post('/k', (req, res) => {
        // console.log(req.files);
        // console.log(req.body);
        // res.sendStatus(200);
    });

    app.get('/api/language', (req, res) => {
        var al = req.get('Accept-Language');
        res.set('Content-Language', lang(al));
        res.sendStatus(200);
    });

    app.get('/adminium/getall', (req, res) => {
        if(req.session.isLoggedIn){
            Promise.all([dbGetters.getPage(),
                dbGetters.getPartners(),
                dbGetters.getProjects(),
                dbGetters.getReviews(),
                dbGetters.getUsers(),
                dbGetters.getVideos()])
                .then((response) => {
                    res.json(response)
                }, (response) => {
                    res.json(response)
                });
        } else {
            res.sendStatus(401)
        }
    });
    app.get('/api/getall', (req, res) => {
        Promise.all([dbGetters.getPage(),
            dbGetters.getPartners({isPublished: true}),
            dbGetters.getProjects({isPublished: true}),
            dbGetters.getReviews({isPublished: true}),
            dbGetters.getUsers({isInTeam: true}),
            dbGetters.getVideos({isPublished: true})])
            .then((response) => {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.json(response)
            }, (response) => {
                res.json(response)
            });
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