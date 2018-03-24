var Controller = function() {
	
	this.gameNr = 0;
	
	
	this.trigger = function(win, level, mines) {
		this.gameNr++;
		
		if (win) result = 'Win';
		else result = 'Lose';
		
		//this.appendRow(this.gameNr, level, mines, result);
		this.recordResult(level, mines, result);
	}
	
	this.appendRow = function(gameNr, level, mines, result) {
		console.log($('#highscore'));
		$('#highscore tbody').append('<tr><td>' + gameNr + '</td><td>' + level + '</td><td>' + mines + '</td><td>' + result + '</td></tr>');
	}
	
	this.recordResult = function(level, mines, result) {
		var name = $('#name').val();
		var url = "http://dijkstra.cs.ttu.ee/~artbas/cgi-bin/table_script.py"
		var date = new Date().toLocaleString();
		
		$.get(url, {
			action: "write",
			name: name,
			date: date,
			//clicks: clicks,
			result: result,
			mines: mines,
			level: level
		}).done(function() {
			console.log("HelloTest");
		});

	}
}	


