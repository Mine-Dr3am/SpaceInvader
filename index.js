var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create});
var xpos = 400;
function preload() {
  game.load.spritesheet('ship', 'pictures/player.png', 42, 58);
  game.load.spritesheet('invader', 'pictures/invader.png');

  //Initialisation des variables
  var tabInvader;
  var NBR_LIGNES = 3;
  var NBR_INVADERS_PAR_LIGNE = 7;
  var ship = 'pictures/player.png';
  var player;
  var cursors;

}

function create() {
  player = game.add.sprite(400, 300, 'ship');
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  function createInvader(nbrLignes, nbrIPLigne){
    tabInvader = [];

    for(var i; i > nbrLignes; i++){
        tabInvader[i]
    }
  }

}
function update() {
    cursors = game.input.keyboard.createCursorKeys();
    //  Scroll the background
    starfield.tilePosition.y += 2;

    if (player.alive){
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown){
            player.body.velocity.xpos = -200;
        }else if (cursors.right.isDown){
            player.body.velocity.xpos = 200;
        }
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
}
