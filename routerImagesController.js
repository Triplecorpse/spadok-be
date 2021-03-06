var routerImagesController = (app) => {
    const project = require('./models/project');
    const user = require('./models/user');
    const partner = require('./models/partner');
    const formidable = require('formidable');
    const fs = require('fs');

    var dataDir = process.env.OPENSHIFT_DATA_DIR || __dirname 

    app.post('/adminium/partnerimg/:id', function (req,res) {
        if (req.session.isLoggedIn) {
            var partners = createFolderStructure('partner');
            var form = new formidable.IncomingForm();
            form.uploadDir = partners;
            form.keepExtensions = true;
            form.multiples = true;
            form.parse(req, function (err, fields, files) {
                let url = parsePath(files.file.path);
                let collector = {id: req.params.id, fileUrl: files.file.path, url: url};
                if (url) {
                    partner.findById(req.params.id, (err, foundPartner) => {
                        collector.fp = foundPartner;
                        if (err) {
                            res.status(500).json({e: err, c: collector});
                        } else {
                            foundPartner.picture = url;
                            foundPartner._id = undefined;
                            delete foundPartner.id;

                            partner.findByIdAndUpdate(req.params.id, foundPartner, (err, updatedUser) => {
                                collector.up = updatedUser;
                                if (err) {
                                    res.status(500).json({e: err, c: collector, up: {foundPartner}});
                                } else {
                                    res.status(200).json(collector);
                                }
                            });
                        }
                    });
                } else {
                    res.status(304).json(collector);
                }
            })

        } else {
            res.sendStatus(401)
        }
    });

    app.post('/adminium/userimg/:id', function (req,res) {
        if (req.session.isLoggedIn) {
            var users = createFolderStructure('user')
            var form = new formidable.IncomingForm();
            form.uploadDir = users;
            form.keepExtensions = true;
            form.multiples = true;
            form.parse(req, function (err, fields, files) {
                let url = parsePath(files.file.path);
                let collector = {id: req.params.id};
                if (url) {
                    user.findById(req.params.id, (err, foundUser) => {
                        collector.fp = foundUser;
                        if (err) {
                            res.status(500).json({e: err});
                        } else {
                            foundUser.picture = url;
                            foundUser._id = undefined;
                            delete foundUser.id;

                            user.findByIdAndUpdate(req.params.id, foundUser, (err, updatedUser) => {
                                collector.up = updatedUser;
                                if (err) {
                                    res.status(500).json({e: err, up: {foundUser}});
                                } else {
                                    res.status(200).json(collector);
                                }
                            });
                        }
                    });
                } else {
                    res.sendStatus(304);
                }
            })

        } else {
            res.sendStatus(401)
        }
    });

    app.post('/adminium/projectimg/:id/:entity', function (req, res) {
        if (req.session.isLoggedIn) {
            var outerDir = createFolderStructure('project', req.params.id, req.params.entity)
            var form = new formidable.IncomingForm();
            form.uploadDir = outerDir;
            form.keepExtensions = true;
            form.multiples = true;
            form.parse(req, function (err, fields, files) {
                let url = parsePath(files.file.path);
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
                            foundProject._id = undefined;
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

    function createFolderStructure(type, id, pictureEntity) {
        var workingFolder;

        if (type === 'project') {
            let projects = `${dataDir}/media/projects`;
            let innerDir = `${projects}/${id}`;
            workingFolder = `${innerDir}/${pictureEntity}`;
            if (!fs.existsSync(projects)) {
                fs.mkdirSync(projects);
            }
            if (!fs.existsSync(innerDir)) {
                fs.mkdirSync(innerDir);
                fs.mkdirSync(`${innerDir}/main`);
                fs.mkdirSync(`${innerDir}/gallery`);
            }
        } else if (type === 'user') {
            let users = `${dataDir}/media/users`;
            if (!fs.existsSync(users)) {
                fs.mkdirSync(users);
            }
            workingFolder = users;
        } else if (type === 'partner') {
            var partners = `${dataDir}/media/partners`;
            if (!fs.existsSync(partners)) {
                fs.mkdirSync(partners);
            }
            workingFolder = partners
        }

        return workingFolder;
    }

    function parsePath(rawPath) {
        let cleanPath = rawPath.split(`\\`);
        if (cleanPath.length === 1) {
            cleanPath = rawPath.split(`/`);
        }

        let index;
        for (let i in cleanPath) {
            if (cleanPath[i] === 'media') {
                index = i;
                break;
            }
        }

        cleanPath = '/pmedia?path=' + cleanPath.slice(index).join('/');

        return cleanPath;
    }

    // Create folder /media
    if (!fs.existsSync(`${dataDir}/media`)) {
        fs.mkdirSync(`${dataDir}/media`)
    }
};

module.exports = routerImagesController;