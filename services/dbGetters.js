const page = require('../models/page.js');
const partner = require('../models/partner');
const project = require('../models/project');
const review = require('../models/review');
const user = require('../models/user');

module.exports = {
    getPage: (query) => {
        return new Promise((resolve, reject) => {
            page.find(query, (err, page) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(page);
                }
            });
        });
    },
    getPartners: (query) => {
        return new Promise((resolve, reject) => {
            partner.find(query, (err, partners) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(partners);
                }
            });
        });
    },
    getProjects: (query) => {
        return new Promise((resolve, reject) => {
            project.find(query, (err, projects) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(projects);
                }
            });
        });
    },
    getReviews: (query) => {
        return new Promise((resolve, reject) => {
            review.find(query, (err, reviews) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reviews);
                }
            });
        });
    },
    getUsers: (query) => {
        return new Promise((resolve, reject) => {
            user.find(query, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    }
};