
var allEnemies = []; // stores all the enemies
var player;
var reachedWater = false;
var Helper = function(){}
/*
 * Function returns a random value. It takes an array of possible values as a parameter.
 */
Helper.returnRandomValue = function(possibleValues){
    var randomStartingPosition = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomStartingPosition];
}

/*
 * This function checks whether two elements overlap/touch.
 * The function needs two figures as parameters and returns a boolean.
 */
Helper.overlap = function(enemyFig, player) {

    return !(player.x + enemyFig.dx >
            (enemyFig.x + enemyFig.width) || // player is to the right of enemyFig
            (player.x + player.width - enemyFig.dx) < enemyFig.x || // player is to the left of enemyFig
            player.y + (player.height - enemyFig.dy) < (enemyFig.y) || //player is above enemyFig
            player.y > (enemyFig.y + (enemyFig.height - enemyFig.dy))) //player is below enemyFig
}

// Enemies our player must avoid
var Enemy = function() {
    /* Variables applied to each of our instances go here,
    * we've provided one for you to get started
    * The image/sprite for our enemies, this uses
    * a helper we've provided to easily load images
    */
    this.sprite = 'images/enemy-bug.png';
    /*This sets the initial location of the enemy and the random y-values
    * needed to cause multiple enemies to be constantly moving across the screen.
    */
    this.x = 0;
    this.y = Helper.returnRandomValue([72, 155, 238]);// the y-axis coordinates of the paved tracks enemies can run on
    this.width = 171; //width of sprite in pixels
    this.height = 101; //height of sprite in pixels
    this.speed = Helper.returnRandomValue([200, 250, 280, 300, 320, 350, 400]);
    this.dy = 50; //y offset
    this.dx = 100; // x offset
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
    * which will ensure the game runs at the same speed for
    *all computers.
    */
     this.x += (this.speed) * dt;
    /*
    * This checks for collision between enemy and player.
    * If any enemy touches with the player, the reset function
    * is called on the player and it is
    * returned to the bottom of the screen.
    */
    allEnemies.forEach(function(enemy, index) {
        if(Helper.overlap(enemy, player)){
            alert ("You died!")
            player.reset();
        }
    });
};

// This function draws the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x, this.y); //remove this later
};

//This function generates enemies
Enemy.generateEnemies = function() {
    allEnemies.push(new Enemy());
    Enemy.removeOffScreenEnemies();
    var delay;
    delay = Helper.returnRandomValue([0, 500, 750, 1000]);
    setTimeout(Enemy.generateEnemies, delay);
};

//This function removes enemies that go off canvas. Canvas width = 505
Enemy.removeOffScreenEnemies = function() {
    allEnemies.forEach(function(enemy, index) {
        if(enemy.x > 505){
            allEnemies.splice(index, 1);
        }
    });
}

/* This Player class deals with everything to do with the player
* and includes an update(), render() and
* a handleInput() method.
*/
var Player = function(){
//This loads the player image
    this.playerIcon = 'images/char-boy.png';
//This sets the initial location of the player
    this.x = 202;
    this.y = 404;
    this.width = 171; //width of sprite in pixels
    this.height = 101; //height of sprite in pixels
}

/* This function updates the player, if we wanted
*to add extra functionality to the player
*/
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// This function draws the player onscreen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerIcon), this.x, this.y);
  console.log(this.x,this.y); //remove this
}

/*The handleInput method which receives user input, from allowedKeys which
* are defined below.The switch function within this function defines the x
* and y values that the player can have, which prevents the player from going
* off the canvas.tileWidth = 101, tileHeight = 83, canvasWidth = 505, canvasHeight=606
*/
Player.prototype.handleInput = function(keyCode) {
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
    if(this.x + 101 >= 404){ //furthest right player can go
        this.x = 404;
    }
    else{
        this.x += 101;
    }
    break;
    case 'up':
    if(this.y - 72 < 0){
        this.y = 0;
        reachedWater = true; //var reachedWater, which must be added to reset function
        alert("You have won!");
        player.reset();

    }
    else{
        this.y -= 83;
    }
    break;
    case 'down':
    if(this.y + 83 >= 404){ //Player's max dist from top of canvas.
        this.y = 404;
    }
    else{
        this.y += 83;
    }
    break;
}

console.log(this.x, this.y); //remove this
};

/*The game reset method - moves player back to initial location
* when the reset function is called on the player.
*/
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 404;
};

/* Instantiation of objects. Enemy objects in an array called allEnemies.
 * player object is in a variable called player.
 */
Enemy.generateEnemies();
player = new Player();

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
