module.exports.init = initRoutes;
var path = require("path");
function initRoutes (app) {
    var pathToRoutes = app.get('root') + '/app/routes';
    passport = app.get("passport");
    require(pathToRoutes + '/auth')(app, passport);
    require(pathToRoutes + '/lobby');

    app.get('/', (req, res) => {
      res.sendFile( path.join( app.get("root") + '/public/index.html' ));
    });
}
