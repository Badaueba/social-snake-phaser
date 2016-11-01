var Menu = {
        preload : function () {
            //loading images is required so that later on we can create sprites
            //based on the t
            //the first argument is how our image will be refered to,
            //the second one is the path to our file
            game.load.image('menu', './app/images/menu.png');
            game.load.image('facebook-login', './app/images/facebook-login.png');
        },
        create : function () {
            this.add.tileSprite(0, 0, 600, 450, 'menu');
            this.add.button(210, 310, 'facebook-login', this.facebookLogin, this);
        },
        facebookLogin : function () {
            //change the state to the actual game
            //this.state.start('Game');
            window.location.href = '/auth/facebook'

        }
};
