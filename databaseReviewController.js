var databaseProjectController = () => {
    const mongoose = require('mongoose');
    const env = process.env;
    const local = 'mongodb://localhost/spadok';

    mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || local);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Connected to ${env.OPENSHIFT_MONGODB_DB_URL || local} to handle reviews`);
    });

    var ReviewSchema = mongoose.Schema({
        name: String,
        job: String,
        text: String,
        extension: String
    });

    var ReviewModel = mongoose.model('Review', ReviewSchema);

    function find(query) {
        return new Promise((resolve, reject) => {
            ReviewModel.find(query, (err, data) => {
                if (err) {
                    reject(err, "Error in review.find");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        });
    }

    function save(project) {
        return new Promise((resolve, reject) => {
            let newProject = new ReviewModel(project);
            newProject.save((err, data) => {
                if (err) {
                    reject(err, "Error in review.save");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        })
    }

    function remove(projectId) {
        return new Promise((resolve, reject) => {
            ReviewModel.find({_id: projectId.id}).remove((err, data) => {
                if (err) {
                    reject(err, "Error in review.remove");
                } else {
                    resolve(data);
                }
                endQuery();
            })
        });
    }

    function update(project) {
        let id = project._id;
        project._id = undefined;
        return new Promise((resolve, reject) => {
            let updatedProject = new ReviewModel(project);
            ReviewModel.findByIdAndUpdate(id, updatedProject, (err, data) => {
                if (err) {
                    reject(err, "Error in review.update");
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
        console.log(`Closed connection to ${env.OPENSHIFT_MONGODB_DB_URL || local}. Initiator: reviews`);
    }


    return {
        find,
        save,
        remove,
        update
    }
};

module.exports = databaseProjectController;