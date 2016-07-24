const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      express      = require('express'),
      app          = express(),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env,
      mongoose     = require('mongoose');

mongoose.connect(env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
});

var kittySchema = mongoose.Schema({
    name: String
});
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});

Kitten.find(function (err, kittens) {
    if (err) return console.error("ERROR", err);
    console.log(kittens);
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/health', function (req, res) {
    res.writeHead(200);
    res.end('1');
});


app.get('/health2', function (req, res) {
    res.writeHead(200);
    res.end('Healthy');
});
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  // console.log(`Example app listening on port ${env.NODE_PORT || 3000}!`);
  console.log(`Application worker ${process.pid} started...`);
});