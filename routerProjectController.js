var routerProjectController = (app) => {
    const project = require('./models/project');
    const parseProject = require('./services/project');

    app.post('/adminium/addproject', function (req, res) {
        if(req.session.isLoggedIn){
            let currentProject = parseProject(req.body);
            let newProject = new project(currentProject);
            newProject.save(currentProject, (err, project) => {
                if (err) res.send(err);
                res.json(project);
            });
        } else {
            res.sendStatus(401)
        }
    });


    app.delete('/adminium/removeproject/:id', (req, res) => {
        if(req.session.isLoggedIn){
            project.find({_id: req.params.id}).remove((err, project) => {
                if (err) res.send(err);
                res.json(project);
            })
        } else {
            res.sendStatus(401)
        }
    });

    app.put('/adminium/updateproject', (req, res) => {
        if(req.session.isLoggedIn) {
            let id = req.body._id;
            let currentProject = parseProject(req.body);
            let updatedProject = new project(currentProject);
            project.findByIdAndUpdate(id, updatedProject, (err, project) => {
                if (err) res.send(err);
                res.json(project);
            });
        } else {
            res.sendStatus(401)
        }
    });
};

module.exports = routerProjectController;