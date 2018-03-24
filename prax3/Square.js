var Square = function(element, x, y) {
	this.element = element;
	this.x = x;
	this.y = y;
	this.isMine = false;
	this.isRevealed = false;
	this.isEmpty = false;
	this.mineCountAround = 0;
	
	this.setMine = function() {
		this.isMine = true;
	}
	
	this.setEmpty = function() {
		this.isEmpty = true;
	}
	
	this.setMineCount = function(mineCountAround) {
		this.mineCountAround = mineCountAround;
	}
	
	this.reveal = function() {
		
		this.isRevealed = true;
		this.element.classList.add('is-revealed');
		
		if (this.isMine) {
			return this.element.classList.add('is-mine');
		}
		
		if (this.isEmpty) {
			return this.element.classList.add('is-empty');
		}
		
		var className;
		
		this.element.textContent = this.mineCountAround;
		
		console.log(this.element.textContent);
		if (this.mineCountAround == 1) {
			className = 'one';
			console.log(className);
		} else if (this.mineCountAround == 2) {
			className = 'two';
			console.log(className);
		} else if (this.mineCountAround == 3) {
			className = 'three';
			console.log(className);
		} else if (this.mineCountAround == 4) {
			className = 'four';
		} else if (this.mineCountAround == 5) {
			className = 'five';
		} else if (this.mineCountAround > 6) {
			className = 'six';
		}
		
		this.element.classList.add(className);
		console.log(this.element.className);
   }

}