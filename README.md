ZeLib
=====

Simple Javascript library for common functions

Summary
---------
* [Functions](#functions)
* [ChangeLog](#changelog)
* [License](#license)

Functions
----------
[[top]](#zelib)

* HTML Table
  * Convert a JS Array into a html table (Array)
  
		```javascript   
		z.tableau.write(   
			/* wanted id */,   
			/* container id */,   
			/* JS Array */,   
			/* Array of headers titles, optional*/,   
			/* CSS classes to use, optional */);   
		```
  * Load a html table inside a JS Array
  
		```javascript
		z.tableau.read(id of the table);
		```
* JS Array
	* Sort a multidimensional Array by one dimension
	
		```javascript   
		z.array.sort.dim(dimension to sort);
		```
  * Return one column of a 2-dimensional array
  
		```javascript  
		z.array.getColumn(JS Array, dimension to output);
		```	
* URLs
  * get url parameters by id
  
	  ```javascript
		z.url.get.param.byName(param name);
		```
  * JS redirection
  
	  ```javascript
		z.url.redirect(url);
		```

* Charts & Graphs
  * Pareto
  
	  ```javascript
		z.graphs.pareto.draw(container id, data Array, mouseover format function, Flotr options);
		```

  * time repartition 
  
	  ```javascript
		z.graphs.histo.draw({   
			data: theArray, //data array    
			cols: {
				x: 0,   
				y 1
			},    
			cont: container_id,    
			title: 'Serie 1',		//Title of the graph 
			timeProportional: true	//set to false to avoid blanks
		});
		```
	
  * values repartition
  
		```javascript
		var opt = {   
			data: theArray, 		//data array
			cols: { x: 0 },			//Columns of the array to use
			div: 10,				//Number of groups of data
			cont: container_id,		//html id of the graph container
			title: 'Serie 1',		//Title of the graph 
			vertical: false			//disable vertical lines (see below)
		};
		
		//if you want to draw some vertical bars
		//set vertical object like this :
		opt.vertical = [{	//An array of objects
				data: value1,	//a Float value
				name: 'Value 1'	//Line name (displayed in legend box)
		}];

		//Finally, draw the graph
		z.graphs.repart.draw(opt);
		```
* Dates **!! WARNING** date functions will be merged soon
  * Convert date from _JJMMAAAA_ to JS date format
  
		```javascript
		z.dates.dateCode2js('01012013');
		```
  * Convert date from _JJ/MM/AAAA_ to JS date format
  
		```javascript
		z.dates.fr2js('01/01/2013');
		```
  * convert date from _JJ/MM/AAAA HH:MM:SS_ to JS date format

		```javascript
		z.dates.fr2jstime('01/01/2013 13:37:30');
		```
  * Calculate date difference in days, weeks, months or years
  
		```javascript
		var intDiff;
		
		//Diff in days
		intDiff = z.dates.diff.inDays(date1, date2);
		//Diff in weeks
		intDiff = z.dates.diff.inWeeks(date1, date2);
		//Diff in months
		intDiff = z.dates.diff.inMonths(date1, date2);
		//Diff in years
		intDiff = z.dates.diff.inYears(date1, date2);
		```
  * Add a time interval to a JS date

		```javascript
		//Use a JS date
		var aDate = new Date();
		
		// - The first parameter can be
		//		'yyyy', 'q', 'm', 'y', 'd', 'w', 'ww', 'h', 'n', 's', or 'ms'
		// - The second parameter must be a number
		aDate.dateAdd('h',3);
		```
	* Return the ISO week number

		```javascript
		var weekNumber = z.date.numSem(2012,12,25);
		//weekNumber = 52
		```
* Strings
  * Add equivalent to 'Trim' VB-function
  
		```javascript
		var aString = '   Kenavo !  ';
		aString = aString.trim();
		```
  * Return a JS array from a string
 
		```javascript
		var aString = 'a;b;c;;d;e;f';
		var arry = new Array;
		
		arry = aString.toArray(';;',';'));
		//arry = [["a","b", "c"],["d","e","f"]]
		```
* Ajax
  * Queue ajax request
* Function
  * type
  * isArray
  * isNumeric
  * isSerie
  * getDimOfArray
  * roundNumber
  * isPair
  * noDoublons
  * inArray
  * alert
  * error
* Maths
  * loiNormale
  * min
  * max
  * moyenne
  * medianne
  * variance
  * ecartType
  * variance_percent
  * cpk
  * LCI
  * LCS
  * isNormal

ChangeLog
---------
[[top]](#zelib)


### v. 1.0-b.3


  * New date/time convertion function
  * Deprecated old date/time convertion functions
  * Updated RegExp for isNumeric function
  * Added object whith global variables


### v. 1.0-b.2

  * Description translated in english
  * New functions organisation
  * Add `toArray()` String prototype
  * Fix bug on `trim()` function

### v. 1.0-b.1


  * Added jQuery, Flotr and tablesorter detection - _just throw an error, nothing else !_

### v. 1.0-b.0

  * Add `fn` object
  * Add `math` object
	
### v. 1.0-a

   * First public release
	
	
License
-------
[[top]](#zelib)

Copyright (C) 2013 Liorzou Etienne
	
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
