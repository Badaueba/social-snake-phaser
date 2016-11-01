var mongoose = require("mongoose");
var config = require("./main");

module.exports.init = initMongoose;

function initMongoose (app) {
    mongoose.connect(config.mongodb.uri);

    process.on('SIGINT', exit);
    process.on('SIGTERM', exit);
    process.on('SIGHUP', exit);

    if (app) {
        app.set('mongoose', mongoose);
    }

    return mongoose;
}

function exit() {
    mongoose.connection.close(function () {
        console.log('Encerrando conexão com com mongodb...');
        process.exit(0);
    });
}
