var snake, apple, squareSize, score, speed, updateDelay, direction,
    new_direction, addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_key, textStyle_value;

var Game = {
    preload : function () {
        //here we load all the needed resources for the level.
        //In our case, that's just two squares - one for the snake body
        //and one for the apple
        game.load.image('snake', './app/images/snake.png');
        game.load.image('apple', './app/images/apple.png');
    },
    create : function () {
        //by setting up global variables in the create function, we initialise them on
        //we need them to be globally available so that the update function can alter

        snake = [];             //this will work as a stack, cointaining the parts of our snake
        apple = {};             //an object for the apple
        squareSize = 15;        //the length of a side of the squares. Our image is 15x15
        score = 0;              //Game score
        speed = 0;              //Game speed
        updateDelay = 0;        //a variable for control over update rates.
        direction = 'right';    //the direction of our snake.
        new_direction = null;   //a buffer to store the new direction
        addNew = false;         //a variable used when an apple has been eaten

        //set up a phaser controller for keyboard input
        cursors = game.input.keyboard.createCursorKeys();

        game.state.backgroundColor = '#061f27';

        //generate the initial snake stack. Our snake will be 10 elements long.
        //beginning at x=150 y=150 and increasing the x on every iteration.
        for (var i = 0; i < 10; i ++) {
            snake[i] = game.add.sprite(150 + squareSize * i, 150, 'snake');
        }

        //generate the first
        this.generateApple();

        //add text at the top of game.
        textStyle_key = { font : 'bold 14px sans-serif', fill : '#46c0f9', align : 'center'};
        textStyle_value = { font : 'bold 18px sans-serif', fill : '#fff', align : 'center'};

        //score
        game.add.text(30, 20, 'SCORE', textStyle_key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_value);

        //speed
        game.add.text(500, 20, "SPEED", textStyle_key);
        speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_value);
    },

    update : function (){
        //handle arrow key presses while not allowing illegal direction changes that will
        //kill the player
        if (cursors.right.isDown && direction != 'left')
            new_direction = 'right';
        else if (cursors.left.isDown && direction != 'right')
            new_direction = 'left';
        if (cursors.up.isDown && direction != 'down')
            new_direction = 'up';
        else if (cursors.down.isDown && direction != 'up')
            new_direction = 'down';


        //formula to calculate game speed based on score
        //the higher the score, the higher the game score, with a maximum of 10
        speed = Math.min(10, Math.floor(score/5));
        //Update speed value on game screen
        speedTextValue.text = '' + speed;

        //since the update function of Phaser has an update rate of around 60 fps
        //we need to slow that down make the game playable

        //increase a counter on every update call.
        updateDelay++;

        //Do game stuff only if the counter is aliquot to (10 - the game speed)
        //the higher the speed, the more frequently this is fulfilled
        //making the snake move faster
        if (updateDelay % (10 - speed) == 0) {
            //snake movement
            var firstCell = snake[snake.length-1],
            lastCell = snake.shift(),
            oldLastCellx = lastCell.x,
            oldLastCelly = lastCell.y;

            //if a new direction has been chosen from the keyboard, make it the
            //direction
            if (new_direction) {
                direction = new_direction;
                new_direction = null;
            }

            //change the last cell's coordinates relative to the head of the snake
            //according to the direction
            if (direction == 'right'){
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }


            //place the lastCell in the front of the stack
            //mark it the first cell
            snake.push(lastCell);
            firstCell = lastCell;

            //increase length of snake if an apple had been eaten.
            //create a block in the back of the snake with the old position of the previous last
            //block
            //(it has moved now along with the rest of the snake)

            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }
            //check for apple collision
            this.appleCollision(firstCell);
            //check for collision with self. Parameter is the head of snake
            this.selfCollision(firstCell);
            //check collision with wall. Parameter is the head of snake
            this.wallCollision(firstCell);
        }


    },

    appleCollision : function() {
        //check if any part of the snake is overlapping the apple
        //this needed if the apple spawns inside of the snake.

        for (var i = 0; i < snake.length; i ++) {
            if (snake[i].x == apple.x && snake[i].y == apple.y) {
                //next time the snake moves, a new block will be added to this length
                addNew = true;

                //destroy the old apple
                apple.destroy();

                //make a new one
                this.generateApple();

                //increase score.
                score ++;

                //refresh scoreboard
                scoreTextValue.text = score.toString();
            }
        }
    },

    generateApple : function () {
        //choose a random place on the grid.
        //x is between 0 and 585 (39*15)
        //y is between 0 and 435 (29*15)
        var randomX = Math.floor( Math.random() * 40 ) * squareSize;
        var randomY = Math.floor( Math.random() * 30 ) * squareSize;

        //add new apple
        apple = game.add.sprite(randomX, randomY, 'apple');
    },

    selfCollision : function (head) {
        //check if the head of the snake overlaps with any part of the snake

        for (var i = 0; i < snake.length - 1; i ++ ){
            if (head.x == snake[i].x && head.y == snake[i].y){
                //go to gameover screen
                game.state.start("Game_Over");
            }
        }
    },

    wallCollision : function (head) {
        //check if the head of the snake is in the boundaries of the game field.
        if (head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0) {
            //if it's not in, we've hit a wall. Go to game over screen.
            game.state.start("Game_Over");
        }
    }
};
