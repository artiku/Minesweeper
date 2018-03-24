#!/usr/bin/python
import cgi


form = cgi.FieldStorage()
print 'eshkere'
#print formdata['param'].value
print form['param1'].value

text1 = form.getfirst("param2", "not found")
print text1