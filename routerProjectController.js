var routerProjectController = (app) => {
    const project = require('./models/project');
    const parseProject = require('./services/parseDataObjectService');

    app.post('/adminium/addproject', function (req, res) {
        if (req.session.isLoggedIn && req.session.canHandleProjects) {
            let currentProject = parseProject(req.body);
            let newProject = new project(currentProject);
            newProject.save(currentProject, (err, project) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(project);
                }
            });
        } else if (req.session.isLoggedIn && !req.session.canHandleProjects) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401)
        }
    });


    app.delete('/adminium/removeproject/:id', (req, res) => {
        if (req.session.isLoggedIn && req.session.canHandleProjects) {
            project.find({_id: req.params.id}).remove((err, project) => {
                if (err) res.send(err);
                res.json(project);
            })
        } else if (req.session.isLoggedIn && !req.session.canHandleProjects) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401)
        }
    });

    app.put('/adminium/updateproject', (req, res) => {
        if (req.session.isLoggedIn && req.session.canHandleProjects) {
            let id = req.body._id;
            let updatedProject = parseProject(req.body);
            project.findByIdAndUpdate(id, updatedProject, (err, project) => {
                if (err) {
                    res.status(500).json({up: updatedProject, e: err});
                } else {
                    res.json(project);
                }
            });
        } else if (req.session.isLoggedIn && !req.session.canHandleProjects) {
            res.sendStatus(403)
        } else {
            res.sendStatus(401)
        }
    });
};

module.exports = routerProjectController;