var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create});

//Initialisation des variables
var aliens;

function preload() {

  game.load.spritesheet('ship', 'pictures/player.png', 32, 48);
  game.load.spritesheet('invader', 'pictures/invader32x32x4.png', 32, 32);

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    createInvader();

  game.add.sprite(400, 300, 'ship');
  }

  function createInvader()
  {
    for(var x = 0; x < 10; x++)
    {
      for(var y = 0; y < 4; y++)
      {
        var alien = aliens.create(x * 48, y * 50, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        alien.play('fly');
        alien.body.moves = false;
      }
    }
    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
  }
  function descend() {

    aliens.y += 10;

}

  function checkDeplacement(e) {
    if (e.keyCode == 39) {
      shipX += 5;
    }
    if (e.keyCode == 37) {
      shipX -= 4;

    }
}
