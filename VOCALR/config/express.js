var express = require('express');
module.exports = function() {
    var app = express();

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/biorhythm.server.routes.js')(app);
    require('../app/routes/t2g.server.routes.js')(app);
    require('../app/routes/meteo.server.routes.js')(app);
    app.use(express.static('./public'));

    return app;
};
