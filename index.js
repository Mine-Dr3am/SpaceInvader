var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create});

function preload() {
  game.load.spritesheet('ship', 'pictures/player.png', 42, 58);
  game.loas.spritesheet('invader', 'pictures/invader.png')

  //Initialisation des variables
  var tabInvader;
  var NBR_LIGNES = 3;
  var NBR_INVADERS_PAR_LIGNE = 7;

}

function create() {
  game.add.sprite(400, 300, 'ship');


  function createInvader(nbrLignes, nbrIPLigne)
  {
    tabInvader = [];

    for(var i; i > nbrLignes; i++)
    {
        tabInvader[i] 
    }
  }


}
