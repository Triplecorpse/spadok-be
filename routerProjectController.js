var routerProjectController = (app) => {
    const databaseProjectController = require('./databaseProjectController.js');

    app.post('/adminium/addproject', function (req, res) {
        if(req.session.isLoggedIn){
            databaseProjectController().save(req.body)
                .then(() => {
                    res.sendStatus(200);
                });
        } else {
            res.send(401);
        }
    });

    app.get('/adminium/getprojects', (req, res) => {
        if(req.session.isLoggedIn){
            databaseProjectController().find()
                .then((data) => {
                    res.status(200).json(data);
                });
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/removeproject', (req, res) => {
        if(req.session.isLoggedIn){
            databaseProjectController().remove(req.body)
                .then((data) => {
                    res.status(200).json(data);
                });
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports = routerProjectController;