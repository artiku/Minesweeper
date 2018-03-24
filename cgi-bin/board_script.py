#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import cgitb; cgitb.enable()
import cgi
import json

#print "Content-type: text/html"
#print
#print('Content-type: application/json\n')

form = cgi.FieldStorage()
action = form.getvalue('action')

def saveGame(player, data): 
	print "Content-type: text/html"
	print
	file = open('../prax3/saves/' + player + '.txt', 'w')
	file.write(data) 
	file.close()

def loadGame(player):
	print('Content-type: application/json\n')
	file = open('../prax3/saves/' + player + '.txt', 'r')
	print file.readline()
	file.close()

if action == "saveGame":
	saveGame(form.getvalue("player"), form.getvalue("data"))
elif action == "loadGame":
	loadGame(form.getvalue("player"))
