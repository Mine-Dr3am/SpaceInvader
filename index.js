var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('invader.png');
  game.load.spritesheet('ship' 'pictures/player.png');
}

function create() {
  game.add.sprite(10, 10, 'ship');
}

function update() {
}
