ZeLib
=====

Simple Javascript library for common functions



Functions
----------

* HTML Table
  * Convert a JS Array into a html table (Array)   
	``` z.tableau.write(wanted id , container id, JS Array  [, Array of headers titles [, CSS classes to use ]]);```
  * Load a html table inside a JS Array   
	```z.tableau.read(id of the table);```
* JS Array
	* Sort a multidimensional Array by one dimension   
	```z.array.sort.dim(dimension to sort);```
  * Return one column of a 2-dimensional array   
	```z.array.getColumn(JS Array, dimension to output);```	
* URLs
  * get url parameters by id   
  ```z.url.get.param.byName(param name);```
  * JS redirection   
  ```z.url.redirect(url);```

* Charts & Graphs
  * Pareto
  * time repartition
  * values repartition
* Dates
  * Convert date from _JJMMAAAA_ to JS date format
  * Convert date from _JJ/MM/AAAA_ to JS date format
  * convert date from _JJ/MM/AAAA HH:MM:SS_ to JS date format
  * Calculate date difference in days, weeks, months or years
  * Add a time interval to a JS date
* Strings
  * Add equivalent to 'Trim' VB-function
  * Return a JS array from a string
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

## v. 1.0-b.2

  * Description translated in english
  * New functions organisation

## v. 1.0-b.1

  * Added jQuery, Flotr and tablesorter detection - _just throw an error, nothing else !_

## v. 1.0-b.0

  * Add fn object
  * Add math object
	
## v. 1.0-a
	
   * First public release
	
	
License
-------

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
