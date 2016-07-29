var databaseProjectController = () => {
    const mongoose = require('mongoose');
    const env = process.env;
    const local = 'mongodb://localhost/spadok';
    var ProjectSchema;
    var ProjectModel;

    mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || local);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Connected to ${env.OPENSHIFT_MONGODB_DB_URL || local} to handle projects`);
    });

    ProjectSchema = mongoose.Schema({
        name: String,
        description: String,
        picture: String,
        people: Number,
        money: Number,
        date: Date,
        isShownPeople: Boolean,
        isShownMoney: Boolean,
        isShownDate: Boolean,
        isPublished: Boolean,
        extension: String
    });

    ProjectModel = mongoose.model('Project', ProjectSchema);

    function find(query) {
        return ProjectModel.find(query, (err, proj) => {
            if (err)
                return console.error("Error in database.find", err);
        })
            .then(resolve, resolve);
    }

    function save(project) {
        console.log('Saving project...');
        let newProject = new ProjectModel(project);
        return newProject.save((err, proj) => {
            if (err) console.error("Error in database.save", err);
        })
            .then(resolve, resolve);
    }

    function resolve(product) {
        delete mongoose.connection.models['Project'];
        mongoose.connection.close();
        console.log(`Closed connection to ${env.OPENSHIFT_MONGODB_DB_URL || local}. Initiator: projects`);
        return product;
    }

    return {
        find,
        save
    }
};

module.exports = databaseProjectController;