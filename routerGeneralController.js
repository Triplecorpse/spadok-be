var routerController = (app) => {
    const fs = require('fs');
    const parsePage = require('./services/parseDataObjectService');
    const page = require('./models/page');
    const dbGetters = require('./services/dbGetters');
    const path = require('path');
    const jwt = require('jsonwebtoken');
    const crypt = require('./services/cryptoStringService.js');
    const password = 'safsdgfgdrgdf';
    let parsePageOptions = {
        save: []
    }

    function createParsePageOptions(page) {
        if (page.stats) {
            for (let key in page.stats) {
                parsePageOptions.save.push({ key: key, tag: /({strong})/g });
                parsePageOptions.save.push({ key: key, tag: /({\/strong})/g });
            }
        }
    }

    app.get('/adminium/getall', (req, res) => {
        if (req.session.isLoggedIn) {
            Promise.all([
                dbGetters.getPage(),
                dbGetters.getPartners(),
                dbGetters.getProjects(),
                dbGetters.getReviews(),
                dbGetters.getUsers()
            ])
                .then((response) => {
                    response[0].forEach((element) => {
                        element.email = crypt.decrypt(element.email);
                        element.phone = crypt.decrypt(element.phone);
                    });

                    response[3].forEach((element2) => {
                        element2.email = crypt.decrypt(element2.email);
                    });

                    response[4].forEach((element) => {
                        element.password = undefined;
                        element.login = undefined;
                        element.canHandlePageData = undefined;
                        element.canHandleProjects = undefined;
                        element.canHandleUsers = undefined;
                        element.canHandleReviews = undefined;
                        element.email = crypt.decrypt(element.email);
                        if (element.contacts && element.contacts.phones) {
                            element.contacts.phones = element.contacts.phones.map((phone) => {
                                return crypt.decrypt(phone);
                            })
                        }
                    });
                    res.json(response)
                }, (response) => {
                    res.json(response)
                });
        } else {
            res.sendStatus(401)
        }
    });

    app.get('/api/getall', (req, res) => {
        Promise.all([
            dbGetters.getPage(),
            dbGetters.getPartners({ isPublished: true }),
            dbGetters.getProjects({ isPublished: true }),
            dbGetters.getReviews({ isPublished: true }),
            dbGetters.getUsers({ login: { $ne: 'admin' } })
        ])
            .then((response) => {
                response[0].forEach((element) => {
                    element.email = crypt.decrypt(element.email);
                    element.phone = crypt.decrypt(element.phone);
                });

                response[3].forEach((element2) => {
                    element2.email = crypt.decrypt(element2.email);
                });

                response[4].forEach((element) => {
                    element.password = undefined;
                    element.login = undefined;
                    element.canHandlePageData = undefined;
                    element.canHandleProjects = undefined;
                    element.canHandleUsers = undefined;
                    element.canHandleReviews = undefined;
                    element.email = crypt.decrypt(element.email);
                    if (element.contacts && element.contacts.phones) {
                        element.contacts.phones = element.contacts.phones.map((phone) => {
                            return crypt.decrypt(phone);
                        })
                    }
                });

                res.json(response)
            }, (reason) => {
                res.json(reason)
            });
    });

    app.get('/api2/init', (req, res) => {
        jwt.sign({ user: 'generic' }, password, { expiresIn: '1d' }, function (err, token) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(token);
            }
        });
    });

    app.post('/api2/verify', (req, res) => {
        jwt.verify(req.body.token, password, function (err, payload) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(payload);
            }
        });
    });

    app.put('/adminium/setpage', (req, res) => {
        if (req.session.isLoggedIn) {
            createParsePageOptions(req.body);
            console.log(parsePageOptions);
            var pageData = parsePage(req.body, parsePageOptions);
            pageData.type = 'page';
            page.update({type:'page'}, pageData, (err, data) => {
                if (err) {
                    res.status(500).json({pd: pageData, e: err});
                } else {
                    if(data.n === 0) {
                        new page(pageData).save(pageData, (err, data) => {
                            if (err) {
                                res.status(500).json({pd: pageData, e: err});
                            } else {
                                res.json(data);
                            }
                        });
                    } else {
                        res.json(data);
                    }
                }
            })
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/pmedia', (req, res) => {
        var path = req.query.path;
        var dataDir = process.env.OPENSHIFT_DATA_DIR || __dirname;
        console.log('GET /media', `${dataDir}${path}`)
        fs.stat(`${dataDir}${path}`, (err, file) => {
            if (err) {
                res.status(404).json({ message: `File ${path} was not found on server` });
            } else {
                res.sendFile(`${dataDir}${path}`)
            }
        })
    })

    app.get('/health', function (req, res) {
        res.writeHead(200);
        res.end('1');
    });

};

module.exports = routerController;