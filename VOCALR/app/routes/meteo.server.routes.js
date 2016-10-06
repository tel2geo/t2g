module.exports = function(app) {
    var meteo = require('../controllers/meteo.server.controller');
    app.get('/meteo', meteo.render);
};

