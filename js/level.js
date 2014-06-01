

// This is how many aliens are created and where/what type. 1 = alien1, 2 = alien2.




  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [0,0,1,2,2,2,1,1,2,1,2,2,2,2,1],
          [0,0,1,2,1,1,2,1,2,1,2,1,1,1,1],
          [0,0,1,2,1,1,2,1,2,1,2,1,1,1,1],
          [0,0,1,2,1,1,2,1,2,1,2,2,2,2,1],
          [0,0,1,2,1,1,2,1,2,1,2,1,1,1,1],
		  [0,0,1,2,1,1,2,1,2,1,2,1,1,1,1],
		  [0,0,1,2,1,2,1,1,2,1,2,1,1,1,1],
		  [0,0,1,2,2,1,1,1,2,1,2,2,2,2,1],
          [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1]], 
		
		  
		  
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
          [0,0,1,1,1,1,1,1,1,1,0]], 
		  
	 3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]]};
		  
		  

  

// These are the coordinates of the characters on the spritesheet

var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 36, h: 20, cls: Alien, frames: 13},
    'alien2': { sx: 0,  sy: 20, w: 36, h: 20, cls: Alien, frames: 13},
    'player': { sx: 0,  sy: 58, w: 48, h: 55, cls: Player },
    'missile': { sx: 0,  sy: 147.5, w: 5,  h: 8.5, cls: Missile },
	
	
  }
  
  
  
  
var music = new Audio('media/music.ogg');




  function startGame() {
    var screen = new GameScreen("Protect the Earth!","Press space",
	
                                 function() {
									 
									 // This loads gameboard number 1 of 2
									 
                                     Game.loadBoard(new GameBoard(1));
									 music.play();
									 
									 // This plays the music for the game
									 
									 //GameAudio.play('music');
                                 });
		 
    Game.loadBoard(screen);
    Game.loop();
	
  }

  function endGame() {
    var screen = new GameScreen("Game Over","Press space to restart",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
									 
									 // This resets the score counter to 0 when the game loads
									 music.play();
									 itemCounter = 0;
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","Press space to play again!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
  
  // This loads the sounds used within the game

  $(function() {
    GameAudio.load({ 'fire' : 'media/fire.ogg', 'die' : 'media/explosion.ogg', 'move' : 'media/move.ogg', 'music' : 'media/music.ogg', 'player-die' : 'media/player_death.mp3'}, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });


