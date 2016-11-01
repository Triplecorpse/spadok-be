var routerEmailController = (app) => {
    const env = process.env;
    const local = 'mongodb://localhost/spadok';
    const email = require('./models/email');
    const parseEmail = require('./services/parseDataObjectService');
    const isConnectionAllowed = require('./services/checkOriginService');

    app.post('/api/addemail', (req, res) => {
        if (isConnectionAllowed(req)) {
            var newEmail = new email(parseEmail(req.body));
            newEmail.save((err, email) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(email);
                }
            })
        } else {
            res.sendStatus(401);
        }
    });

}

module.exports = routerEmailController