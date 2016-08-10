var routerImagesController = (app) => {
    const project = require('./models/project');
    const parseProject = require('./services/project');
    const formidable = require('formidable');
    const fs = require('fs');

    app.post('/adminium/projectimg/:id/:entity', function (req, res) {
        if(req.session.isLoggedIn){
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
                let urls = [];
                urls.push(files.file.path);

                let url = files.file.path.split(`\\`);
                if(url.length === 1) {
                    url = files.file.path.split(`/`);
                }
                urls.push(url);

                let index;
                for(let i in url) {
                    if(url[i] === 'media') {
                        index = i;
                        break;
                    }
                }
                urls.push(index);

                url = url.slice(index).join('/');
                urls.push(url);

                if(url) {
                    let foundProject = {};
                    if (req.params.entity === 'main') {
                        foundProject.picture = url;
                    } else if (req.params.entity === 'gallery') {
                        foundProject.pictures.push(url);
                    }
                    // project.findById(req.params.id, (err, foundProject) => {
                    //     if (req.params.entity === 'main') {
                    //         foundProject.picture = url;
                    //     } else if (req.params.entity === 'gallery') {
                    //         foundProject.pictures.push(url);
                    //     }
                    //     foundProject._id = undefined;
                    //     // res.json(foundProject);
                        urls.push(foundProject);
                    //     urls.push(req.params.id);

                        project.update({_id: req.params.id}, foundProject, (err, project) => {
                            if (err){
                                res.status(500).json({e: err, up: {foundProject}});
                            } else {
                                urls.push(project);
                                res.status(200).json(urls);
                            }
                        });
                    // });
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