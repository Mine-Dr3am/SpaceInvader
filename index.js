var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

//Initialisation des variables
var aliens;
var firingTimer = 0;
var livingEnemies = [];
var Lives;
var player;
var cursors;

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

  // The more bullet enemy they are, the more it's fun !
    enemyBullets = game.add.group(); // Create bulelt Group
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'bulletInvader');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true); // Kill the bullet if it's across the window's game
    enemyBullets.setAll('checkWorldBounds', true); // We check the world's bound
  //Live
    Lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //Display player lives with ship pictures
    for (var i = 0; i < 3; i++)
    {
        var ship = Lives.create(game.world.width - 100 + (30 * i), 60, 'ship'); //Create a ship picture
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90; // rotation
        ship.alpha = 0.4; // opacity
    }
  }
function update(){
  starfield.tilePosition.y +=2; // scrolling background
  cursors = game.input.keyboard.createCursorKeys();

  if (game.time.now > firingTimer) //if we can shoot, we have to wait
  {
      enemyFires();
  }

  if (player.alive){
      //  Reset the player, then check for movement keys
      player.body.velocity.setTo(0, 0);

      if (cursors.left.isDown && player.x > 16){
          player.body.velocity.x = -200;
      }else if (cursors.right.isDown && player.x < 784){
          player.body.velocity.x += 200;
      }
      cursors = game.input.keyboard.createCursorKeys();
      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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

      livingEnemies.length=0; //the array set on 0

      aliens.forEachAlive(function(alien){ // We foreach all the alien which is alive

          // put every living enemy in an array
          livingEnemies.push(alien);
      });


      if (enemyBullet && livingEnemies.length > 0) //if bullet enemy existing and if they are enemy(ies) in my array
      {

          var random=game.rnd.integerInRange(0,livingEnemies.length-1);

          // randomly select one of them
          var shooter=livingEnemies[random];
          // FIIIIIRE !
          enemyBullet.reset(shooter.body.x, shooter.body.y);
          //Bullet move to the player
          game.physics.arcade.moveToObject(enemyBullet,player,120);
          //After we wait before fire.
          firingTimer = game.time.now + 2000;
      }
  }
