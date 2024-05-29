var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.spritesheet('player', 'assets/images/Mask Dude/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('idle', 'assets/images/Mask Dude/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('jump', 'assets/images/Mask Dude/Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('coin', 'assets/images/coin.png');
    this.load.spritesheet('enemy', 'assets/images/enemy (32x32).png', { frameWidth: 32, frameHeight: 32 }); // Load enemy sprite
}

var player;
var cursors;
var platforms;
var coins;
var enemies;
var score = 0;
var scoreText;
var gameOver = false;

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // Additional platforms
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'idle');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 10 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: [{ key: 'jump', frame: 0 }],
        frameRate: 10
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, collectCoin, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Create enemies group
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 100, y: 0, stepX: 150 }
    });

    enemies.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setVelocityX(Phaser.Math.Between(-100, 100)); // Set random horizontal velocity
        child.setCollideWorldBounds(true); // Ensure enemies stay within the world bounds
        child.setBounce(1); // Make enemies bounce off the world bounds
    });

    this.physics.add.collider(enemies, platforms);
    this.physics.add.overlap(player, enemies, hitEnemy, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn', true);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        player.anims.play('jump', true);
    }

    // Update enemy movement
    enemies.children.iterate(function (child) {
        if (child.body.blocked.left) {
            child.setVelocityX(Phaser.Math.Between(50, 100)); // Change direction to right
        } else if (child.body.blocked.right) {
            child.setVelocityX(Phaser.Math.Between(-100, -50)); // Change direction to left
        }
    });
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitEnemy(player, enemy) {
    this.physics.pause(); // Stop all physics interactions
    player.setTint(0xff0000); // Change player color to red
    player.anims.play('turn'); // Play the turn animation
    gameOver = true; // Set game over flag
}
