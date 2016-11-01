module.exports = {
    port : process.env.PORT || 8000,
    hostname : process.env.IP || '127.0.0.1',
    mongodb : {
        uri : 'mongodb://simpleuser:123@ds029705.mlab.com:29705/spsnake'
    },
    app : {
        name : 'Snake Phaser Multiplayer'
    },

    authConfig : {
        facebookAuth : {
            'clientID' : 'YourClientIDFromFacebook',
            'clientSecret' : 'YourClientSecret',
            'callbackURL' : 'http://localhost:8000/auth/facebook/callback'
        }

    }

}
