var routerImagesController = (app) => {
    const project = require('./models/project');
    const parseProject = require('./services/project');
    const formidable = require('formidable');
    const fs = require('fs');

    app.post('/adminium/projectimg/:id/:entity', function (req, res) {
        if(req.session.isLoggedIn){
            var innerDir = `${__dirname}/static/dist/media/projects/${req.params.id}`;
            var outerDir = `${__dirname}/static/dist/media/projects/${req.params.id}/${req.params.entity}`;
            if (!fs.existsSync(innerDir)) {
                fs.mkdirSync(innerDir);
                fs.mkdirSync(`${innerDir}/main`);
                fs.mkdirSync(`${innerDir}/gallery`);
            }
            var form = new formidable.IncomingForm();
            form.uploadDir = outerDir;
            form.keepExtensions = true;
            form.multiples = true;
            form.parse(req, function (err, fields, files) {
                let url = files.file.path.split(`\\`);
                let index;
                for(let i in url) {
                    if(url[i] === 'media') {
                        index = i;
                        break;
                    }
                }
                url = url.slice(index).join('/');
                console.log(url);
                if(url) {
                    project.findById(req.params.id, (err, foundProject) => {
                        if (req.params.entity === 'main') {
                            foundProject.picture = url;
                        } else if (req.params.entity === 'gallery') {
                            foundProject.pictures.push(url);
                        }
                        let updatedProject = new project(foundProject);
                        project.findByIdAndUpdate(req.params.id, updatedProject, (err, project) => {
                            if (err) res.send(err);
                            res.sendStatus(200);
                        });
                    });
                }
            });
        } else {
            res.sendStatus(401)
        }
    });
};

module.exports = routerImagesController;