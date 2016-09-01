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
                    console.log(err);
                    reject(err);
                } else {
                    // console.log(page);
                    // console.log("got page");
                    resolve(page);
                }
            });
        });
    },
    getPartners: (query) => {
        return new Promise((resolve, reject) => {
            partner.find(query, (err, partners) => {
                if (err) {
                    console.log(err);

                    reject(err);
                } else {
                    // console.log(partners);
                    // console.log("got partners");
                    resolve(partners);
                }
            });
        });
    },
    getProjects: (query) => {
        return new Promise((resolve, reject) => {
            project.find(query, (err, projects) => {
                if (err) {
                    console.log(err);

                    reject(err);
                } else {
                    // console.log(projects);
                    // console.log("got projects");
                    resolve(projects);
                }
            });
        });
    },
    getReviews: (query) => {
        return new Promise((resolve, reject) => {
            review.find(query, (err, reviews) => {
                if (err) {
                    console.log(err);

                    reject(err);
                } else {
                    // console.log(reviews);
                    // console.log("got reviews");
                    resolve(reviews);
                }
            });
        });
    },
    getUsers: (query) => {
        return new Promise((resolve, reject) => {
            user.find(query, (err, users) => {
                if (err) {
                    console.log(err);

                    reject(err);

                } else {
                    // console.log(users);
                    // console.log("got users");
                    resolve(users);
                }
            });
        });
    }
};