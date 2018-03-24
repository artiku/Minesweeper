#!/usr/bin/python

import cgitb; cgitb.enable()
import json
import os

print 'Content-type: application/json\n'

filename = '/tmp/messages.txt'

# If file does not exsist, create one
if not os.path.exists(filename):
	open(filename, 'w').close()


file = open(filename, 'r')

messages = []
for line in file:
	line = line.strip()
	result = line.split('\t')

	messages.append({'name': result[0], 'text': result[1]})
file.close()

print json.dumps(messages)