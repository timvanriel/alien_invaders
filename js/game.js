

// Score code

var itemCounter = 0;







var AlienFlock = function AlienFlock() {
	
  this.invulnrable = true;
  this.dx = 10; this.dy = 10;
  this.hit = 1; this.las100tHit = 0;
    // This is how quickly the aliens can move
  this.speed = 33;

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });
	

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  
  //Speed of enemies moving across and down after first is hit - Default is 1
  
  //this.flock.speed += 1;
  this.board.remove(this);
  itemCounter ++;
  
 
}



Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  
  // This is time delay between each step the alien takes
  
  if(Math.abs(this.mx) > 1) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
	
	// This (% 4) is a modulus for the frames.
	
    this.frame = (this.frame+1) % 13;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
	
	// This kills the player when the aliens reach the bottom
	
     if(this.y > 550) {
     GameAudio.play('player-die');
	 Game.callbacks['die']();
    
   }
   

	// This kills the player when they touch an alien
	
	
	var player = this.board.collide(this);
    if(player)  { 
    player .die()
    return true;
	
   }
   
	
	//------------------------------------------
	
  }
  return true;
}


// This (*100 < 0) is how often the enemy can shoot

Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 1) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
									  
						//This is how fast the alien missiles shoot - Standard = 100.
									  
                                     { dy: 175 });
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}


Player.prototype.die = function() {
  
  // This plays the player_die sound when the player is killed
  
  die.play();
  
  // This ends the game music when the player dies
  
  music.pause();
  music.currentTime = 0.0;
  
  // This plays the sad song when the player dies and the gameover screen loads
  
  sad.play();
  
  Game.callbacks['die']();

}


// The 200 below is how fast you can move the player

Player.prototype.step = function(dt) {
  if(Game.keys['left']) { 
  
  
  this.x -= 200 * dt;
  }
  
  if(Game.keys['right']) { 
  
  
  this.x += 200 * dt;
 
  
  }
    
// This is defining how you can now move up and down.    
    
    if(Game.keys['up']) { 
	
	// The (-=) defines how you move upwards
	
	
	this.y -= 200 * dt;
	
	
	 }
	 
	 
	 
    if(Game.keys['down']) { 
	
	
	this.y += 200 * dt; 
	
	
	}
	
	

 
	// This bounds the player within the game
    
  
  if(this.x > 875) this.x = 50;
  if(this.x < 50) this.x = 875;
  if(this.y < 0) this.y = 0;
  if(this.y > 550) this.y = 550;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;
  
   
   
   
   
   
   
   
   
    
    // This is how many missiles can be fired before reloading

  if(Game.keys['fire_up'] && this.reloading <= 0 && this.board.missiles < 10 && music.currentTime <=8.9) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + 20,
                          this.y - 20,
						  
	// The dy: -100 (standard) below states how the missiles go up instead of down and with what force.
						  
                          { dy: -400, player: true });
						  
						  
    this.board.missiles++;
    this.reloading = 20 ;
	
	

	
  } else if  (Game.keys['fire_up'] && this.reloading <= 0 && this.board.missiles < 10 && music.currentTime >=12.1) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + 20,
                          this.y - 20,
						  
	// The dy: -100 (standard) below states how the missiles go up instead of down and with what force.
						  
                          { dy: -400, player: true });
						  
						  
    this.board.missiles++;
    this.reloading = 20 ;
	
  }
  
  
  
  if(music.currentTime >= 7.0 && music.currentTime<= 8.0) {
		
		rapid.play();
		rapid.volume = 1;  
	  
  }
  
  // This states how rapid fire enables between a certain time in the game
  
  
  
    if(Game.keys['fire_up']  && this.board.missiles < 100 && music.currentTime >= 9.0 && music.currentTime <= 12.0) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          
						  
						  
						  
						// This line below states where the sprite loads with respect to the player  
						  this.x + 20,
                          this.y - 20,
						  
						  // The dy:400 below states the force is 400 going downwards of the missile
						  
                          { dy: -400, player: true });
						  
						  
    this.board.missiles++;
    this.reloading = 1;
	
	
  }
  
  

  
  return true;
}






var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
} 





Missile.prototype.step = function(dt) {
   
   // This line below states that the missiles travel upwards. Removing it places the missiles without travel.
   
   this.y += this.dy * dt;
   
  //  ------------------------

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true; 
}



Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}





