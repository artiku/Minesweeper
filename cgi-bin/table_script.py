#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import cgitb; cgitb.enable()
import cgi
import json

print "Content-type: text/html"
print

form = cgi.FieldStorage()

action = form['action'].value
if form.has_key('query'):
	query = form['query'].value
if form.has_key('subname'):
	subname = form['subname'].value


file = open('../prax3/table_data.txt', 'a+')

if action == "read":
	#tableData = []
	count = 0
	for line in reversed(file.readlines()):
		if (count > 100):
			break
		line = line.strip()
		result = line.split('\t')
		if (form.has_key('subname') and subname.lower() in result[2].lower()):
			count += 1
			if (query == "getwinners" and result[0] == "Win"):
				print('<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(result[1], result[2], result[3], result[4]))
			elif (query == "getlosers" and result[0] == "Lose"):
				print('<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(result[1], result[2], result[3], result[4]))
		elif (not form.has_key('subname')):
			count += 1
			if (query == "getwinners" and result[0] == "Win"):
				print('<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(result[1], result[2], result[3], result[4]))
			elif (query == "getlosers" and result[0] == "Lose"):
				print('<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(result[1], result[2], result[3], result[4]))
    #print json.dumps(tableData)
else:
	result = form['result'].value
	name = form['name'].value
	#clicks = form['clicks'].value
	date = form['date'].value
	level = form['level'].value
	mines = form['mines'].value
	file.write("{}\t{}\t{}\t{}\t{}\n".format(result, date, name, level, mines))

file.close()