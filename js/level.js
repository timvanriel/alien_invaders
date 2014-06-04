

// This is how many aliens are created and where/what type. 1 = alien1, 2 = alien2.




  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,2,0,2,0,1,0,1,0,2,0,2,0],
          [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
          [0,0,0,2,0,2,0,1,0,1,0,2,0,2,0],
          [0,0,1,0,1,0,2,0,2,0,2,0,1,0,1],
          [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0], 
		  [0,0,1,0,1,0,2,0,2,0,2,0,1,0,1]],
		   
	
	
	
	2:   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,1,2,1,0,0,0,0,0,0],
          [0,0,0,0,0,1,2,2,2,1,0,0,0,0,0],
          [0,0,0,0,1,2,2,2,2,2,1,0,0,0,0],
          [0,0,0,1,1,1,1,2,1,1,1,1,0,0,0],
          [0,0,1,2,1,1,1,2,1,1,1,2,1,0,0],
          [0,1,2,2,2,2,2,2,2,2,2,2,2,1,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], 
	
	
		  
	3:   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [0,1,2,2,2,1,1,2,1,2,2,2,2,1],
          [0,1,2,1,1,2,1,2,1,2,1,1,1,1],
          [0,1,2,1,1,2,1,2,1,2,1,1,1,1],
          [0,1,2,1,1,2,1,2,1,2,2,2,2,1],
          [0,1,2,1,1,2,1,2,1,2,1,1,1,1],
		  [0,1,2,1,1,2,1,2,1,2,1,1,1,1],
		  [0,1,2,1,2,1,1,2,1,2,1,1,1,1],
		  [0,1,2,2,1,1,1,2,1,2,2,2,2,1],
          [0,1,1,1,1,1,1,1,1,1,1,1,1,1]], 
		
		  
  }
		  
		  

  

// These are the coordinates of the characters on the spritesheet

var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 36, h: 20, cls: Alien, frames: 12},
    'alien2': { sx: 0,  sy: 20, w: 36, h: 20, cls: Alien, frames: 12},
    'player': { sx: 0,  sy: 58, w: 48, h: 55, cls: Player },
    'missile': { sx: 0,  sy: 148, w: 5,  h: 5, cls: Missile },
	'missile2': { sx: 0,  sy: 153, w: 5,  h: 5, cls: Missile },
	
	
	
  }
  
  // These are the game sounds that can be called within the game
  
  
var music = new Audio('media/music.ogg');
var die = new Audio('media/player_death.mp3');
var sad = new Audio('media/sad_song.mp3');
var rapid = new Audio('media/Rapid_mode_voice.ogg');
var siren = new Audio('media/siren.ogg');
var shoot = new Audio('media/shoot.ogg');
var win = new Audio('media/win_sound.mp3');



	// This is the function that runs at the beginning of the game


  function startGame() {
    var screen = new GameScreen("Protect the Earth!","Press space",
	
                                 function() {
									 
									 // This loads gameboard number 1 of 3
									 
                                     Game.loadBoard(new GameBoard(1));
									 
									  // This plays the music for the game
									 
									 music.play();
									 
									 // This sets the volume for the music
									 
									 music.volume = .5;
									 
									
									 
									 
									  
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
									 
									 
									 
									 sad.pause();
  									 sad.currentTime = 0.0;
									 itemCounter = 0;
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","Press space to play again!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
									 
									 // This resets the counter back to zero for the next game
									 
									 itemCounter = 0;
                                 });
    Game.loadBoard(screen);
  }
  
  // This loads the sounds used within the game

  $(function() {
    GameAudio.load({ 'fire' : 'media/fire.ogg', 'die' : 'media/explosion.ogg', 'music' : 'media/music.ogg', 'rapidbullet' : 'media/rapid_bullet.ogg',}, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });

