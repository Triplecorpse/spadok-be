var routerLoginController = (app) => {
    const fs = require('fs');
    const session = require('express-session');
    const env = process.env;
    const local = 'mongodb://localhost/spadok';
    const user = require('./models/user');
    const parseUser = require('./services/parseUser');
    const MongoStore = require('connect-mongo')(session);

    var newSession = session({
        secret: 'spadokproject',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
           url: env.OPENSHIFT_MONGODB_DB_URL || local
        }),
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

    app.get('/adminium/isloggedin', (req, res) => {
        if ((req.session.cookie._expires > new Date()) && (req.session.isLoggedIn)) {
            let permissions = {
                canHandleProjects: req.session.canHandleProjects,
                canHandleUsers: req.session.canHandleUsers,
                canHandleReviews: req.session.canHandleReviews,
                canHandlePageData: req.session.canHandlePageData,
                isInTeam: req.session.isInTeam,
                userName: req.session.userName,
                login: req.session.login
            }
            req.session.touch();
            res.status(200).json(permissions);
        } else {
            req.session.isLoggedIn = false;
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.sendStatus(401);
        }
    });

    app.post('/adminium/login', function (req, res) {
        user.findOne({login: req.body.login}, (err, user) => {
            if(err) fail();
            if(!user) {
                findByEmail();
            } else {
                success(user);
            }
        });

        function findByEmail() {
            user.findOne({email: req.body.login}, (err, user) => {
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
                req.session.canHandleUsers = user.canHandleUsers;
                req.session.canHandleProjects = user.canHandleProjects;
                req.session.canHandleReviews = user.canHandleReviews;
                req.session.canHandlePageData = user.canHandlePageData;
                req.session.userName = user.name && user.name.ru;
                req.session.login = user.login

                res.status(200).json(user);
            } else {
                fail();
            }
        }

        function fail() {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/adduser', function (req, res) {
        if (req.session.isLoggedIn && req.session.canHandleUsers) {
            var parsedUser = parseUser(req.body, req.session);
            user.findOne({$or: [{login: parsedUser.login}, {email: parsedUser.email}]}, (err, foundUser) => {
                if(err) {
                    res.sendStatus(500)
                } else {
                    if(!foundUser) {
                        let newUser = new user(parsedUser);
                        newUser.save(parsedUser, (err, createdUser) => {
                            if(err) {
                                res.sendStatus(500);
                            } else {
                                res.json(createdUser);
                            }
                        })
                    } else {
                        res.status(403).json({message: "User with such login or email exists"});
                    }
                }
            });

        } else if (req.session.isLoggedIn && !req.session.canHandleUsers) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401);
        }
    });

    app.delete('/adminium/removeuser/:id', (req, res) => {
        if (req.session.isLoggedIn && req.session.canHandleUsers) {
            user.find({_id: req.params.id}).remove((err, user) => {
                if (err) res.send(err);
                res.json(user);
            })
        } else if (req.session.isLoggedIn && !req.session.canHandleUsers) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401)
        }
    });

    app.put('/adminium/updateuser', (req, res) => {
        if (req.session.isLoggedIn && req.session.canHandleUsers) {
            let id = req.body._id;
            let updatedUser = parseUser(req.body, req.session);
            user.findByIdAndUpdate(id, updatedUser, (err, user) => {
                if (err) {
                    res.status(500).json({up: updatedUser, e: err});
                } else {
                    res.json(user);
                }
            });
        } else if (req.session.isLoggedIn && !req.session.canHandleUsers) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401)
        }
    });

    app.get('/adminium/logout', (req, res) => {
        req.session.isLoggedIn = false;
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/adminium');
            }
        });
    });

    (function createAdmin() {
        user.find({login: 'admin'}, decide);

        function decide(err, data) {
            if (err) throw err;
            if (!data.length) {
                let newUser = new user({
                    login: 'admin',
                    email: 'eldar.khaitov@gmail.com',
                    dateRegistered: new Date(),
                    password: 'admin',
                    canHandleProjects: true,
                    canHandleUsers: true,
                    canHandlePageData: true,
                    canHandleReviews: true,
                    isInTeam: false
                });
                newUser.save((err) => {
                    if(err) throw err;
                })
            }
        }
    })();
};

module.exports = routerLoginController;