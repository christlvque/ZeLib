/*
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
*/


/*
	@web :		https://github.com/liorzoue/ZeLib
	
	Required :
	- jQuery 1.8.0+ (http://jquery.com) [ jQuery ;) ]	//TODO : Remove jQuery references
	- Flotr2 (http://www.humblesoftware.com/flotr2/) [ graphs ]
	[ should be optional but recommended : - TableSorter 2.0 (http://tablesorter.com), a jQuery plugin ]
	
	-------------
	
	Change log :
	
	v. 1.0-c.2
		- [Add] date.toString new feature
		
	V. 1.0-c.1
		- [Rewrite] Continue rewriting of library
		- [Add] Begin transition to Google Chart API
		- [Fix] Bad internal function call in fn.isNumeric
		- [Warning] _ZeLib.url is buggy
		
	V. 1.0-c.0
		- [Rewrite] Partial rewrite of library
		- [Add] Extend function 
		- [Add] Date diff in seconds
	
	v. 1.0-b.8
		- [Update] error management in ajax.vb function
	
	v. 1.0-b.7
		- [Add] distinctValues : get disctinct values in a array
		- [Add] init functions for graphs
		- [Add] jQuery method for object clone
		- [Add] Save all fields in a variable
		- [Add] Write cookie function
		- [Add] Read cookie function
		- [Add] get month text (in french)
		- [Fix] bug with array
		- [Update] graphs functions to be more flexibles
		- [Update] More options in graphs.repart and partial rewrite
		- [Update] ajax VB is throwing error in alert() (optionnal : set ajax.alert to false to prevent this)
	
	v. 1.0-b.6
		- [Add] option ignore null line in string.toArray function
		- [Add] insertVar string prototype
		- [Add] Console empty functions when console is undefined
		- [Fix] bug when no object passed in url.addParam function
		- [Fix] 'console is undefined' bug on IE
		- [Fix] bad result in min/max functions
		- [Update] tablesorter is not needed by tableau.write
		- [Update] tableau.write options new version more flexible
		- [Update] Flotr detection -> empty function
		- [Removed] throwing an error on bad input in toJSDate function
		- [Removed] '#/...' part of url in redirect
		
	v. 1.0-b.5
		- [Add] fetch file on server status function
		- [Add] Cp function
		- [Update] logMe function -> grammar
	
	v. 1.0-b.4
		- [Add] function for filtering a JS Array
		- [Add] JS Date test
		- [Add] clone_object function
		- [Add] vb function call by ajax
		- [Add] add parameters to url
		- [Add] string prototype capitalize
		- [Add] warning function
		- [Update] Error throw function
		- [Update] Get week number function -> Accept a JS date in input
		- [FIX] bad reference to function in repartion graph drawing
		- [FIX] bug with negative value in time repartion graph drawing
		
	v. 1.0-b.3
		- [Add] date/time convertion function
		- [Add] object whith global variables
		- [Update] RegExp for isNumeric function
		- [Deprecated] old date/time convertion functions
		
	v. 1.0-b.2
		- [Add] functions organisation
		- [Add] toArray() String prototype
		- [Update] Description translated in english (yeah!)
		- [Fix] bug on trim() function
	
	v. 1.0-b.1
		- [Add] jQuery, Flotr and tablesorter detection - just throw an error, nothing else !
	
	v. 1.0-b.0
		- [Add] fn object
		- [Add] math object
		
	v. 1.0-a
		- First public release
	
	-------------

*/

 
/*
	JS Library for common functions
	-------------
	
	* Global use Functions
		- clone object
	* HTML Table :
		- 'Convert' a JS Array into a html table (Array)
			//TODO : make tableSorter2 optional
		- Load a html table inside a JS Array
	* JS Array
		- Sort a multidimensional Array by one dimension
		- return one column of a 2-dimensional array
		- filter an array on a condition
		- get distincts values in a javascript array
	* URLs :
		- get parameters by id
		- JS redirection
		- Add param to URLs
			//TODO : deal with add param to with-param-url
		- Fetch file status (with callback function)
	* Charts & Graphs :
			//TODO : Global init + properties
		- Pareto
		- time repartition
			//TODO : fix xaxis -> show date-time values
		- values repartition
			//TODO : fix bug when multiple redraw
			//TODO : add option to draw vertical line
	* Dates
		- Convert date from user-defined date format to JS date format
			//TODO : set new formats (actually : JJ[/]MM[/]AAAA[ HH[:MM[:SS]]])
		- Calculate date difference in days, weeks, months or years
		- Add a time interval to a JS date
		- Get ISO week number 
		- Test is JS Date
		
		[Deprecated in 1.0-b.3]
		- Convert date from "JJMMAAAA" to JS date format
		- Convert date from "JJ/MM/AAAA" to JS date format
		- convert date from "JJ/MM/AAAA HH:MM:SS" to JS date format
		
	* Strings
	    - Add equivalent to 'Trim' VB-function
		- Return a JS array from a string
			//TODO : Add options
		- Capitalize
	* Ajax
		- Queue ajax request
			//TODO : Add clear queue option
		- Call a vb function
			//TODO : fix asp.net call -> no file name should be needed
	* Function
		- type
		- isArray
			//TODO : Move to Array object
		- isNumeric
		- isSerie
			//TODO : Move to Array object
		- getDimOfArray
			//TODO : Move to Array object
		- roundNumber
		- isPair
		- noDoublons
			//TODO : Move to Array object
		- inArray
			//TODO : Move to Array object
		- alert
		- error
			//TODO: improve error tracking
		- warning function
	* Maths
		- loiNormale
			//TODO : fix "random" bug with output
		- min
		- max
		- moyenne
		- medianne
		- variance
		- ecartType
		- variance_percent
		- cpk
		- cp
		- LCI
		- LCS
		- isNormal
			//TODO: investigate about random false results
			
			
	//GLOBAL TODO
		- improve documentation & comments !!
		- switch to Google Chart : Better documentation & API
 */