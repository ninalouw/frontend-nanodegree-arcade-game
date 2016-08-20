// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //I think this sets the initial location://
    this.x = x; //was 0
    this.y = y; //was 300
    this.speed = Math.floor(Math.random() * 225);
};

//checkCollisions - handles player and enemy collisions//
Enemy.prototype.checkCollision = function(player){
    if(Math.abs(player.x - this.x) < this.collisionWidth && Math.abs(player.y - this.y) < this.collisionHeight){
        player.reset();
    }

    };
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt,player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //I think this updates the enemy location, but not sure how to include dt//
    if (this.x >= 505){
        this.x += (this.speed) * dt;
    }
    else {
         this.x = 0;
    }
    //I think this handles collisions with the Player//
    this.checkCollision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
//This loads the player image//
    this.sprite = 'images/char-cat-girl.png';
//I think this sets the initial location://
    this.x = 202;
    this.y = 404;
};

// Update the player's position//
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //I think this updates the player location, but not sure how to include dt//
    this.x = x + (dt *200);

};

// Draws the player onscreen//
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x, this.y);
};

//The handleInput method which receives user input, allowedKeys//
Player.prototype.handleInput = function(keyCode) {
//** Here we must define something so that player can't go offscreen//
//tileWidth = 101, tileHeight = 83, canvasWidth = 505, canvasHeight=606//
switch (keyCode){
    case 'left':
    if(this.x - 101 < 0){
        this.x = 0;
    }
    else{
        this.x -= 101;
    }
    break;
    case 'right':
    if(this.x + 101 >= 404){ //furthest right player can go//
        this.x = 404;
    }
    else{
        this.x += 101;
    }
    break;
    case 'up':
    if(this.y - 83 < 0){
        this.y = 0;    //add var hasReachedWater, which must be added to reset//
    }
    else{
        this.y -= 83;
    }
    break;
    case 'down':
    if(this.y + 83 >= 404){ //Player's max dist from top of canvas. 380? check size of player//
        this.y = 404;
    }
    else{
        this.y += 83;
    }
    break;
}

console.log(this.x, this.y);
};

//The game reset method - moves player back to initial location when the player reaches the water//
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 404;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,60),new Enemy(101,150),new Enemy(202,235)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
