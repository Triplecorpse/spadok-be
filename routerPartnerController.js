var routerProjectController = (app) => {
    const partner = require('./models/partner');
    const parsePartner = require('./services/parseDataObjectService');
    let parsePartnerOptions = {
        save: []
    }

    function createParsePartnerOptions(partner) {
        if (partner.achievements && partner.achievements.length) {
            parsePartnerOptions.save = [];
            var sample = partner.achievements[0];
            for (let key in sample) {
                parsePartnerOptions.save.push({ key: key, tag: /{a href[^\}]*}/ });
                parsePartnerOptions.save.push({ key: key, tag: /({\/a})/ });
            }
        }
    }

    app.post('/adminium/addpartner', function (req, res) {
        if (req.session.isLoggedIn) {
            createParsePartnerOptions(req.body);
            let currentProject = parsePartner(req.body, parsePartnerOptions);
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
            createParsePartnerOptions(req.body);
            let updatedPartner = parsePartner(req.body, parsePartnerOptions);
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