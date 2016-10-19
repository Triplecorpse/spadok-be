var routerController = (app) => {
    const fs = require('fs');
    const parsePage = require('./services/parsePage');
    const page = require('./models/page');
    const dbGetters = require('./services/dbGetters');
    const path = require('path');

    app.get('/adminium/getall', (req, res) => {
        if (req.session.isLoggedIn) {
            res.set({
                'Access-Control-Allow-Origin:': '*'
            })
            Promise.all([dbGetters.getPage(),
                dbGetters.getPartners(),
                dbGetters.getProjects(),
                dbGetters.getReviews(),
                dbGetters.getUsers()])
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
            dbGetters.getUsers({isInTeam: true})])
            .then((response) => {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.json(response)
            }, (reason) => {
                res.json(reason)
            });
    });

    app.put('/adminium/setpage', (req, res) => {
        if(req.session.isLoggedIn) {
            var pageData = parsePage(req.body);
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

    app.get('/*', function (req, res) {
        req.session.isApiAvailable = true;
        fs.readFile('./static/dist/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });
};

module.exports = routerController;