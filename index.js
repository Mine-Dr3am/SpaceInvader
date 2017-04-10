var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

//Initialisation des variables
var aliens;
var firingTimer = 0;
var livingEnemies = [];

function preload() {
  //Import somes pictures
  game.load.spritesheet('ship', 'pictures/player.png', 32, 48);
  game.load.spritesheet('invader', 'pictures/invader32x32x4.png', 32, 32);
  game.load.image('bulletInvader', 'pictures/enemy-bullet.png');
  game.load.image('starfield', 'pictures/starfield.png');
  game.load.image('kaboom', 'pictures/explode.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

  //  We create the aliens
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    createInvader();

    //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

  // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'bulletInvader');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

  }
function update(){
  starfield.tilePosition.y +=2;
  if (game.time.now > firingTimer)
  {
      enemyFires();
  }


}

  function createInvader()
  //Function which create a list of invader 10 by 4 lines (v look for loop v)
  {
    for(var x = 0; x < 10; x++)
    {
      for(var y = 0; y < 4; y++)
      {
        var alien = aliens.create(x * 48, y * 50, 'invader'); // I create 1 invader with coord x, y and picture
        alien.anchor.setTo(0.5, 0.5); //I don't knows :D
        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true); // Add animation between 4 different pictures by 20 framerate
        alien.play('fly');//Display the animation wich set just before
        alien.body.moves = true; //We have to check this commands
      }
    }
    aliens.x = 100; // Set at x position the alien block when it's created
    aliens.y = 50;  // Set at y position the alien block when it's created

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
  }

  function descend() { //Aliens descend
    aliens.y += 10;
  }
  function setupInvader(invader)
  {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animation.add('kaboom');

  }
  function enemyFires () {

      //  Grab the first bullet we can from the pool
      enemyBullet = enemyBullets.getFirstExists(false);

      livingEnemies.length=0;

      aliens.forEachAlive(function(alien){

          // put every living enemy in an array
          livingEnemies.push(alien);
      });


      if (enemyBullet && livingEnemies.length > 0)
      {

          var random=game.rnd.integerInRange(0,livingEnemies.length-1);

          // randomly select one of them
          var shooter=livingEnemies[random];
          // And fire the bullet from this enemy
          enemyBullet.reset(shooter.body.x, shooter.body.y);

          game.physics.arcade.moveToObject(enemyBullet,player,120);
          firingTimer = game.time.now + 2000;
      }

  }
