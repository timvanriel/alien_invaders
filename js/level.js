

// This is how many aliens are created and where/what type. 1 = white alien, 2 = red alien.




  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,1,1,1,1,1,1,1,2,2],
          [0,0,2,2,1,1,1,1,1,1,1,2,2],
          [0,0,2,2,0,0,0,0,0,0,0,2,2],
          [0,0,2,1,0,0,0,0,0,0,0,1,2],
          [0,0,2,1,0,0,0,0,0,0,0,1,2],
          [0,0,2,1,0,0,0,0,0,0,0,1,2],
          [0,0,2,1,0,0,0,0,0,0,0,1,2],
          [0,0,2,1,0,0,0,0,0,0,0,1,2],
          [0,0,2,1,1,1,1,1,1,1,1,1,2],
          [0,0,2,1,1,1,1,1,1,1,1,1,2]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]] };

  

// These are the coordinates of the characters on the spritesheet

var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 60, h: 60, cls: Alien, frames: 4 },
    'alien2': { sx: 0,  sy: 181, w: 60, h: 60, cls: Alien, frames: 4 },
    'player': { sx: 0,  sy: 60, w: 48, h: 86, cls: Player },
    'missile': { sx: 0,  sy: 147, w: 12,  h: 34, cls: Missile },
	
	
  }

  function startGame() {
    var screen = new GameScreen("Bird Invaders","Press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("Game Over","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
  

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });


