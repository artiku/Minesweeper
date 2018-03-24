function fillTable(tableId, data) {
	$('#' + tableId + ' tr:not(:first)').remove();
	$('#' + tableId +' tr:last').after(data);
}

var url = "http://dijkstra.cs.ttu.ee/~artbas/cgi-bin/table_script.py"
$.get(url, {
	action: "read",
	query: "getwinners"
	}).done(function(data) {
		fillTable("wins", data);
	});
	
$.get(url, {
	action: "read",
	query: "getlosers"
	}).done(function(data) {
		fillTable("loses", data);
	});
	
function search() {
	var subname = $('#playername').val();
	if (subname.replace(" ", "").length == 0) {
		return;
	}
	$.get(url, {
		action: "read",
		query: "getwinners",
		subname: subname
		}).done(function(data) {
		fillTable("wins", data);
	});
	
	$.get(url, {
		action: "read",
		query: "getlosers",
		subname: subname
		} ).done(function(data) {
		fillTable("loses", data);
	});
}