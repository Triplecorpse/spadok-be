var routerLoginController = (app) => {
    const fs = require('fs');
    const express = require('express');
    const userDatabaseController = require('./databaseUserController.js');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    var sess;

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
            secret: 'spadokproject',
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 86400000,
                httpOnly: true
            }
        }
    ));

    app.get('/adminium', function (req, res) {
        app.use(session({
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 86400000,
                httpOnly: true
            },
            genid: function(req) {
                return genuuid(); // use UUIDs for session IDs
            },
            secret: 'spadokproject'
        }));
        sess = req.session;
        console.log(sess);
        fs.readFile('./static/dist/admin/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        });
    });

    app.get('isloggedin', (req, res) => {
        if(req.session._expires < new Date()) {
            res.send(200).json({});
        }
    });

    app.post('/login', function (req, res) {
        console.log(req.cookies);
        userDatabaseController().find({name: req.body.name})
            .then((data) => {
                if (!data) {
                    findByEmail()
                }
                success(data)
            });

        function findByEmail() {
            userDatabaseController().find({email: req.body.name})
                .then((data) => {
                    if (!data) {
                        fail();
                    }
                    success(data)
                });
        }

        function success(user) {
            if(req.body.password === user.password) {
                user.password = undefined;
                res.status(200).json(user);
            } else {
                fail();
            }
        }

        function fail() {
            res.status(401).json({message: "Not Authorized"});
        }
    });

    app.post('/newuser', function (req, res) {
        userDatabaseController().save({
            name: req.body.name,
            email: req.body.email,
            dateRegistered: new Date(),
            password: req.body.password
        })
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/adminium');
            }
        });
    });

    createAdmin();
    function createAdmin() {
        userDatabaseController().find({name: 'admin'})
            .then((data) => {
                if(!data) {
                    userDatabaseController().save({
                        name: 'admin',
                        email: 'eldar.khaitov@gmail.com',
                        dateRegistered: new Date(),
                        password: 'admin',
                        canHandleProjects: true,
                        canHandleUsers: true
                    })
                }
            });
        }
    };

module.exports = routerLoginController;