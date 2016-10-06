module.exports = function(app) {
    var t2g = require('../controllers/t2g.server.controller');
    app.get('/t2g', t2g.render);
};

