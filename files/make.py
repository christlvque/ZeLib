#!/usr/bin/python2.4

import httplib, urllib, sys

# Define the parameters for the POST request and encode them in
# a URL-safe format.

# Répertoire de ../files
#
#  header.js
#  fix.js
#  init.js
#  generic-functions.js
#  array.js
#  url.js
#  maths.js
#  graphs.js
#  dates.js
#  string.js
#  ajax.js
#  page.js
#  google-chart-api.js
#  footer.js

params = urllib.urlencode([
    ('code_url', 'http://na.na/js.js'),
    ('compilation_level', 'WHITESPACE_ONLY'),
    ('output_format', 'text'),
    ('output_info', 'compiled_code'),
  ])

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = response.read()
print data
conn.close()