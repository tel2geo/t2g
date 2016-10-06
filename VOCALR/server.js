var port = 3000;
var express = require('./config/express');
var app = express();
app.listen(port);
module.exports = app;
console.log('Le serveur est demarré sur http://localhost:' + port);
