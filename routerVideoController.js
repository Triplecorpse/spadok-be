var routerVideoController = (app) => {
    app.post('/adminium/addvideo', function (req, res) {
        if(req.session.isLoggedIn){
            databaseVideoController().save(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/adminium/getvideos', (req, res) => {
        if(req.session.isLoggedIn){
            databaseVideoController().find()
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/removevideo', (req, res) => {
        if(req.session.isLoggedIn){
            databaseVideoController().remove(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/updatevideo', (req, res) => {
        if(req.session.isLoggedIn){
            databaseVideoController().update(req.body)
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

module.exports = routerVideoController;