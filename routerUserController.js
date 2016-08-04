var routerLoginController = (app) => {
    const fs = require('fs');
    // const express = require('express');
    const session = require('express-session');
    const user = require('./models/user');


    var newSession = session({
        secret: 'spadokproject',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 86400000,
            httpOnly: true
        }
    });

    app.use(newSession);

    app.get('/adminium', function (req, res) {
        fs.readFile('./static/dist/admin/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        });
    });

    app.get('/isloggedin', (req, res) => {
        if ((req.session.cookie._expires > new Date()) && (req.session.isLoggedIn)) {
            req.session.touch();
            res.sendStatus(200);
        } else {
            req.session.isLoggedIn = false;
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.status(401).json({});
        }
    });

    app.post('/login', function (req, res) {
        user.findOne({name: req.body.name}, (err, user) => {
            if(err) fail();
            if(!user) {
                findByEmail();
            } else {
                success(user);
            }
        });

        function findByEmail() {
            user.findOne({email: req.body.name}, (err, user) => {
                if(!user || err) {
                    fail();
                } else {
                    success(user)
                }
            });
        }

        function success(user) {
            if (req.body.password === user.password) {
                user.password = undefined;
                req.session.isLoggedIn = true;

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
        user.save({
            name: req.body.name,
            email: req.body.email,
            dateRegistered: new Date(),
            password: req.body.password
        })
    });

    app.get('/logout', (req, res) => {
        req.session.isLoggedIn = false;
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/adminium');
            }
        });
    });

    createAdmin();
    function createAdmin() {
        user.find({name: 'admin'}, decide);

        function decide(err, data) {
            if (err) throw err;
            if (!data.length) {
                console.log("not data");
                let newUser = new user({
                    name: 'admin',
                    email: 'eldar.khaitov@gmail.com',
                    dateRegistered: new Date(),
                    password: 'admin',
                    canHandleProjects: true,
                    canHandleUsers: true
                });
                newUser.save((err) => {
                    if(err) throw err;
                })
            }
        }
    }
};

module.exports = routerLoginController;