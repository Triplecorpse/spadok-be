var routerImagesController = (app) => {
    const project = require('./models/project');
    const parseProject = require('./services/project');
    const formidable = require('formidable');
    const fs = require('fs');

    app.post('/adminium/projectimg/:id/:entity', function (req, res) {
        if (req.session.isLoggedIn) {
            var projects = `${__dirname}/static/dist/media/projects`;
            var innerDir = `${__dirname}/static/dist/media/projects/${req.params.id}`;
            var outerDir = `${__dirname}/static/dist/media/projects/${req.params.id}/${req.params.entity}`;
            if (!fs.existsSync(projects)) {
                fs.mkdirSync(projects);
            }
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
                if (url.length === 1) {
                    url = files.file.path.split(`/`);
                }

                let index;
                for (let i in url) {
                    if (url[i] === 'media') {
                        index = i;
                        break;
                    }
                }

                url = url.slice(index).join('/');
                let collector = {id: req.params.id};
                if (url) {
                    project.findById(req.params.id, (err, foundProject) => {
                        collector.fp = foundProject;
                        if (err) {
                            res.status(500).json({e: err});
                        } else {
                            if (req.params.entity === 'main') {
                                collector.p1=foundProject.picture;
                                foundProject.picture = url;
                                collector.p2=foundProject.picture;
                            } else if (req.params.entity === 'gallery') {
                                collector.ps1=foundProject.pictures;
                                foundProject.pictures.push(url);
                                collector.ps2=foundProject.pictures;
                            }
                            project.findByIdAndUpdate(req.params.id, foundProject, (err, updatedProject) => {
                                collector.up = updatedProject;
                                if (err) {
                                    res.status(500).json({e: err, up: {foundProject}});
                                } else {
                                    res.status(200).json(collector);
                                }
                            });
                        }
                    });
                } else {
                    res.sendStatus(304);
                }
            });
        } else {
            res.sendStatus(401)
        }
    });
};

module.exports = routerImagesController;