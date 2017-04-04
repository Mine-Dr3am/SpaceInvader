var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create});

function preload() {
  game.load.spritesheet('ship', 'pictures/player.png', 42, 58);
}

function create() {
  game.add.sprite(400, 300, 'ship');
}
