var game;
//create a new instance game with 600x450
game = new Phaser.Game(600, 450, Phaser.AUTO, '');

//first parameter is how our state will be called
//second parameter is an object containing the needed methods for state
//functionality
game.state.add('Menu', Menu);
game.state.add('Lobby', Lobby);
game.state.add('Game', Game);
game.state.add("Game_Over", GameOver);

game.state.start('Menu');
