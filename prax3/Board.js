var Board = function(element) {
    this.element = element;
    this.squares = [];

    this.init = function(dimension, mineCount) {
        this.dimension = dimension;
        this.mineCount = mineCount;

        this.createBoard();
        this.plantMines();
        this.calculate();
    }
   
   this.loadBoard = function(data) {
	   if(data.startsWith("IOError")) {
		   alert("File with saved game was not found");
		} else {
			console.log("Loading...");
			data = JSON.parse(data);
			//console.log(data);
			mines = data.mines;
			console.log(mines);
			dimension = data.dimension;
			//console.log(dimension);
			player = data.player;
			//console.log(player);
			squaresLoaded = JSON.parse(data.squares);
			//console.log(squaresLoaded);
			//console.log(squaresLoaded.length);
			
			this.element.html("");
			
			this.squares = [];
			for (var y = 0; y < dimension; y++) {
				
				this.squares[y] = [];
				for (var x = 0; x < dimension; x++) {
					//console.log(squaresLoaded[y][x]);
					
					square = document.createElement('span');
					square.className = 'square';
					square.setAttribute('x', x);
					square.setAttribute('y', y);
					this.element.append(square);
					squareObject = new Square(square, x, y);
					squareObject.setMineCount(squaresLoaded[y][x]["mineCountAround"]);
					squareObject.isEmpty = squaresLoaded[y][x]["isEmpty"];
					squareObject.isMine = squaresLoaded[y][x]["isMine"];
					if (squaresLoaded[y][x]["isRevealed"]) {
						squareObject.reveal();
					}
					
					this.squares[y][x] = squareObject;
				}
				
				this.appendClearfixElement();
			}
			
			this.appendClearfixElement();
		}
	}
   
	this.createBoard = function() {
		this.element.html("");
		var square;
		this.squares = [];
		
		for (var y = 0; y < this.dimension; y++) {
			this.squares[y] = [];
		
			for (var x = 0; x < this.dimension; x++) {
				square = document.createElement('span');
				square.className = 'square';
				square.setAttribute('x', x);
				square.setAttribute('y', y);
				this.element.append(square);
				this.squares[y][x] = new Square(square, x, y);
			}
		
			this.appendClearfixElement();
		}
		
		this.appendClearfixElement();
	}

	this.appendClearfixElement = function() {
		var element = document.createElement('div');
		element.classList.add('clearfix');
		this.element.append(element);
	}
	
	this.getRandomNumber = function(max) {
		return Math.floor(Math.random() * (max));
	}
   
	this.plantMines = function() {
		var plantedMines = 0;
		var x,y,square;

		while (plantedMines < this.mineCount) {
			x = this.getRandomNumber(this.dimension);
			y = this.getRandomNumber(this.dimension);
			square = this.squares[y][x];
			
			if (! square.isMine) {
				square.setMine();
				plantedMines++;
			}
		}
	}

	this.calculate = function() {
		var x, y, square, mineCount;

		for (y = 0; y < this.dimension; y++) {
			for (x = 0; x < this.dimension; x++) {
				square = this.squares[y][x];
				var squares = this.traverse(square);
				mineCount = 0;
				
				if (! square.isMine) {
				Array.prototype.forEach.call(squares, function(squareVal) {
					if (squareVal.isMine) {
						mineCount++
					}
				}.bind(this));
				
				(mineCount == 0) ? square.setEmpty() : square.setMineCount(mineCount);
				}
         }
      }
	}
	
	this.traverse = function(thisSquare) {
		var squares = [];
		var x = thisSquare.x;
		var y = thisSquare.y;
		if (y > 0) { // there's a row above
			if (x > 0) squares.push(this.squares[thisSquare.y - 1][thisSquare.x - 1]);  // upper left
			squares.push(this.squares[thisSquare.y - 1][thisSquare.x]);  // up
			if (x + 1 < this.dimension) squares.push(this.squares[thisSquare.y - 1][thisSquare.x + 1]); // upper right
		}
		if (x > 0) squares.push(this.squares[thisSquare.y][thisSquare.x - 1]);  // left
		if (x + 1 < this.dimension) squares.push(this.squares[thisSquare.y][thisSquare.x + 1]);  // right
		if (y + 1 < this.dimension) { // there's a row below
			if (x > 0) squares.push(this.squares[thisSquare.y + 1][thisSquare.x - 1]);  // lower left
			squares.push(this.squares[thisSquare.y + 1][thisSquare.x]);  // down
			if (x + 1 < this.dimension) squares.push(this.squares[thisSquare.y + 1][thisSquare.x + 1]);  // lower right
		}
		return squares;
	}
	
	this.reveal = function() {
		for (var y = 0; y < this.dimension; y++) {
			Array.prototype.forEach.call(this.squares[y], function(square) {
				square.reveal();
			});
		}
	}
	
	this.fetchBoardKeySquareValueRevealed = function() {
		newSquares = [];
		for (var y = 0; y < this.dimension; y++) {
			Array.prototype.forEach.call(this.squares[y], function(square) {
				newSquares.push(square.getAttribute('x') + "_" + square.getAttribute('y') + "," + square.isRevealed )
			});
		}
		return newSquares;
	}
	
	this.flattenArray = function() {
		return this.squares.reduce(function(a, b) {
			return a.concat(b);
		});
	}
	
	this.getNotRevealedSquares = function() {
		return this.flattenArray().filter(function(square) {
			return !square.isRevealed;
		});
	}
}