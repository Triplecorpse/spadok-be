var databaseProjectController = () => {
    const mongoose = require('mongoose');
    const env = process.env;
    const local = 'mongodb://localhost/spadok';

    mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || local);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Connected to ${env.OPENSHIFT_MONGODB_DB_URL || local} to handle projects`);
    });

    var ProjectSchema = mongoose.Schema({
        name: String,
        description: String,
        picture: String,
        people: Number,
        money: Number,
        date: Date,
        isPeopleShown: Boolean,
        isMoneyShown: Boolean,
        isDaysShown: Boolean,
        isPublished: Boolean,
        extension: String
    });

    var ProjectModel = mongoose.model('Project', ProjectSchema);

    function find(query) {
        return new Promise((resolve, reject) => {
            ProjectModel.find(query, (err, data) => {
                if (err) {
                    reject(err, "Error in database.find");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        });
    }

    function save(project) {
        return new Promise((resolve, reject) => {
            let newProject = new ProjectModel(project);
            newProject.save((err, data) => {
                if (err) {
                    reject(err, "Error in database.save");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        })
    }

    function remove(projectId) {
        return new Promise((resolve, reject) => {
            ProjectModel.find({_id: projectId.id}).remove((err, data) => {
                if (err) {
                    reject(err, "Error in database.remove");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        });
    }

    function update(project) {
        return new Promise((resolve, reject) => {
            let updatedProject = new ProjectModel(project);
            ProjectModel.findByIdAndUpdate(project._id, updatedProject, (err, data) => {
                if (err) {
                    reject(err, "Error in database.update");
                } else {
                    resolve(data);
                }
                endQuery();
            });
        });
    }

    function endQuery() {
        delete mongoose.connection.models['Project'];
        mongoose.connection.close();
        console.log(`Closed connection to ${env.OPENSHIFT_MONGODB_DB_URL || local}. Initiator: projects`);
    }


    return {
        find,
        save,
        remove,
        update
    }
};

module.exports = databaseProjectController;