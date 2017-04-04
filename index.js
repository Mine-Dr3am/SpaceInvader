var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create});

function preload() {
  game.load.spritesheet('ship', 'pictures/player.png', 32, 48);
}

function create() {
  game.add.sprite(10, 10, 'ship');
}
