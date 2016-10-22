var routerReviewController = (app) => {
    const review = require('./models/review');
    const parseReview = require('./services/parseReview');
    const isConnectionAllowed = require('./services/checkOriginService');

    //TODO: remove mongoose promises
    app.post('/api/addreview', function (req, res) {
        if (isConnectionAllowed(req)) {
            var newReview = new review(parseReview(req.body));
            console.log(newReview);
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(review);
                }
            })
        } else {
            res.sendStatus(401);
        }
    });

    app.delete('/adminium/removereview/:id', (req, res) => {
        if(req.session.isLoggedIn){
            review.find({_id: req.params.id}).remove((err, review) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(review);
                }
            })
        } else {
            res.sendStatus(401);
        }
    });

    app.put('/adminium/updatereview', (req, res) => {
        if(req.session.isLoggedIn){
            let id = req.body._id;
            let updatedReview = parseReview(req.body);
            review.findByIdAndUpdate(id, updatedReview, (err, review) => {
                if (err) {
                    res.status(500).json({ur: updatedReview, e: err});
                } else {
                    res.json(review);
                }
            });
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports = routerReviewController;