var routerController = (app) => {
    const fs = require('fs');
    const database = require('./databaseController.js');

    app.get('/', function (req, res) {
        fs.readFile('./static/index.html', 'UTF8', (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });

    app.get('/health', function (req, res) {
        res.writeHead(200);
        res.end('1');
    });

    app.get('/save', function (req, res) {
        console.log("I AM SAVE FUNCTION, READ ME!!!11");
        var promise = database().save({
            name: 'testProject',
            description: 'description of testProject',
            dateRegistered: new Date(),
            dateStarting: new Date(),
            dateExpires: new Date()
        });
        promise.then((product)=>{
            res.send(`Product ${JSON.stringify(product)} successfully saved`);
        })
    });

    app.get('/find', function (req, res) {
        var promise = database().find();
        promise.then((data) => {
            res.send(data);
        })
    });
};

module.exports = routerController;