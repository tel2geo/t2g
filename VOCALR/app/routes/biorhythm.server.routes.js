module.exports = function(app) {
    var biorhythm = require('../controllers/biorhythm.server.controller');
    app.get('/biorhythm', biorhythm.render);

};
