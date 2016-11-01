var FacebookStrategy = require("passport-facebook").Strategy;

var User = require("../models/user");
var authConfig = require("./main").authConfig;
var passport = require("passport");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //FACEBOOK Strategy
    passport.use(new FacebookStrategy(
        {
            clientID : authConfig.facebookAuth.clientID,
            clientSecret : authConfig.facebookAuth.clientSecret,
            callbackURL : authConfig.facebookAuth.callbackURL
        },
        function (token, refreshToken, profile, done) {
            console.log(profile);
            process.nextTick(function (){
                User.findOne ({ "facebook.id" : profile.id}, (err, user) => {
                    if (err) return done(err);
                    if (user) return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName;
                        newUser.facebook.displayName = profile.displayName;

                        newUser.save(err => {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ))
}
