var Game = function(level, controller) {
   var els = els || {};
   var mineAmount = 0;
   console.log(level);
   
   this.levels = {
      beginner: {
         dimension: 6
      },
      intermediate: {
         dimension: 9
      },
      advanced: {
         dimension: 16
      }
   }
   
   this.setLevel(level);
   var elemBoard =  $('.game-board');
   
   this.listenersSet = false;
   this.board = new Board(elemBoard);
   
   this.controller = controller;
   
   this.gameIsActive = false;
}

Game.prototype.getGameData = function(action) { 
    var data = new FormData();

	var playerName = $('#name').val();
	
    var game_info = { 
	squares: JSON.stringify(this.board.squares),
	dimension: this.board.dimension,
    player: playerName,
    mines: this.mineAmount
    }; 

    data.append("action", action); 
    data.append("player", playerName); 
    data.append("data", JSON.stringify(game_info)); 

    return data; 
} 



Game.prototype.init = function() {
	this.isGameOver = false;
	this.gameIsActive = true;
	this.board.init(this.dimension, this.mineAmount);
	
	if (! this.listenersSet) {
		this.setListeners();
	}
	
	this.listenersSet = true;
}


Game.prototype.loadGame = function(data) {
	this.isGameOver = false;
	this.gameIsActive = true;
	this.board.loadBoard(data);
	
	if (! this.listenersSet) {
		this.setListeners();
	}
	
	this.listenersSet = true;
	
}


Game.prototype.setListeners = function() {
	//this.board.element.addEventListener('click', this.rightClickHandler.bind(this));
	this.board.element.click(this.rightClickHandler.bind(this));
}

Game.prototype.rightClickHandler = function(event) {
	if ( !this.isGameOver && event.target.classList.contains('square')) {
		var square = this.findSquareByEvent(event);
		if (square.isMine) {
			square.element.classList.add('is-clicked');
			return this.gameover(false);
		}
		console.log("Click Handler is working");
		square.reveal();
		
		if (this.isWin()) {
			return this.gameover(true);
		}
	}
}

Game.prototype.findSquareByEvent = function(event) {
	var x = event.target.getAttribute('x');
	var y = event.target.getAttribute('y');
	return this.board.squares[y][x];
}

Game.prototype.gameover = function(win) {
	
	this.isGameOver = true;
	this.board.reveal();
	
	this.controller.trigger(win, this.levelName, this.mineAmount);
	this.gameIsActive = false;
	
	if (win) {
		alert("You win!")
	}
}

Game.prototype.isWin = function() {
	console.log("NotRevealed:" + this.board.getNotRevealedSquares().length);
	console.log("Mine Amount:" + this.mineAmount);
	return this.board.getNotRevealedSquares().length <= this.mineAmount;
}

Game.prototype.setLevel = function(level) {
	console.log(this.levels[level]);
	this.levelName = level;
   this.dimension = this.levels[level].dimension;
}

Game.prototype.setMineAmount = function(mineAmount) {
	console.log("Mines: " + mineAmount);
	this.mineAmount = mineAmount;
}