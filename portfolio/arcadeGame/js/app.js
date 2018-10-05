// Enemies our player must avoid
var Enemy = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    //makes a loop

    if (this.x >= 505) {
        this.x = 0;
    }

    //collisions with enemies or walls

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.x += this.speed -  20;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var checkCollision = function(oneEnemy) {
    if (
        player.y + 131 >= oneEnemy.y + 90
        && player.x + 25 <= oneEnemy.x + 88
        && player.y + 73 <= oneEnemy.y + 135
        && player.x + 76 >= oneEnemy.x + 11) {
            console.log('collision!');
            player.x = 202.5;
            player.y = 383;
        }
    
        if (player.y + 63 <= 0) {
            player.x = 202.5;
            player.y = 383;
                
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,505,171);
        }

        if (player.y > 383) {
            player.y = 383;
        }
        if (player.x > 402.5) {
            player.x = 402.5;
        }
        if (player.x < 2.5) {
            player.x = 2.5;
        }
};

var allEnemies = [];
var createEnemies = [60, 140, 220];
var player = new Player(202.5, 383, 50);
var enemy;

createEnemies.forEach(function(posY) {
    enemy = new Enemy (0, posY, 100 + Math.floor(Math.random() * 256));
    allEnemies.push(enemy);
});


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
