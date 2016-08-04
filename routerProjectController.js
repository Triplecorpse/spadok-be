var routerProjectController = (app) => {
    const project = require('./models/project');

    app.get('/api/projects', (req, res) => {
        project.find({
            isCompleted: false,
            isPublished: true
        }, (err, projects) => {
            if (err) res.send(err);
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.json(projects);
        })
    });

    app.get('/adminium/getprojects', (req, res) => {
        if(req.session.isLoggedIn){
            project.find((err, projects) => {
                if (err) res.send(err);
                res.json(projects);
            });
        } else {
            res.sendStatus(401)
        }
    });

    app.post('/adminium/addproject', function (req, res) {
        if(req.session.isLoggedIn){
            let newProject = new project(req.body);
            newProject.save(req.body, (err,project) => {
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
            req.body._id = undefined;
            let updatedProject = new project(req.body);
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