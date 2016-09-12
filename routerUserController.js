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

    app.post('/adminium/login', function (req, res) {
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

    app.post('/adminium/adduser', function (req, res) {
        if(req.session.isLoggedIn) {
            var parsedUser = parseUser(req.body);
            user.findOne({$or: [{name: parsedUser.name}, {email: parsedUser.email}]}, (err, foundUser) => {
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

        } else {
            res.sendStatus(401);
        }
    });

    app.delete('/adminium/removeuser/:id', (req, res) => {
        if(req.session.isLoggedIn){
            user.find({_id: req.params.id}).remove((err, user) => {
                if (err) res.send(err);
                res.json(user);
            })
        } else {
            res.sendStatus(401)
        }
    });

    app.put('/adminium/updateuser', (req, res) => {
        if(req.session.isLoggedIn) {
            let id = req.body._id;
            let updatedUser = parseUser(req.body);
            user.findByIdAndUpdate(id, updatedUser, (err, user) => {
                if (err) {
                    res.status(500).json({up: updatedUser, e: err});
                } else {
                    res.json(user);
                }
            });
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

    createAdmin();
    function createAdmin() {
        user.find({name: 'admin'}, decide);

        function decide(err, data) {
            if (err) throw err;
            if (!data.length) {
                let newUser = new user({
                    name: 'admin',
                    rusName: 'admin',
                    engName: 'admin',
                    email: 'eldar.khaitov@gmail.com',
                    rusPosition: 'admin',
                    engPosition: 'admin',
                    dateRegistered: new Date(),
                    password: 'admin',
                    canHandleProjects: true,
                    canHandleUsers: true,
                    isInTeam: false
                });
                newUser.save((err) => {
                    if(err) throw err;
                })
            }
        }
    }
};

module.exports = routerLoginController;