var routerReviewController = (app) => {
    const databaseReviewController = require('./databaseReviewController.js');

    app.post('/adminium/addreview', function (req, res) {
        if(req.session.isLoggedIn){
            databaseReviewController().save(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/adminium/getreviews', (req, res) => {
        if(req.session.isLoggedIn){
            databaseReviewController().find()
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/removereview', (req, res) => {
        if(req.session.isLoggedIn){
            databaseReviewController().remove(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/updatereview', (req, res) => {
        if(req.session.isLoggedIn){
            databaseReviewController().update(req.body)
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

module.exports = routerReviewController;