var routerProjectController = (app) => {
    const partner = require('./models/partner');
    const parsePartner = require('./services/parsePartner');

    app.post('/adminium/addpartner', function (req, res) {
        if(req.session.isLoggedIn){
            let currentProject = parsePartner(req.body);
            let newProject = new partner(currentProject);
            newProject.save(currentProject, (err, partner) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(partner);
                }
            });
        } else {
            res.sendStatus(401)
        }
    });

    app.delete('/adminium/removepartner/:id', (req, res) => {
        if(req.session.isLoggedIn){
            partner.find({_id: req.params.id}).remove((err, partner) => {
                if (err) res.send(err);
                res.json(partner);
            })
        } else {
            res.sendStatus(401)
        }
    });

    app.put('/adminium/updatepartner', (req, res) => {
        if(req.session.isLoggedIn) {
            let id = req.body._id;
            let updatedPartner = parsePartner(req.body);
            partner.findByIdAndUpdate(id, updatedPartner, (err, partner) => {
                if (err) {
                    res.status(500).json({up: updatedPartner, e: err});
                } else {
                    res.json(partner);
                }
            });
        } else {
            res.sendStatus(401)
        }
    });
};

module.exports = routerProjectController;