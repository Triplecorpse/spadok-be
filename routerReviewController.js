var routerReviewController = (app) => {
    const review = require('./models/review');
    const parseReview = require('./services/parseReview');

    app.post('/api/addreview', function (req, res) {
        if(req.session.isApiAvailable){
            var newReview = new review(parseReview(req.body));
            console.log(newReview);
            newReview.save(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.get('/adminium/getreviews', (req, res) => {
        if(req.session.isLoggedIn){
            review.find()
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/removereview', (req, res) => {
        if(req.session.isLoggedIn){
            review.remove(req.body)
                .then(onSuccess(res), onFail(res));
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/adminium/updatereview', (req, res) => {
        if(req.session.isLoggedIn){
            review.update(req.body)
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