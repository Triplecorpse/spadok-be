var routerProjectController = (app) => {
    const databaseProjectController = require('./databaseProjectController.js');

    app.post('/adminium/addproject', function (req, res) {
        if(req.session.isLoggedIn){
            databaseProjectController().save(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/adminium/getprojects', (req, res) => {
        if(req.session.isLoggedIn){
            databaseProjectController().find()
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/removeproject', (req, res) => {
        if(req.session.isLoggedIn){
            databaseProjectController().remove(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/updateproject', (req, res) => {
        if(req.session.isLoggedIn){
            databaseProjectController().update(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    function onSuccess(res) {
        return (result, msg) => {
            console.log("Success!", msg);
            res.status(200).json(result);
        }
    }

    function onFail(res) {
        return (reason, msg) => {
            console.log("Fail!", msg);
            res.status(500).json(reason);
        }
    }

};

module.exports = routerProjectController;