var SaveController = function(game) {
	this.game = game;
	
	
	this.setBoardForSaveController = function(board) {
		this.fetchedBoard = board;
		console.log("Board fetched");
	}
	
	this.saveGame = function() {
		if (!this.game.gameIsActive) {
			alert("Game can not be saved now");
			console.log(this.gameIsActive);
			return;
		}
	 
		gameData = game.getGameData("saveGame");
		console.log("SAVING...");
		fetch("../cgi-bin/board_script.py", {
            method: "POST",
            body: gameData
		})
		.then(response => response.text())
		//.then(data => console.log('data is', data));
	}
	
	this.loadGame = function() {
		var playerName = $('#name').val();
		if(playerName.length > 0) { 
			fetch("../cgi-bin/board_script.py?action=loadGame&player=" + playerName) 
			.then(response => response.text()) 
			.then(data => { 
			this.game.loadGame(data); 
			}); 
		}
	}
}

// WHICH ONE IS BETTER?
function loadGameFoo() {
	
	var name = $('#playername').val();
	
	$.get('../cgi-bin/board_script.py', {
		action: "load",
		name: name
	}).done(function (response) {
		response.forEach(function (item) {
			board = JSON.parse(item.field);
        });
	});
	
	console.log(board);
}

