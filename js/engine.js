var Game = new function() {                                                                  
  var KEY_CODES = { 37:'left', 39:'right', 38:'up', 40:'down', 32:'fire', 87 :'fire_up', 83:'rapid_fire'};
  this.keys = {};

  this.initialize = function(canvas_dom,level_data,sprite_data,callbacks) {
	  
    this.canvas_elem = $(canvas_dom)[0];
    this.canvas = this.canvas_elem.getContext('2d');
    this.width = $(this.canvas_elem).attr('width');
    this.height= $(this.canvas_elem).attr('height');

    $(window).keydown(function(event) {
      if(KEY_CODES[event.keyCode]) Game.keys[KEY_CODES[event.keyCode]] = true;
    });

    $(window).keyup(function(event) {
      if(KEY_CODES[event.keyCode]) Game.keys[KEY_CODES[event.keyCode]] = false;
    });
	
	

    this.level_data = level_data;
    this.callbacks = callbacks;
    Sprites.load(sprite_data,this.callbacks['start']);
	
	
	
  };

  this.loadBoard = function(board) { Game.board = board; };

  this.loop = function() {

    Game.board.step(30/1000); 
    Game.board.render(Game.canvas);
	
	
	
	// This is how fast the game runs
	
    setTimeout(Game.loop,20);
	
	
  };
};

var Sprites = new function() {
  this.map = { }; 

  this.load = function(sprite_data,callback) { 
    this.map = sprite_data;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'images/sprites2.png';
  };

  this.draw = function(canvas,sprite,x,y,frame) {
    var s = this.map[sprite];
    if(!frame) frame = 0;
    canvas.drawImage(this.image, s.sx + frame * s.w, s.sy, s.w, s.h, x,y, s.w, s.h);
  };
}

var GameScreen = function GameScreen(text,text2,callback, score) {
  this.step = function(dt) {
    if(Game.keys['fire'] && callback) callback();
	  };
	  
	  
	  // This stops the page scrolling down when the spacebar is pressed
	  
	  window.onkeydown = function(e) {
		return !(e.keyCode == 32);  
	  };
	  

  this.render = function(canvas) {
    canvas.clearRect(0,0,Game.width,Game.height);
	
	
	
	
	
	
	// Font for the top title
	
    canvas.font = '68px Rapier';
    var measure = canvas.measureText(text);  
    canvas.fillStyle = "#FFF";
    canvas.fillText(text,Game.width/2 - measure.width/2,Game.height/2);
    
	// Font for the bottom title
	
	canvas.font = "Italic 20px Roboto";
    var measure2 = canvas.measureText(text2);
    canvas.fillText(text2,Game.width/2 - measure2.width/2,Game.height/2 + 40);
	
	
	// Font for the score 
	
	canvas.font = '30px Roboto';
    canvas.fillStyle = "#FFF";
	canvas.fillText("Score: " + itemCounter, Game.width/2-45,Game.height -75);
	
	
	
  };
  
};

var GameBoard = function GameBoard(level_number) {
  this.removed_objs = [];
  
  // This resets the counter to 0 whenever the game is played again

  
  this.missiles = 0;
  this.level = level_number;
  var board = this;
 
  this.add =    function(obj) { obj.board=this; this.objects.push(obj); return obj; };
  this.remove = function(obj) { this.removed_objs.push(obj); };

  this.addSprite = function(name,x,y,opts) {
    var sprite = this.add(new Sprites.map[name].cls(opts));
    sprite.name = name;
    sprite.x = x; sprite.y = y;
    sprite.w = Sprites.map[name].w; 
    sprite.h = Sprites.map[name].h;
    return sprite;
	
  };
  
  
  
  

  this.iterate = function(func) {
     for(var i=0,len=this.objects.length;i<len;i++) {
       func.call(this.objects[i]);
     }
	 
	 
	 
  };

  this.detect = function(func) {
    for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
      if(func.call(this.objects[i])) return this.objects[i];
    }
    return false;
  };

  this.step = function(dt) { 
    this.removed_objs = [];
    this.iterate(function() { 
        if(!this.step(dt)) this.die();
    }); 

    for(var i=0,len=this.removed_objs.length;i<len;i++) {
      var idx = this.objects.indexOf(this.removed_objs[i]);
      if(idx != -1) this.objects.splice(idx,1);
    }
  };

  this.render = function(canvas) {
	
    canvas.clearRect(0,0,Game.width,Game.height);
    this.iterate(function() { this.draw(canvas);  }); 
  };


// Collision Detection

  this.collision = function(o1,o2) {
    return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
             (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
  };

  this.collide = function(obj) {
    return this.detect(function() {
      if(obj != this && !this.invulnrable)
       return board.collision(obj,this) ? this : false;
    });
  };
  
  
// End collision Detection

  this.loadLevel = function(level) {
	
	  
    this.objects = [];
    this.player = this.addSprite('player', // Sprite
	
	// This is where the player sprite starts initially
						
                                 Game.width/2, // X
                                 Game.height - Sprites.map['player'].h - 20); // Y

    var flock = this.add(new AlienFlock());
    for(var y=0,rows=level.length;y<rows;y++) {
      for(var x=0,cols=level[y].length;x<cols;x++) {
        var alien = Sprites.map['alien' + level[y][x]];
        if(alien) { 
          this.addSprite('alien' + level[y][x], // Which Sprite
                         
						 // Gap between the aliens
						 
						 (alien.w+10)*x,  // X
                         alien.h*y,       // Y
                         { flock: flock }); // Options
        }
      }
    }
	
  };

  this.nextLevel = function() { 
    return Game.level_data[level_number + 1] ? (level_number + 1) : false 
  };
 
  this.loadLevel(Game.level_data[level_number]);
};



 




var GameAudio = new function() {
  this.load_queue = [];
  this.loading_sounds = 0;
  this.sounds = {};

  var channel_max = 10;		
  audio_channels = new Array();
  for (a=0;a<channel_max;a++) {	
    audio_channels[a] = new Array();
    audio_channels[a]['channel'] = new Audio(); 
    audio_channels[a]['finished'] = -1;	
  }

  this.load = function(files,callback) {
    var audioCallback = function() { GameAudio.finished(callback); }

    for(name in files) {
      var filename = files[name];
      this.loading_sounds++;
      var snd = new Audio();
      this.sounds[name] = snd;
      snd.addEventListener('canplaythrough',audioCallback,false);
      snd.src = filename;
      snd.load();
    }
  };

  this.finished = function(callback) {
    this.loading_sounds--;
    if(this.loading_sounds == 0) {
      callback();
    }
  };

  this.play = function(s) {
    for (a=0;a<audio_channels.length;a++) {
      thistime = new Date();
      if (audio_channels[a]['finished'] < thistime.getTime()) {	
        audio_channels[a]['finished'] = thistime.getTime() + this.sounds[s].duration*500;
        audio_channels[a]['channel'].src = this.sounds[s].src;
        audio_channels[a]['channel'].load();
        audio_channels[a]['channel'].play();
        break;
      }
    }
  };
};





