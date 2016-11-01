const user = require('../models/user');

function findAndHandle(authData, options, errCb, successCb) {
    user.findOne({ login: authData.login, password: authData.password }, (err, data) => {
        if (err || !data) {
            errCb(err);
        } else {
            successCb(data);
        }
    })
}

module.exports = {
    findAndHandle
};