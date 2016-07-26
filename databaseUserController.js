var userDatabaseController = () => {
    const mongoose = require('mongoose');
    const env = process.env;
    const local = 'mongodb://localhost/spadok';
    var UserSchema;
    var UserModel;

    mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || local);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Connected to ${env.OPENSHIFT_MONGODB_DB_URL || local} to handle users`);
    });

    UserSchema = mongoose.Schema({
        name: String,
        email: String,
        dateRegistered: Date,
        password: String,
        canHandleProjects: Boolean,
        canHandleUsers: Boolean,
        extension: String
    });

    UserModel = mongoose.model('User', UserSchema);

    function find(query) {
        return UserModel.findOne(query, (err, proj) => {
            if (err)
                return console.error("Error in database.find in User", err);
        })
            .then(resolve, resolve);
    }

    function save(user) {
        let newUser = new UserModel(user);
        return newUser.save((err, user) => {
            if (err) console.error("Error in database.save ib User", err);
        })
            .then(resolve, resolve);
    }

    function resolve(user) {
        delete mongoose.connection.models['User'];
        mongoose.connection.close();
        console.log(`Closed connection to ${env.OPENSHIFT_MONGODB_DB_URL || local}. Initiator: user controller.`);
        return user;
    }

    return {
        find,
        save
    }
};

module.exports = userDatabaseController;