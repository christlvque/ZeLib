/*parameters for jslint*/
/*jslint todo: true */
/*jslint browser: true*/


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
    @web :        https://github.com/liorzoue/ZeLib
    
    Required :
    - jQuery 1.8.0+ (http://jquery.com) [ jQuery ;) ]    //TODO : Remove jQuery references
    - Flotr2 (http://www.humblesoftware.com/flotr2/) [ graphs ]
    [ should be optional but recommended : - TableSorter 2.0 (http://tablesorter.com), a jQuery plugin ]
    
    Tested on :
        - Chrome 24+,
        - Firefox 19+,
        - IE 7+ (graphs plot seems to fail permanentely) 
            
    -------------
    
    Changelog :
    
    v. 1.2.20130801
        - [Fix] [Math] Quantile calc - Issue with syntax in IE8
        - [Update] Options for plot drawing
    
    v. 1.2.20130731 [Maths Update]
        - [Add] [Object] New process object -> contain all functions linked to indus process
        - [Add] [Object] New mat object -> contain all functions linked to matrix
        - [Add] [Math] Constants
        - [Add] [Math] Log10 function
        - [Add] [Math] sum of array values
        - [Add] [Math] isFinite test
        - [Add] [Math] Linear regression line calc
        - [Add] [Math] Phi approx calc for normal law
        - [Add] [Math] Normal law approx calc
        - [Add] [Statistics] Quantile estimation calc - 3 methods
        - [Add] [Statistics] Calc Normal inverse cumulative distribution
        - [Add] [Statistics] Draw qq-plot graph
        - [Add] [Graphs] simple plot function (x, y)
        - [Add] [Arrays] merge two arrays in one + option for regression line
        - [Remove] [Maths] Variance per cent specific function (deprecated in 1.1.a)
        - [Remove] [Maths] 'loiNormale' function -> remapped to statistics function
    
    v. 1.1.a
        - [Rewrite] Continue rewriting of library
        - [Add] Testing unit with qunit.js (see qunit.html)
        - [Add] date.toString new feature
        - [Add] export table to csv (download with no server request)
        - [Add] repart function : return a 2-dim array with values and theirs quantities
        - [Add] Options for math object (only used in repart function at this time)
        - [Add] math.variance() can return an %-value
        - [Add] p-value test
        - [Add] Choice of normality test ('kolgomorov' or 'pvalue')
        - [Add] getting hash in url with options
        - [Add] getting full url in url.get
        - [Add] English translation in dates.getMonth
        - [Add] Choice of language in dates.getMonth
        - [Add] Choice of date in string FR
        - [Add] About function
        - [Add] UI creation abilities with options - div + call fn.tableau functions
        - [Fix] UI param for interaction -> _ZeLib.ui now in _ZeLib.options 
        - [Fix] math.repart function
        - [Fix] page.cookie function -> bad result when multiple cookies
        - [Fix] Graphs init -> clone call was outdated
        - [Fix] JS date to FR date string -> 10- numbers whith '0'
        - [Fix] bad function call in mediane, LCI and LCS calc
        - [Fix] [step 1] random 'script is not responding'
        - [Update] Rewriting behavior of url functions 
        - [Update] Tablesorter support in <table> generator -> just give options
        - [Update] array sort function
        - [Update] dateDiff : added option for select type of diff
        - [Rename] function 'moyenne' to 'avg' 
        - [Rename] object 'export' from 'csv' to 'exp' -> cause a bug in IE7 (at least)
        - [Removed] Google Chart API
        - [Removed] old date/time convertion functions
        - [Deprecated] math.variance_percent function -> will be removed in next update
        - [Syntax] switch tabs to spaces (4)
        
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
        - [Fix] bad reference to function in repartion graph drawing
        - [Fix] bug with negative value in time repartion graph drawing
        
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
            
            
 */

/* Tiny fix for console */
(function () {

    var i,
        m = [     // union of Chrome, FF, IE, and Safari console methods
            "log", "info", "warn", "error", "debug", "trace", "dir", "group",
            "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
            "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
        ],
        for_length;

    if (!window.console) {
        window.console = {};
    }

    // define undefined methods as noops to prevent errors
    for_length = m.length;
    for (i = 0; i < for_length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function() { };
        }
    }
})();


(function () {
    /* Plugins detection */
    if (!window.jQuery) { throw 'jQuery was not detected !'; }
    if (!window.Flotr) {
        console.warn('Flotr2 was not dectected !');
        Flotr = function () { };
    }
    if (jQuery.tablesorter == undefined) { console.warn('jQuery plugin \'tablesorter\' was not detected !'); }


    /* Initial declaration */
    var 
    
        _ZeLib = function () { console.log ('Hello, user !'); return true; },

        /* Queue for ajax */
        ajaxQueue = jQuery({}),

        /* Use of jQuery.extend for adding new functions */
        _ZeExtend = _ZeLib.ZeExtend = function (obj) {
            /* Deep copy of the object */
            var recursive = true;
            return jQuery.extend(recursive, _ZeLib, obj);
        },
        
        /* variable for loop optimization */
        for_length;

        
    /* Hello world function */
    _ZeExtend({ init: function () { return _ZeLib.clone(_ZeLib); }});

    /* Default options */
    _ZeExtend({ options: {
        ajax: {
            divID: 'ajax-warn',
            labelID: 'ajax-warn-txt',
            showAlert: true
        },

        regex: {
            posInt: /^\d+$/,
            negInt: /^-\d+$/,
            posNegInt: /^-{0,1}\d*\.{0,1}\d+$/,
            posNegIntComma: /^-{0,1}\d*,{0,1}\d+$/
        }
    }});

    /* Log functions */
    _ZeExtend({ log: {
        /* Standart log */
        basic: function(msg) {
            console.log('ZeLib has a message for you : "' + msg + '"');
        },

        /* error */
        error: function(msg) {
            var txt = 'ZeLib error : ';
            console.log(txt + msg);
            throw txt + msg;
            // throw new Error(msg);
        },

        /* Warning*/
        warn: function(msg) {
            console.warn('ZeLib warning : ' + msg);
        }
    } });

    if (!window.error) { window.error = _ZeLib.log.error; }
    if (!window.logMe) { window.logMe = _ZeLib.log.basic; }
    if (!window.warnMe) { window.warnMe = _ZeLib.log.warn; }

    var 
        core_toString = Object.prototype.toString,
        core_indexOf = Array.prototype.indexOf,
        
        /* Sort numbers */
        sort_numbers = function(a,b){return a-b};
    
    
    /* Functions */
    _ZeExtend({ fn: {
        clone: function (obj) {
            return jQuery.extend(true, {}, obj);
        },

        ZeExtend: _ZeLib.ZeExtend,

        extend: function () {
            var recursive = true;
            var target = arguments[0],
                obj = arguments[1];

            return jQuery.extend(recursive, target, obj);
        }
    }});

    _ZeExtend({ extend: _ZeLib.fn.extend });
    _ZeExtend({ clone: _ZeLib.fn.clone });

    /* About */
    _ZeLib.about = function (what) {
        switch(what) {
            case 'version':
                return _ZeLib.about.version;
                break;
            case 'copyright':
                return _ZeLib.about.copyright;
                break;
            default:
                return 'ZeLib - v.' + _ZeLib.about.version + ' - Another JS library (' + _ZeLib.about.copyright + ')';
                break;
        }
    };
    
    _ZeLib.extend(_ZeLib.about, {
        version: '1.1.a',
        copyright: 'Copyright (C) 2013 Liorzou Etienne'
    });
    
    
    /* Generic functions */
    _ZeLib.extend(_ZeLib.fn, {
        type: function(obj) {
            return (typeof obj).toString(); ;
        },

        /* true when array */
        isArray: function(obj) { return (typeof obj == typeof []); },

        /* numeric test */
        isNumeric: function(obj) {
            var numericExpression = _ZeLib.options.regex.posNegInt;
            if (String(obj).match(numericExpression)) {
                return true;
            } else if (String(obj).match(_ZeLib.options.regex.posNegIntComma)) {
                obj = obj.replace(/,/g,"."); 
                return true;
            } else {
                return false;
            }
        },

        /* Teste si le tableau est une série de nombres */
        isSerie: function(aArray) {
            var dim, i;

            /* Teste si l'argument est un tableau */
            if (!this.isArray(aArray)) { return false; }

            /* Obtient le nombre de dimensions du tableau */
            dim = this.getDimOfArray(aArray);
            if (dim != 1) { return false; }

            /* Verification que tous les éléments soient numériques */
            for_length = aArray.length;
            for (i = 0; i < for_length; i++) { if (this.isNumeric(aArray[i]) == false) { return false; } }

            return true;
        },

        /* Retourne le nombre de dimensions du tableau */
        getDimOfArray: function(aArray) {
            var dim = 0;
            var tArray;
            var EOT = true; /* End Of Test */

            while (EOT) {
                if (this.isArray(aArray) == true) {
                    aArray = aArray[0];
                    dim++;
                    EOT = true;
                } else { EOT = false; }
            }

            return dim;
        },

        /* Fonctions sur les nombres */

        /* Arrondi d'un nombre */
        roundNumber: function(rnum, rlength) {
            if (this.isNumeric(rnum) == false) { return rnum; }
            var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
            return parseFloat(newnumber);
        },
        
        numArr: function(rlength) {
            var rnum = parseFloat(this.toString());
            var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
            return parseFloat(newnumber);
        },

        /* Test de parité */
        isPair: function(iValue) {
            if ((iValue / 2) == parseInt(iValue / 2)) { return true; } else { return false; }
        },

        /* Supprime les doublons d'un tableau */
        noDoublons: function(aArray) {
            aOut = [], i;
            for_length = aArray.length;
            for (i = 0; i < for_length; i++) { if (this.inArray(aArray[i], aOut) < 0) { aOut.push(aArray[i]); } }
            return aOut;
        },
        /* Fin des fonctions sur les nombres */

        /* check if element is in array */
        /* Return -1 or position of element */
        inArray: function(elem, arr, i) {
            var len;

            if (arr) {
                if (core_indexOf) { return core_indexOf.call(arr, elem, i); }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) { return i; }
                }
            }

            return -1;
        }
    });
    
    _ZeLib.extend(_ZeLib.fn, { tableau: {
        /* Read HTML table and place the result in a JS array */
        read: function (idTab) {
            var $table = jQuery('#' + idTab),
                $headerCells = $table.find("thead th"),
                $rows = $table.find("tbody tr"),
                headers = [],
                rows = [];

            $headerCells.each(function(k, v) {
                headers[headers.length] = jQuery(this).text();
            });

            $rows.each(function(row, v) {
                jQuery(this).find("td").each(function(cell, v) {
                    if (typeof rows[row] === 'undefined') rows[row] = [];
                    rows[row][cell] = jQuery(this).text();
                });
            });

            return rows;
        },
        
        /* Write HTML <table> from JS array */
        write: function(tID, cID, tArray /* , { headTitles, headClass, css, tablesorter } */) {
            var i = 0,
                j = 0,
                for_length_j;

            var container = jQuery('#' + cID),
                tHeader = undefined,    /* Textes des en-têtes */
                tClass = '',            /* Classes CSS du tableau */
                headClass,              /* Classes CSS des headers */
                table,                  /* tableau HTML */
                tbHeader,               /* en-tete du tableau HTML */
                tbBody,                 /* corps du tableau HTML */
                tbTR,                   /* <tr> HTML */
                tbTD,                   /* <td> HTML */
                optTablesorter;         /* Options pour le plugin tablesorter */

            /* Gestion des parametres facultatifs */
            if (arguments[3]) {
                if (arguments[3].headTitles) {
                    tHeader = arguments[3].headTitles;
                }
                if (arguments[3].css) {
                    tClass = arguments[3].css;
                }
                if (arguments[3].tablesorter) {
                    optTablesorter = arguments[3].tablesorter;
                }
                if (arguments[3].headClass) {
                    headClass = arguments[3].headClass;
                }
            }

            /* Détermine si le conteneur existe */
            if (container == undefined) {
                error('le div conteneur n\'existe pas !');
                return false;
            }

            /* vide le conteneur */
            container.html('');

            /* Détermine si 'tID' est déjà utilisé */
            if (jQuery('#' + tID).length > 0) {
                logMe('l\'ID utilisé pour le tableau existe déjà !');
                return false;
            }

            /* Détermine si 'tArray' est un tableau javascript */
            if (jQuery.isArray(tArray) == false) {
                error('le parametre n\'est pas un tableau !');
                return false;
            }

            /* Determine si un tableau d'en-tete est passé en parametre */
            if (tHeader) {
                if (jQuery.isArray(tHeader) == false) {
                    error('le parametre d\'en-tete n\'est pas un tableau !');
                    return false;
                }
            }

            /* Défini la table */
            container.append('<table id="' + tID + '"></table>');
            table = jQuery('#' + tID);

            /* Si tHeader est défini */
            if (tHeader != undefined) {
                /* Défini le header */
                table.append('<thead></thead>');
                tbHeader = table.children('thead');

                /* Ecriture des en-tete */
                tbHeader.append('<tr></tr>');
                tbTR = tbHeader.children('tr');
                var cssClass = '';
                for_length = tHeader.length;
                for (i = 0; i < for_length; i++) {
                    if (headClass != undefined) {
                        if (headClass[i] != undefined) {
                            cssClass = 'class="' + headClass[i] + '"';
                        } else {
                            cssClass = '';
                        }
                    } else { cssClass = ''; }
                    tbTR.append('<th ' + cssClass + '>' + tHeader[i] + '</th>');
                }
            }

            /* Défini le body */
            table.append('<tbody></tbody>');
            tbBody = table.children('tbody');
            for_length = tArray.length;
            for (i = 0; i < for_length; i++) {
                tbBody.append('<tr></tr>');
                tbTR = jQuery(tbBody.children('tr')[i]);
                for_length_j = tArray[i].length;
                for (j = 0; j < for_length_j; j++) {
                    tbTR.append('<td>' + tArray[i][j] + '</td>');
                }
            }
            
            /* tablesorter support */
            if (optTablesorter) {
                // Init tablesorter
                container.tablesorter(optTablesorter);
            }
            
            /* Aplique les classes de style au tableau */
            table.addClass(tClass);
        }
    }});
    
    /* ////
        URL functions
        - get param/url/hash/all in URL
        - redirect to another page
        - addParam to URL
        - fetch adress status
    */ ////
    _ZeExtend({ url: {
        get: function (what, obj) {
            var result = undefined;
            switch (what) {
                case 'param':     // Parametre url
                    result = (function () {
                        obj = obj.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                        var regexS = "[\\?&]" + obj + "=([^&#]*)";
                        var regex = new RegExp(regexS);
                        var results = regex.exec(window.location.search);
                        if (results == null)
                            return "";
                        else
                            return decodeURIComponent(results[1].replace(/\+/g, " "));
                    })();
                    
                    break;
                case 'url':     // Full URL

                    result = (function () {
                        // Here
                        logMe('z.get(\'url\'); not yet set');
                    })();
                    
                    break;
                    
                case 'hash':
                    
                    result = (function () {
                        if (_ZeLib.fn.isNumeric(obj)) {
                            return document.location.hash.substring(1).split('/')[obj];
                        } else {
                            return document.location.hash.substring(1);
                        }
                    })();
                    break;
                    
                case undefined:
                case 'all':
                    result = document.location.href;
                    break;
                    
                default:        // Unknown parameter
                    logMe('Unknown param : "' + what + '"');
                    result = false;
                    break;
            }
            
            return result;
        },
        
        redirect: function(thePage) {
            window.location.href = thePage;
        },
        
        addParam: function(url, obj) {
            /* obj -> Array of objects like : {id: 'q', value: 'toto'} */
            var param = '?';
            var i;
            var tAr = [];

            if (obj[0] == undefined || obj == undefined) { return url; }
            for_length = obj.length;
            for (i = 0; i < for_length; i++) {
                if (_ZeLib.fn.inArray(obj[i].id, tAr) > -1) { error('Duplicate param name : `' + obj[i].id + '`'); } else { tAr.push(obj[i].id); };
            }

            param = param + obj[0].id + '=' + obj[0].value;
            
            if (for_length > 1) {
                for (i = 1; i < for_length; i++) {
                    param = param + '&' + obj[i].id + '=' + obj[i].value;
                }
            }

            param = param.toString().replace(new RegExp('[\/ ]', 'g'), '');

            return url + param;
        },

        fetchStatus: function(address, callback) {
            function returnStatus(req, status) {
                if (status == 200) { console.log("The url is available"); callback(status); }
                else { console.log("The url returned status code " + status); callback(status); }
            }

            function fs(address) {
                var client = new XMLHttpRequest();
                client.onreadystatechange = function() { if (this.readyState == 4) { returnStatus(this, this.status); } }
                client.open("HEAD", address);
                client.send();
            }

            fs(address);
        }
    }});
    
    /* ////
        Array functions
        - sort arry on a user-defined dimension
        - get column of an Array
        - filter Array on condition
        - get disctinct values of an Array
        - convert Array values to numeric
        - Index Array 
    */ ////
    _ZeExtend({ array: {
        sort: {
            dim: function(index) {
                if (index == undefined) {
                    return function(a, b) { return (a === b ? 0 : (a < b ? -1 : 1)); };
                } else 
                {
                    return function(a, b) { return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1)); };
                }
            }
        },

        getColumn: function(tArray, dim) {
            var a = new Array;
            for_length = tArray.length;
            for (i = 0; i < for_length; i++) {
                a.push(tArray[i][dim]);
            }
            return a;
        },

        filter: function(tArray, condition, dim) {
            /* condition -> value to be equal */
            var a = new Array;
            for_length = tArray.length;
            for (i = 0; i < for_length; i++) { if (tArray[i][dim] == condition) { a.push(tArray[i]); } }
            return a;
        },

        distinctValues: function() {
            var tArray = arguments[0],
                dim = arguments[1],
                size,
                tOutput = new Array,
                i;

            if (tArray == undefined) { error('No data in : \'distinctValues\' !'); }
            if (dim == undefined) { /* Assume first dimension or one-dimensionnal array */dim = 0; }

            /* Get qte of array dims */
            size = _ZeLib.fn.getDimOfArray(tArray);

            switch (size) {
                case 0:
                    /* Hum, strange... Nothing can go out 'this' ! */
                    tOutput = undefined;
                    break;
                case 1:
                    /* 1-dimensional */
                    /* Go ! */
                    for_length = tArray.length;
                    for (i = 0; i < for_length; i++) { if (_ZeLib.fn.inArray(tArray[i], tOutput) < 0) { tOutput.push(tArray[i]); } }
                    break;
                case 2:
                    /* 2-dimensional */
                    /* Go ! (again) */
                    for_length = tArray.length;
                    for (i = 0; i < for_length; i++) { if (_ZeLib.fn.inArray(tArray[i][dim], tOutput) < 0) { tOutput.push(tArray[i][dim]); } }
                    break;
                case 3, 4, 5, 6, 7, 8 /* usw ... */:
                default:
                    /* So... you want more ? Code it, please ! Thanks. */
                    break;
            }


            return tOutput;
        },
        
        /* string to numeric */
        toNumeric: function() {
            var me = this;
            for_length = me.length;
            for (i=0;i<for_length;i++) {
                me[i] = parseFloat(me[i]);
            }
            return me;
        },
        
        toIndexedList: function () {
            var me = this;
            for_length = me.length;
            for (i=0;i<for_length;i++) {
                me[i] = [i, me[i]];
            }
            return me;
        },
        
        merge: function (a, b) {
            var length_a = a.length,
                length_b = b.length,
                arry = [],
                i;
            
            if (length_a != length_b) { return false; }
            
            for (i=0;i<length_a;i++) {
                arry.push([a[i], b[i]]);
            }
            
            return arry;
        }
    }});

    
    _ZeExtend({ math: {
        options: {
            RepartIntervals: 10,
            NumbersOnly: true
        },
        
        // loiNormale: _ZeLib.statistics.normale,

        min: function(aArray) {
            var i, min = parseFloat(aArray[0]);
            for_length = aArray.length;
            for (i = 0; i < for_length; i++) { if (parseFloat(aArray[i]) < min) { min = parseFloat(aArray[i]); } }
            return min;
        },

        max: function(aArray) {
            var i, max = parseFloat(aArray[0]);
            for_length = aArray.length;
            for (i = 0; i < for_length; i++) { if (parseFloat(aArray[i]) > max) { max = parseFloat(aArray[i]); } }
            return max;
        },

        avg: function(aArray) {
            var nbElem,
            sum = 0,
            i,
            arr = aArray.slice();

            if (!_ZeLib.fn.isSerie(arr)) {
                error('Le tableau n\'est pas une série (moyenne)');
            }

            nbElem = arr.length;

            /* Calcul de la moyenne */
            for (i = 0; i < nbElem; i++) { sum = parseFloat(sum) + parseFloat(arr[i]); }

            return parseFloat(sum) / parseFloat(nbElem);
        },

        mediane: function(aArray) {
            var i,
            nbElem,
            med,
            arr = aArray.slice();

            if (!_ZeLib.fn.isSerie(arr)) { error('Tableau n\'est pas une série'); }

            /* Tri du tableau */
            arr.sort(sort_numbers);
            nbElem = arr.length;
            /* logMe(arr); */
            /* Calcul de la médianes */
            if (_ZeLib.fn.isPair(nbElem)) {
                med = this.avg([arr[(nbElem / 2) - 1], arr[((nbElem / 2) + 1) - 1]]);
            } else { med = arr[(nbElem - 1) / 2]; }

            return med;
        },

        variance: function(aArray, percent) {
            var i,
            nbElem,
            fMoy,
            fVar,
            fTmp;

            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }

            nbElem = aArray.length;
            fMoy = parseFloat(this.avg(aArray));
            fVar = 0;
            for (i = 0; i < nbElem; i++) {
                fTmp = parseFloat(aArray[i]) - fMoy;
                fVar = parseFloat(fVar) + parseFloat(fTmp * fTmp);
            }

            fVar = parseFloat(fVar) / nbElem;
            if (percent == false || percent == undefined) {
                return fVar;
            } else if (percent == true || percent == '%') {
                var max = this.max(aArray),
                    min = this.min(aArray);
                return parseFloat(100 * fVar / (max - min));
            }
        },
        
        ecartType: function(aArray) {
            var fEcTp,
            fVar;

            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (ecartType)'); }

            fVar = this.variance(aArray);
            fEcTp = Math.sqrt(fVar);
            return fEcTp;
        },
        
        /*     Retourne un tableau a deux dimensions */
        repart: function(a, o) {
            o = _ZeLib.fn.extend(this.options, o);
            var r = new Array(), // array result
                s = new Array(),
                t = new Array(),
                p = 0;             // Position
                
                
            if(o.NumbersOnly && !_ZeLib.fn.isSerie(a)) {
                warnMe('input was not a number-only');
                return false;
            }
            
            /* logMe(a); */
            for_length = a.length;
            for (i=0;i<for_length;i++) {
                p = _ZeLib.fn.inArray(a[i], s);
                if (p==-1) { s.push(a[i]); t.push(1); } else { t[p]++; }
            }
            
            for_length = s.length;
            for (i=0;i<for_length;i++) {
                r.push([s[i],t[i]]);
            }
            
            logMe(r);
            return r;
        },
        
        /* Calcul du CpK */
        cpk: function(aArray, tolMin, tolMax) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (CpK)'); }
            /*
            if (this.isNormal(aArray, 'kolgomorov')) {
            // */
                var cpkmin = parseFloat((this.avg(aArray) - tolMin) / (3 * this.ecartType(aArray))),
                    cpkmax = parseFloat((tolMax - this.avg(aArray)) / (3 * this.ecartType(aArray)));
                return this.min([cpkmin, cpkmax]);
            /*
            } else {
                return '-';
            }
            // */
        },

        /* Calcul du Cp */
        cp: function(aArray, tolMin, tolMax) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (CpK)'); }
            /*
            if (this.isNormal(aArray, 'kolgomorov')) {
            // */
                return parseFloat((tolMax - tolMin) / (6 * this.ecartType(aArray)));
            /*
            } else {
                return '-';
            }
            // */
        },

        /* Limites de controle à nbS ecart-types */
        LCI: function(aArray, nbS) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }
            if (!_ZeLib.fn.isNumeric(nbS)) { error('Variable non numerique'); }

            return this.avg(aArray) - nbS * this.ecartType(aArray);
        },

        /* Limites de controle à nbS ecart-types */
        LCS: function(aArray, nbS) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }
            if (!_ZeLib.fn.isNumeric(nbS)) { error('Variable non numerique'); }

            return this.avg(aArray) + nbS * this.ecartType(aArray);
        },
        
        /* Log10 calc */
        log10: function (a) {
            return Math.log(a) / Math.LN10;
        }, 
        
        /* sum of array values */
        // WARNING : No verification
        sum: function (arr) {
            var length, i, sum = 0;
            
            if (arguments[1] == undefined) {
                length = arr.length;
                for (i=0; i<length; i++) { sum += arr[i]; }
            } else {
                length = arr[arguments[1]].length;
                for (i=0; i<length; i++) { sum += arr[arguments[1]][i]; }
            }
            
            return sum;
        }, 
        
        /* is finite test */
        isFinite: function (x) {
            return (!isNaN(x) && (x != Number.NEGATIVE_INFINITY) && (x != Number.POSITIVE_INFINITY));
        },
        
        /* Linear regression linked to data in parameter */
        regression: function (x, y) {
            var i, length = x.length,
                sx    = 0,
                sy    = 0,
                sxy   = 0,
                sxsq  = 0,
                xmean,
                ymean,
                alpha,
                beta;
                
            for (i=0;i<length;i++) {
                    // Computations used for regression line
                    sx += x[i];
                    sy += y[i];
                    sxy += x[i]*y[i];
                    sxsq += Math.pow(x[i],2);
                }
                
                n = length;
                xmean = sx/n;
                ymean = sy/n;
                beta  = ((n*sxy) - (sx*sy))/((n*sxsq)-(Math.pow(sx,2)));
                alpha = ymean - (beta * xmean);
                
                return { alpha: alpha, beta: beta };
        },
        
        floor: function (x) {
            return Math.floor(x);
        },
        
        ceiling: function (x) {
            return Math.ceil(x);
        },
        
        fractional_part: function (x) {
            return x - this.floor(x);
        }
    }});
    
    
    _ZeExtend({ math: {
        isNormal: function(aArray, test) {
            /*     Plusieurs test : 
                'kolgomorov'     : Test de Kolgomorov-Smirnov
                'pvalue'        : Test par rapport à la p-value
            */
            
            var kolgomorov_smirnov = function (arry) {
            
                /*    Test de Kolgomorov-Smirnov */
                /*    Principe :
                    Le test consiste à mesurer l'écart
                    entre la fonction de répartition exacte (ici, la loi normale)
                    et la fonction de répartition empirique
                        
                        le test est validé si la valeur absolue de
                    l'ecart max des fréquences ne dépasse pas une certaine valeur
                       
                        On calcule donc les fréquences
                    d'apparition de toutes les valeurs distinctes
                */

                var aFreq = [[], [], []], /* Tableau des fréquences */
                    max, /* écart max */
                    sizeOf, /* Taille du tableau */
                    normal, /* contient la sortie */
                    pos, i;

                if (!_ZeLib.fn.isSerie) { return false; }

                sizeOf = arry.length

                /* Calcul des fréquences */
                for (i = 0; i < sizeOf; i++) {
                    pos = _ZeLib.fn.inArray(arry[i], aFreq[0]);
                    if (pos < 0) {
                        aFreq[0].push(arry[i]);
                        aFreq[1].push(1);
                    } else {
                        aFreq[1][pos] = aFreq[1][pos] + 1;
                    }
                }

                for_length = aFreq[1].length;
                for (i = 0; i < for_length; i++) { aFreq[1][i] = aFreq[1][i] / sizeOf; }

                /* Calcul des fréquences théoriques */
                max = 0;
                for_length = aFreq[0].length;
                for (i = 0; i < for_length; i++) {
                    aFreq[2][i] = _ZeLib.normale(
                                        aFreq[0][i],
                                        _ZeLib.math.avg(aFreq[0]),
                                        _ZeLib.math.ecartType(aFreq[0])) / for_length;

                    if (Math.abs(aFreq[2][i] - aFreq[1][i]) > max) { max = Math.abs(aFreq[2][i] - aFreq[1][i]); }
                }

                normal = false;

                if (sizeOf < 41) {
                    /*    Table des valeurs critiques
                    du test de Kolmogorov-Smirnov pour un échantillon
                    pour une erreur à 5%
                    N     Valeur
                    5    0.565
                    6    0.52
                    7    0.49
                    8    0.46
                    9    0.43
                    10    0.41
                    11    0.39
                    12    0.38
                    13    0.36
                    14    0.35
                    15    0.34
                    16    0.33
                    17    0.32
                    18    0.31
                    19    0.30
                    20    0.29
                    21    0.29
                    22    0.28
                    23    0.28
                    24    0.27
                    25    0.26
                    26    0.26
                    27    0.25
                    28    0.25
                    29    0.25
                    30    0.24
                    31    0.24
                    32    0.23
                    33    0.23
                    34    0.23
                    35    0.22
                    36    0.22
                    37    0.22
                    38    0.22
                    39    0.21
                    40    0.21

                        Equation de la courbe de tendance : 1.2349*max^(-0.48)
                    Coeff R² = 0.9999
                    */

                    if (max > (1.2349 * Math.pow(sizeOf, -0.48))) { normal = false; } else { normal = true }
                } else {
                    /*     Pour sizeOf >= 40
                    Les valeurs critiques du test sont déterminées par la formule :
                    1.36 * racine (N)
                    */

                    if (max > (1.36 * Math.sqrt(sizeOf))) { normal = false; } else { normal = true }
                }

                return normal;
                
            };
        
            var p_value = function (arry) {
                /*     p-value */
                /*     Principe : 
                    Calcul de la p-value puis suivant la valeur, hypothèse rejetée ou non */
                
                /* Calcul p-value */
                
                return true;
            };
            
            switch (test) {
                case 'kolgomorov': 
                    return kolgomorov_smirnov(aArray);
                    break;
                case 'pvalue':
                    return p_value(aArray);
                    break;
                case undefined:
                default:
                    return undefined;
                    break;
            }
        }

    }});
    
    _ZeExtend({ graphs: {
        /* Pareto */
        pareto: {
            /* Options génériques */
            options: {
                selection: { mode: 'y', fps: 30 },
                bars: {
                    show: true,
                    horizontal: true,
                    shadowSize: 0,
                    barWidth: 1
                },
                yaxis: {
                    min: 0,
                    autoscaleMargin: 1,
                    showLabels: false
                },
                xaxis: {
                    autoscale: true,
                    min: 0
                },
                legend: {
                    position: 'se',
                    backgroundColor: '#fff'
                }
            },

            /* Dessine le graph */
            draw: function(id, dArray, tFormat, opts) {

                function internal_draw_pa(id, dArray, tFormat, opts) {
                    var o = Flotr._.extend(
                            Flotr._.clone(_ZeLib.graphs.pareto.options),
                            opts || {});

                    oM = { mouse: { track: true, relative: false, position: 'nw', trackFormatter: tFormat} };
                    o = Flotr._.extend(
                                Flotr._.clone(o),
                                oM || {});

                    var graph_c = document.getElementById(id);

                    return Flotr.draw(graph_c, [{
                        data: dArray,
                        label: 'Pareto',
                        markers: {
                            show: true,
                            position: 'lm',
                            fontSize: 9,
                            labelFormatter: tFormat,
                            horizontal: true
                        }
}], o);
                    }

                    if (!tFormat) { tFormat = function(obj) { return 'x=' + obj.x + ' y=' + obj.y; }; }

                    internal_draw_pa(id, dArray, tFormat, opts);

                    Flotr.EventAdapter.observe(graph_c, 'flotr:select', function(area) {
                        graph = internal_draw_pa(id, dArray, tFormat, {
                            xaxis: { autoscale: true },
                            yaxis: { min: area.y1, max: area.y2, autoscaleMargin: 1, showLabels: true /*, tickFormatter: TickPareto */ }
                        });
                    });

                    Flotr.EventAdapter.observe(graph_c, 'flotr:click', function() { internal_draw_pa(id, dArray, tFormat); });
                }
            },

        /* Graph de répartion temporelle */
        histo: {
            init: function() { return _ZeLib.fn.clone(this); },

            opt: {
                colors: ['#00A8F0', '#C0D800', '#C0D800', '#4DA74D', '#9440ED'],
                xaxis: {
                    mode: 'time',
                    labelsAngle: 45
                },
                yaxis: {
                    autoscale: true,
                    autoscaleMargin: 5
                },
                selection: {
                    mode: 'xy'
                },
                legend: {
                    position: 'ne'
                },
                HtmlText: false,
                mouse: {
                    track: true,
                    relative: true
                }
            },

            draw: function(arg) {
                /*
                arg.data    :   tableau de données
                arg.cols    :   colonnes à utiliser, format : { x: 2, y: 0 [, y2: 3] } [facultatif - par défaut { x: 0, y: 1 }]
                arg.cont    :   id du container
                */

                if (arg.cols == undefined) { arg.cols = { x: 0, y: 1, y2: undefined, y3: undefined }; }
                if (arg.cont == undefined) { throw 'histo.draw: container not set'; }
                if (arg.data == undefined) { throw 'histo.draw: no data'; }
                if (arg.title == undefined) { arg.title = 'Serie 1'; }
                if (arg.title2 == undefined) { arg.title2 = 'Serie 2'; }
                if (arg.title3 == undefined) { arg.title3 = 'Serie 3'; }
                if (arg.max != undefined) { this.opt.yaxis.max = arg.max; }

                if (arg.timeProportional == undefined) { arg.timeProportional = true; }
                var i;
                var datArr = new Array;
                var datArr_2 = new Array;
                var datArr_3 = new Array;

                /* Si tableau à une dimension en parametre */
                if (_ZeLib.fn.getDimOfArray(arg.data) == 1) { for (i = 0; i < arg.data.length; i++) { arg.data[i] = [i, parseFloat(arg.data[i])]; } }

                for_length = arg.data.length;
                for (i = 0; i < for_length; i++) {
                    if (arg.timeProportional == false) {
                        datArr.push([i, arg.data[i][arg.cols.y]]);
                        if (arg.cols.y2 != undefined) {
                            if (_ZeLib.fn.isNumeric(arg.data[i][arg.cols.y2])) {
                                datArr_2.push([i, parseFloat(arg.data[i][arg.cols.y2])]);
                            }
                        }
                        if (arg.cols.y3 != undefined) {
                            if (_ZeLib.fn.isNumeric(arg.data[i][arg.cols.y3])) {
                                datArr_3.push([i, parseFloat(arg.data[i][arg.cols.y3])]);
                            }
                        }
                    } else {
                        datArr.push([arg.data[i][arg.cols.x], arg.data[i][arg.cols.y]]);
                        if (arg.cols.y2 != undefined) {
                            if (_ZeLib.fn.isNumeric(arg.data[i][arg.cols.y2])) {
                                datArr_2.push([arg.data[i][arg.cols.x], parseFloat(arg.data[i][arg.cols.y2])]);
                            }
                        }
                        if (arg.cols.y3 != undefined) {
                            if (_ZeLib.fn.isNumeric(arg.data[i][arg.cols.y3])) {
                                datArr_3.push([arg.data[i][arg.cols.x], parseFloat(arg.data[i][arg.cols.y3])]);
                            }
                        }
                    }
                }

                var container = document.getElementById(arg.cont);
                container.innerHTML = '';

                var options = this.opt;
                var d1 = datArr;
                var d2 = datArr_2;
                var d3 = datArr_3;

                var data = new Array;

                data.push({ data: d1, label: arg.title });

                if (arg.cols.y2 != undefined) {
                    data.push({ data: d2, label: arg.title2 });
                    if (arg.cols.y3 != undefined) {
                        data.push({ data: d3, label: arg.title3 });
                    }
                }
                var graph_h;

                options.xaxis.margin = 30;
                options.mouse.trackFormatter = function(t) { return arg.data[parseInt(t.x, 10)][arg.cols.x] + ' - ' + t.y; }
                if (arg.timeProportional == false) {
                    options.xaxis.mode = 'normal';
                }
                // Draw graph with default options, overwriting with passed options
                function drawGraph(opts) {
                    // Clone the options, so the 'options' variable always keeps intact.
                    o = Flotr._.extend(Flotr._.clone(options), opts || {});
                    // Return a new graph.
                    return Flotr.draw(container, data, o);
                }

                graph_h = drawGraph();

                Flotr.EventAdapter.observe(container, 'flotr:select', function(area) {
                    // Draw selected area
                    graph_h = drawGraph({
                        xaxis: { min: area.x1, max: area.x2, mode: 'time', labelsAngle: 45, margin: 30 },
                        yaxis: { min: area.y1, max: area.y2 }
                    });
                });
                // When graph is clicked, draw the graph with default area.
                Flotr.EventAdapter.observe(container, 'flotr:click', function() { graph_h = drawGraph(); });
            }
        },

        /* Graph de répartion de valeurs */
        repart: {

            init: function() { return _ZeLib.fn.clone(this); },

            opt: {
                colors: ['#00A8F0', '#CB4B4B', '#CB4B4B', '#4DA74D', '#9440ED'],
                bars: {
                    show: true,
                    horizontal: false,
                    shadowSize: 0,
                    barWidth: 0.5
                },
                mouse: {
                    track: true,
                    relative: true,
                    trackDecimals: 4,
                    trackFormatter: function(t) { return parseInt(t.y, 10); }
                },
                yaxis: {
                    min: 0,
                    autoscaleMargin: 1
                },
                xaxis: {
                    labelsAngle: 45
                },
                legend: {
                    position: 'ne'
                },
                selection: {
                    mode: undefined
                },
                grid: {
                    verticalLines: false
                },
                HtmlText: false
            },

            draw: function(arg) {
                //TODO : fix bug when multiple redraw
                //TODO : add option to draw vertical line
                /*
                arg.data    :   tableau de données
                arg.cols    :   colonnes à utiliser, format : { x: 0 } [facultatif - par défaut { x: 0 }]
                arg.cont    :   id du container
                arg.title    :     titre du graphique
                arg.vertical:    array of values for vertical lines - format : [{data: val1, name:'nameOfLine'} (, {data: val2, name:'otherNameOfLine'}  (, ...))]
                */

                var getDiv = function() {
                    return 10;
                };

                var withVert = true;

                /* Parameters */
                /* Graph container */
                if (arg.cont == undefined) { throw 'histo.draw: container not set'; }

                /* Graph data */
                if (arg.data == undefined) { throw 'histo.draw: no data'; }

                /* Column to use. Default: 0 */
                if (arg.cols == undefined) { arg.cols = { x: 0 }; }

                /* Number of data intervals */
                switch (arg.div) {
                    case undefined:
                    case 0:
                        arg.div = 10;
                        break;
                    case 'no':
                        /* See below */
                    default:
                        break;
                }

                /* Data name */
                if (arg.title == undefined) { arg.title = 'Serie 1'; }

                /* Add verticals lines when true */
                /* Format : 
                [{data: val1, name:'nameOfLine'} (, {data: val2, name:'otherNameOfLine'}  (, ...))]
                */
                if (arg.vertical == undefined) { withVert = false; }



                var i;
                var tArr = new Array;

                /* Push data in an internal Array */
                for_length = arg.data.length;
                for (i = 0; i < for_length; i++) {
                    tArr.push(parseFloat(arg.data[i]));
                }

                /* Get min/max values */
                var min = _ZeLib.math.min(tArr);
                var max = _ZeLib.math.max(tArr);
                var ec = (max - min) / (arg.div - 1);
                var datArr = new Array;

                /* Fill array with number of div */
                if (arg.div == 'no') {
                    var tTempArray = new Array;
                    /* Remove redundant values */
                    tTempArray = _ZeLib.array.distinctValues(tArr);
                    tTempArray.sort();
                    
                    for_length = tTempArray.length;
                    for (i = 0; i < for_length; i++) { datArr.push([tTempArray[i], 0]); }
                    
                    for_length = tArr.length;
                    for (i = 0; i < for_length; i++) {
                        if (_ZeLib.fn.inArray(tArr[i], _ZeLib.array.getColumn(datArr, 0)) >= 0) {
                            datArr[_ZeLib.fn.inArray(tArr[i], _ZeLib.array.getColumn(datArr, 0))][1]++;
                        }
                    }
                    tTempArray = null;
                    if (arg.min == undefined) { arg.min = _ZeLib.math.min(_ZeLib.array.getColumn(datArr, 0)); }
                    if (arg.max == undefined) { arg.max = _ZeLib.math.max(_ZeLib.array.getColumn(datArr, 0)); }

                } else {
                    for (i = 0; i < arg.div; i++) { datArr.push([min + i * ec, 0]); }
                    for_length = tArr.length;
                    for (i = 0; i < for_length; i++) { datArr[parseInt((tArr[i] - min) / ec)][1]++; }
                }

                var container = document.getElementById(arg.cont);
                container.innerHTML = '';

                var options = Flotr._.extend(Flotr._.clone(this.opt), arg.opt || {});
                var d1 = datArr;

                options.yaxis.min = 0;
                options.yaxis.max = _ZeLib.math.max(_ZeLib.array.getColumn(d1, 1)) * (1.1);

                options.bars.barWidth = ec ? ec : 1;

                if (arg.min == undefined) { options.xaxis.min = min - ec / 2; }
                else { options.xaxis.min = arg.min; }

                if (arg.max == undefined) { options.xaxis.max = max - ec / 2 + ec; }
                else { options.xaxis.max = arg.max; }

                options.xaxis.margin = 30;

                var dataArray = [{ data: d1, label: arg.title}];

                var vertValue, vertName;


                /* Add verticals lines */
                if (withVert == true) {
                    for_length = arg.vertical.length;
                    for (i = 0; i < for_length; i++) {
                        vertValue = arg.vertical[i].data;
                        vertName = arg.vertical[i].name;

                        dataArray.push({ data: [[vertValue, -1], [vertValue, 1000000]], label: vertName, lines: { show: true }, bars: { show: false} });
                    }
                }

                // Draw graph with default options, overwriting with passed options
                function drawGraph(opts) {
                    o = Flotr._.extend(Flotr._.clone(options), opts || {});
                    Flotr.draw(container, dataArray, o);
                }

                drawGraph();

                Flotr.EventAdapter.observe(container, 'flotr:select', function(area) { drawGraph({ xaxis: { min: area.x1, max: area.x2, labelsAngle: 45, margin: 30 }, yaxis: { min: area.y1, max: area.y2} }); });
                // When graph is clicked, draw the graph with default area.
                Flotr.EventAdapter.observe(container, 'flotr:click', function() { drawGraph(); });

            }
        },
    
        draw: function (d, o) {
            /*     supported graphs */
            /*
                'pareto'     : pareto graph
                'histo'        : chronological repartition
                'repart'     : Repartition
            */
            
            /*     number of series */
            var l = d.length;
            
            /*     function pareto */
            var pareto = function (d, o) {
                
            };
            
        },
        
        /* Simple plot function */
        /*  If x and y are vectors, plot(x, y) produces a scatterplot of y against x.
            The same effect can be produced by supplying one argument (second form) as either a list containing two elements x and y or a two-column matrix.
                
            opts object : (default values)
            - withReg: false
        */
        plot: function (x, y, container, opts) {
            var dim_x = _ZeLib.fn.getDimOfArray(x),
                dim_y = _ZeLib.fn.getDimOfArray(y),
                data = [],
                d2 = [],
                length, // length of data
                i,
                min,
                max,
                alpha,
                beta,
                container = document.getElementById(container);
                
            // Merge opts and default
            opts = _ZeLib.extend(
            { // Default
                withReg: false,
                dataTitle: 'data_input',
                withRegLabel: true,
                x: {
                    scaling: 'linear'
                },
                y: {
                    scaling: 'linear'
                }
            },
            opts);
            
            if (!dim_y && dim_x == 1) {
                warnMe('y serie is not defined -> can\'t plot any beautiful graph. Sorry.');
                return false;
            }
            
            if (dim_x == 2) { y = _ZeLib.array.getColumn(x, 1); x = _ZeLib.array.getColumn(x, 0); }
            
            var size_x = x.length,
                size_y = y.length;
                
            if (size_x != size_y) {
                warnMe('Series size mismatch. (x.length = ' + size_x + ', y.length = ' + size_y + ')');
                return false;
            }
            
            length = size_x;
            data = _ZeLib.array.merge(x, y);
            
            if (opts.withReg) {
            
                var obj = _ZeLib.math.regression(x,y);
                
                alpha = obj.alpha;
                beta  = obj.beta;
                
                max = _ZeLib.math.max(x);
                min = _ZeLib.math.min(x);
                for (n = min; n < max + 1; n++){
                    d2.push([n, alpha + beta*n])
                }  
                
                if (opts.withRegLabel) {
                    graph = Flotr.draw(container,
                        [{ data : data, label : opts.dataTitle, points : { show : true } },
                         { data : d2, label : 'y = ' + alpha.toFixed(2) + ' + ' + beta.toFixed(2) + '*x' }],
                        {
                            xaxis: { scaling: opts.x.scaling },
                            yaxis: { scaling: opts.y.scaling }
                        });
                } else {
                    graph = Flotr.draw(container,
                        [{ data : data, label : opts.dataTitle, points : { show : true } },
                         { data : d2 }],
                        {
                            xaxis: { scaling: opts.x.scaling },
                            yaxis: { scaling: opts.y.scaling }
                        });
                }
                    
            } else {
                graph = Flotr.draw(container, [{ data : data, label : opts.dataTitle, points: { show: true }, lines: { show: false } }]);
            }
            
            return graph;
        }
    }});
    
    /* ////
        Dates functions
        - is JS date test
        - convert JS date to FR date string 
        - convert date-time string to JS Date
        - diff in seconds/days/weeks/months/year between 2 dates
        - add year/quarter/month/day/hour/minute/second/millisecond to JS date
        - ISO week number
        - full month
    */ ////
    _ZeExtend({ dates: {
        // JJMMAAAA                - 8
        // JJ/MM/AAAA            - 10
        // JJ/MM/AAAA HH:MM:SS    - 19

        // Format FR
        defaultDateFormat: 'JJ/MM/AAAA HH:MM:SS',

        isJSDate: function(date) {
            return Object.prototype.toString.call(date) == '[object Date]';
        },
        
        toStringFR: function (d, dayOnly) {
            var a = [];
            
            a.push(d.getDate());
            a.push(d.getMonth() + 1);
            a.push(d.getFullYear());
            a.push(d.getHours());
            a.push(d.getMinutes());
            a.push(d.getSeconds());
            
            for_length = a.length;
            for (i=0;i<for_length;i++) {
                if (a[i] < 10)
                    a[i] = '0' + a[i];
            }
            
            if (!dayOnly) {
                return a[0] + '/' + a[1] + '/' + a[2] + ' ' + a[3] + ':' + a[4] + ':' + a[5];
            } else {
                return a[0] + '/' + a[1] + '/' + a[2];
            }
        },
    
        // >> JJ[/]MM[/]AAAA[ HH[:MM[:SS]]]
        toJSDate: function(dDate, dCode /* UNUSED */) {

            if (this.isJSDate(dDate)) { return dDate; }

            var d_day, d_month, d_year, d_hour, d_min, d_second;

            var date, time;

            // TODO : USE THIS ! :)
            if (dCode == undefined) {
                dCode = this.defaultDateFormat;
            }

            // SWITCH CASE POSITION OF ITEMS

            date = dDate.split(' ')[0];
            time = dDate.split(' ')[1];

            d_day = date.split('/')[0];
            d_month = date.split('/')[1];
            d_year = date.split('/')[2];

            if (time != undefined) {
                d_hour = time.split(':')[0];
                d_min = time.split(':')[1];
                d_second = time.split(':')[2];
            }

            if (d_month == undefined && d_day.length == 8) {
                d_year = d_day.substring(4, 10);
                d_month = d_day.substring(2, 4);
                d_day = d_day.substring(0, 2);
            }

            var check = false;

            // VERIFICATION OF DATE VALIDITY
            // ADD A NEW LINE TO ADD A NEW CHECK
            check = check || (d_day == undefined || d_day.length != 2);
            check = check || (d_month == undefined || d_month.length != 2);
            check = check || (d_year == undefined || d_year.length != 4);
            check = check || (d_hour != undefined && d_hour.length != 2);
            check = check || (d_min != undefined && d_min.length != 2);
            check = check || (d_second != undefined && d_second.length != 2);

            if (check) { return false; }
            // END CHECK

            d_day = parseInt(d_day, 10);
            d_month = parseInt(d_month, 10);
            d_year = parseInt(d_year, 10);

            if (d_hour != undefined) { d_hour = parseInt(d_hour, 10); } else { d_hour = 0; }
            if (d_min != undefined) { d_min = parseInt(d_min, 10); } else { d_min = 0; }
            if (d_second != undefined) { d_second = parseInt(d_second, 10); } else { d_second = 0; }

            var jsDate = new Date(d_year, d_month - 1, d_day, d_hour, d_min, d_second);
            //logMe(jsDate);
            return jsDate;
        },
                
        diff: function (inWhat, d1, d2) {
            if (d2 == undefined || d2 == 'now') {
                d2 = new Date();
            }
        
            var result;
            
            var inSeconds = function (d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2 - t1),10);
            };

            var inDays = function(d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2 - t1) / (24 * 3600 * 1000));
            };

            var inWeeks = function(d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
            };

            var inMonths = function(d1, d2) {
                var d1Y = d1.getFullYear();
                var d2Y = d2.getFullYear();
                var d1M = d1.getMonth();
                var d2M = d2.getMonth();

                return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
            };

            var inYears = function(d1, d2) {
                return d2.getFullYear() - d1.getFullYear();
            };
            
            switch (inWhat) {
                case 's':
                    result = inSeconds(d1, d2);
                    break;
                case 'd':
                    result = inDays(d1, d2);
                    break;
                case 'w':
                    result = inWeeks(d1, d2);
                    break;
                case 'm':
                    result = inMonths(d1, d2);
                    break;
                case 'y':
                    result = inYears(d1, d2);
                    break;
                default: 
                    result = undefined;
                    break;
            }
            
            return result;
        },

        dateAddExtension: function(p_Interval, p_Number) {
            var thing = new String();
            p_Interval = p_Interval.toLowerCase();

            if (isNaN(p_Number)) {
                throw "The second parameter must be a number. \n You passed: " + p_Number;
                return false;
            }

            p_Number = new Number(p_Number);
            switch (p_Interval.toLowerCase()) {
                case "yyyy":
                    {// year 
                        this.setFullYear(this.getFullYear() + p_Number);
                        break;
                    }
                case "q":
                    {        // quarter 
                        this.setMonth(this.getMonth() + (p_Number * 3));
                        break;
                    }
                case "m":
                    {        // month 
                        this.setMonth(this.getMonth() + p_Number);
                        break;
                    }
                case "y":        // day of year 
                case "d":        // day 
                case "w":
                    {        // weekday 
                        this.setDate(this.getDate() + p_Number);
                        break;
                    }
                case "ww":
                    {    // week of year 
                        this.setDate(this.getDate() + (p_Number * 7));
                        break;
                    }
                case "h":
                    {        // hour 
                        this.setHours(this.getHours() + p_Number);
                        break;
                    }
                case "n":
                    {        // minute 
                        this.setMinutes(this.getMinutes() + p_Number);
                        break;
                    }
                case "s":
                    {        // second 
                        this.setSeconds(this.getSeconds() + p_Number);
                        break;
                    }
                case "ms":
                    {        // second 
                        this.setMilliseconds(this.getMilliseconds() + p_Number);
                        break;
                    }
                default:
                    {
                        //throws an error so that the coder can see why he effed up and 
                        //a list of elegible letters. 
                        throw "The first parameter must be a string from this list: \n" +
                        "yyyy, q, m, y, d, w, ww, h, n, s, or ms. You passed: " + p_Interval;
                        return false;
                    }
            }
            return this;
        },

        /* return ISO week number */
        numSem: function(aaaa, mm, jj) {
            var maDate;

            if (mm != undefined) {
                mm = mm - 1;
                MaDate = new Date(aaaa, mm, jj);
            } else if (this.isJSDate(aaaa)) {
                MaDate = aaaa;
                jj = MaDate.getDate();
                mm = MaDate.getMonth();
                aaaa = MaDate.getFullYear();
            } else {
                error('Date non valide');
                return false;
            }

            var annee = MaDate.getFullYear(),
            NumSemaine = 0,
            ListeMois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
            TotalJour = 0,
            JourDebutAn;

            if (annee % 4 == 0 && annee % 100 != 0 || annee % 400 == 0) { ListeMois[1] = 29 };
            for (cpt = 0; cpt < mm; cpt++) { TotalJour += ListeMois[cpt]; }

            TotalJour += jj;
            DebutAn = new Date(annee, 0, 1);
            JourDebutAn = DebutAn.getDay();

            if (JourDebutAn == 0) { JourDebutAn = 7 };

            TotalJour -= 8 - JourDebutAn;
            NumSemaine = 1;
            NumSemaine += Math.floor(TotalJour / 7);

            if (TotalJour % 7 != 0) { NumSemaine += 1 };
            if (JourDebutAn > 4) { NumSemaine -= 1 };
            if (NumSemaine == 0) { NumSemaine = 53 };

            return (NumSemaine);
        },

        getMonth: function (value, lg) {
            var mois = parseInt(value, 10),
                tab;
                
            
            if (lg == undefined) { lg = 'en'; }
            
            
            switch (lg) {
                
                case 'fr':
                    tab = [
                        'Janvier',
                        'Fevrier',
                        'Mars',
                        'Avril',
                        'Mai',
                        'Juin',
                        'Juillet',
                        'Aout',
                        'Septembre',
                        'Octobre',
                        'Novembre',
                        'Décembre'
                    ];
                    break;
                    
                default:
                case 'en':
                    tab = [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'                        
                    ];
                    break;
            }
                    

            value = tab[value - 1];

            return value;
        }
    }});

    /* ////
        Strings functions
        - trim
        - convert string to array
        - insert var into string (placed in '{0}', '{1}', ...)
        - capitalize string
    */ ////
    _ZeExtend({ string: {
        /* Supprime les espaces au début et à la fin d'une chaine */
        trim: function() {
            return this.replace(/^\s+/g, '').replace(/\s+$/g, '');
        },

        /* string to array */
        toArray: function(lSep /* line separator */, cSep /* column separator */, ignoreNullLines) {
            var me = this.toString();
            var tmpArray = me.split(lSep), i, tArray = new Array;

            if (ignoreNullLines == undefined) { ignoreNullLines = true; }
            
            for_length = tmpArray.length;
            for (i = 0; i < for_length; i++) {
                if ((tmpArray[i] != '' && ignoreNullLines) || (ignoreNullLines == false)) { tArray.push(tmpArray[i].split(cSep)); }
            }

            return tArray;
        },

        insertVar: function() {
            var func = function(me, arguments) {
                var i, reg, str;
                for_length = arguments.length;
                for (i = 0; i < for_length; i++) {
                    /* logMe(arguments[i]); */
                    str = '{' + i + '\\}';
                    reg = new RegExp(str, 'g');
                    me = me.replace(reg, arguments[i]);
                }

                return me;
            }

            return func(this, arguments);
        },

        capitalize: function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
    }});

    _ZeExtend({ ajax: {

        /*
        queue ajax
        -- Make ajax become synchrone !
        -- Not in Javascript spirit, but can be useful.
        */
        queue: function(ajaxOpts) {
            var oldComplete = ajaxOpts.complete;
            ajaxQueue.queue(function(next) {
                ajaxOpts.complete = function() {
                    if (oldComplete) { oldComplete.apply(this, arguments); }
                    next();
                };

                jQuery.ajax(ajaxOpts);
            });
        },

        /* Call a vb function */
        vb: function(vbFunction, callback, param) {
            var tData = [];
            var cData = undefined;
            var output = false;
            var i;



            if (param != undefined) {
                for_length = param.length;
                for (i = 0; i < for_length; i++) {
                    if (param[i][0] == undefined || param[i][1] == undefined) {
                        error('Parametre ' + parseInt(parseInt(i) + parseInt(1)) + ' invalide !\n' + param[i]);
                        return false;
                    } else {
                        tData[i] = param[i][0] + ': "' + param[i][1] + '", ';
                    }
                }

                cData = '{ ';
                for_length = tData.length;
                for (i = 0; i < for_length; i++) {
                    cData = cData + tData[i];
                }

                cData = cData.substring(0, cData.length - 2) + ' }';

            } else {
                cData = '{ }';
            }

            var result = $j.ajax({
                type: "POST",
                url: vbFunction, // ! Must include the file name (fix ?)
                data: cData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    /*    alert(msg); */
                    $j('#' + _ZeLib.options.ajax.divID).hide();
                    callback(msg);
                    return msg.d;
                },
                failure: function(msg) {
                    $j('#' + _ZeLib.options.ajax.divID).slideDown();
                    $j('#' + _ZeLib.options.ajax.labelID).html(msg);
                    callback(msg);
                    return false;
                },
                error: function(xhr, err) {
                    if (xhr.responseText != undefined && _ZeLib.options.ajax.showAlert) { var mess = jQuery.parseJSON(xhr.responseText).Message; if (mess != undefined) { alert(mess); } }
                    $j('#' + _ZeLib.options.ajax.divID).slideDown();
                    $j('#' + _ZeLib.options.ajax.labelID).html(jQuery.parseJSON(xhr.responseText).Message);
                    warnMe('Erreur ajax : \n"' + jQuery.parseJSON(xhr.responseText).Message + '"\n\ncallback function :\n' + eval(callback));
                    callback(xhr, err);
                    return false;
                }
            });

            return output;
        }

    }});

    _ZeExtend({ page: {
        saveFields: function() {
            /* save all input fields of the current page */
            var inp = $j('input[type!=button][type!=hidden]');
            var i, fArray = new Array;
            //alert(inp);

            for (i=0;i<inp.length;i++) {
                fArray.push({ id: inp[i].attributes.id.value, val: inp[i].value });
            }

            return fArray;
        },

        writeFields: function (txt) {
            if (txt == undefined) {
                warnMe('Cookie non present');
                return false;
            }
            var t = txt.split('|'), i;

            for (i=0;i<t.length;i++) {
                $j('#' + t[i].split('&')[0]).val(t[i].split('&')[1]);
            }

        },

        FieldsToText: function (tArray) {
            var i,out = '';
            for (i=0;i<tArray.length;i++) { out = out + tArray[i].id + '&' + tArray[i].val + '|'; }
            return out;
        },

        cookie: function (action, nom, value, exdays) {
            /* Fonction de récupération du cookie */
            var c_get = function (nom) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    logMe('cookie get : ' + unescape(y));
                    if (x == nom) {
                        return unescape(y);
                    }
                }
                
                return undefined;
            };
            
            /* Fonction de'enregistrement du cookie */
            var c_set = function (nom, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = nom + "=" + c_value;
                logMe('cookie set : ' + c_value);
                return true;
            };
            
            switch (action) {
                case 'get':
                    return c_get(nom);
                    break;
                case 'set':
                    return c_set(nom, value, exdays);
                    break;
                default:
                    return undefined;
            }
            
        }
    }});

    /* ////
        CSV functions
        - Export array to csv (download !)
    */ ////
    _ZeExtend({ csv: {
        exp: function(obj) {
            var $a = obj.data;
            
            var o = {
                 separator: ',',
                 lineBreak: '\n',
                 name: 'default',
                 ext: 'csv'
            };
            
            o = _ZeLib.fn.extend(o, obj.options);
            
            if (!_ZeLib.fn.isArray($a)) { /* Verification de type */
                logMe('export csv : erreur ! obj.data n\'est pas un tableau !');
                return false;
            }
            
            // Set csv content to nothing
            var csvContent = ""
        
            for (i=0;i<$a.length;i++) {
                for(j=0;j<$a[i].length;j++) { csvContent += $a[i][j] + o.separator; }
                csvContent += o.lineBreak;
            }

            var uriContent = "data:application/octet-stream," + encodeURIComponent(csvContent);
            var myWindow = window.open(uriContent, o.name + '.' + o.ext);
            myWindow.focus();
            
            return true;
        }
    }});
    
    /* ////
        UI functions
        - create DOM element with options
            supported : div
        - table read/write
    */ ////
    _ZeExtend({ ui: {
        create: function (what, options) {
            var parent;
            if (options.parent) { parent = document.getElementById(options.parent); }
            
            var newdiv = document.createElement(what);
            newdiv.setAttribute('id', options.id);
            
            if (options.width) { newdiv.style.width = options.width; }
            if (options.height) { newdiv.style.height = options.height; }
            if (options.cssClass) { newdiv.className = options.cssClass; }
            if (options.parent) { parent.appendChild(newdiv); }
                else { document.body.appendChild(newdiv); }
        },
        
        table: _ZeLib.fn.tableau
    }});
    

    /* MATH UPDATE BEGIN HERE */

    // Add .process space
    _ZeExtend({ process: { }});
    
    // Add .mat space dedicated to matricial calc
    _ZeExtend({ mat: { }});
    
    /* Constants */
    _ZeLib.ONE_SQRT_2PI     =   0.3989422804014327;
    _ZeLib.LN_SQRT_2PI      =   0.9189385332046727417803297;
    _ZeLib.LN_SQRT_PId2     =   0.225791352644727432363097614947;
    _ZeLib.DBL_MIN          =   2.22507e-308;
    _ZeLib.DBL_EPSILON      =   2.220446049250313e-16;
    _ZeLib.SQRT_32          =   5.656854249492380195206754896838;
    _ZeLib.TWO_PI           =   6.283185307179586;
    _ZeLib.DBL_MIN_EXP      =   -999;
    _ZeLib.SQRT_2dPI        =   0.79788456080287;
    _ZeLib.LN_SQRT_PI       =   0.5723649429247;

    /* Add .statistics space */
    _ZeExtend({ statistics: {
        /* approx phi calc */
        /* from http://fr.wikipedia.org/wiki/Loi_normale#Approximation_de_la_fonction_de_r.C3.A9partition */
        phi: function (x) {
            var s = x,
                t = 0,
                b = x,
                q = x*x,
                i = 1;
                
            while(s != t) s=(t=s)+(b*=q/(i+=2));
            return 0.5 + s*Math.exp(-0.5*q - 0.91893853320467274178);
        },
        
        normalStdInverse: function (p) {
            /*
             * Lower tail quantile for standard normal distribution function.
             *
             * This function returns an approximation of the inverse cumulative
             * standard normal distribution function.  I.e., given P, it returns
             * an approximation to the X satisfying P = Pr{Z <= X} where Z is a
             * random variable from the standard normal distribution.
             *
             * The algorithm uses a minimax approximation by rational functions
             * and the result has a relative error whose absolute value is less
             * than 1.15e-9.
             *
             * Author:      Peter John Acklam
             * E-mail:      jacklam@math.uio.no
             * WWW URL:     http://home.online.no/~pjacklam/notes/invnorm/
             *
             * Javascript implementation by Liorzou Etienne
             * - Adapted from Dr. Thomas Ziegler's C implementation itself adapted from Peter's Perl version
             * 
             * Q: What about copyright?
             * A: You can use the algorithm for whatever purpose you want, but 
             * please show common courtesy and give credit where credit is due.
             * 
             * If you have any reclamation about this file (ie: normal.inverse.js file),
             * please contact me.
             * 
             */

            /* Coefficients in rational approximations. */
            var a =
                [
                    -3.969683028665376e+01,
                     2.209460984245205e+02,
                    -2.759285104469687e+02,
                     1.383577518672690e+02,
                    -3.066479806614716e+01,
                     2.506628277459239e+00
                ], 
                b =
                [
                    -5.447609879822406e+01,
                     1.615858368580409e+02,
                    -1.556989798598866e+02,
                     6.680131188771972e+01,
                    -1.328068155288572e+01
                ],
                c =
                [
                    -7.784894002430293e-03,
                    -3.223964580411365e-01,
                    -2.400758277161838e+00,
                    -2.549732539343734e+00,
                     4.374664141464968e+00,
                     2.938163982698783e+00
                ],
                d =
                [
                    7.784695709041462e-03,
                    3.224671290700398e-01,
                    2.445134137142996e+00,
                    3.754408661907416e+00
                ],
                LOW = 0.02425,
                HIGH = 0.97575;


            var ltqnorm = function (p) {
                var q, r;

                // errno = 0;

                if (p < 0 || p > 1)
                {
                    // errno = EDOM;
                    return 0.0;
                }
                else if (p == 0)
                {
                    // errno = ERANGE;
                    return Number.NEGATIVE_INFINITY; /* minus "infinity" */;
                }
                else if (p == 1)
                {
                    // errno = ERANGE;
                    return Number.POSITIVE_INFINITY; /* "infinity" */;
                }
                else if (p < LOW)
                {
                    /* Rational approximation for lower region */
                    q = Math.sqrt(-2*Math.log(p));
                    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
                        ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
                }
                else if (p > HIGH)
                {
                    /* Rational approximation for upper region */
                    q  = Math.sqrt(-2*Math.log(1-p));
                    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
                        ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
                }
                else
                {
                    /* Rational approximation for central region */
                        q = p - 0.5;
                        r = q*q;
                    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
                        (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
                }
            }
            
            return ltqnorm(p);
        },        
        
        normale: function(x, esp, ec) {
            var two_ecq = 2*ec*ec;
            var x_mesp = x - esp;
            return (1 / (ec * Math.sqrt(_ZeLib.TWO_PI))) * Math.exp(- x_mesp*x_mesp / two_ecq);
        },
        
        /* 
            Calc of q-quantiles from population p
        */
        quantile: function (population, q, method, withExtremities) {
            var k,
                p,
                q_quantile = [],
                m = [],
                q_re;
            
            // 1. Order population
            population.sort(_ZeLib.array.sort.dim());
            
            // 2. Length of population
            var N = population.length;
            
            // 3. Choice of method
            if (!method || method < 1 || method > 9) { method = 1; }
            
            // Definitions of methods
            m.push(function (p) { // Method 1
                var h = N * p + 1/2;
                
                if (p==0) { return population[0]; }
                
                return population[_ZeLib.ceiling(h - 1/2) - 1];
            });
            
            m.push(function (p) { // Method 2
                // KO
                var h = N * p + 1/2;
                
                if (p==0) { return population[0]; }
                if (p==1) { return population[N - 1]; }
                
                return (population[_ZeLib.math.ceiling(h - 1/2) - 1] + population[_ZeLib.math.floor(h + 1/2) - 1]) / 2;
            });
            
            m.push(function (p) { // Method 3
                // KO
                var h = N * p;
                
                if (p <= ((1/2)/N)) { return population[0]; }
                
                return population[_ZeLib.fn.roundNumber(h,0) - 1];
            });
            
            if (q > 100) { q = 100; }
            
            for (k = 0; k <= q; k++) {
                // Calc p
                p = k / q;
                q_quantile.push(m[method - 1](p));
            }
            
            if (withExtremities != true) {
                _length = q_quantile.length;
                q_re = q_quantile;
                q_quantile = [];
                
                for (k=1; k<_length - 1; k++) { q_quantile.push(q_re[k]); }
            }
            
            return q_quantile;
        },
        
        quantile_normale: function (q, withExtremities) {
            var i, out = [];
            
            for (i=0; i <= q; i++) {
                out.push(this.normalStdInverse(i/q));
            }
            
            if (withExtremities != true) {
                var length = out.length,
                    q_re = out;
                    
                out = [];
                
                for (k=1; k<length - 1; k++) { out.push(q_re[k]); }
            }
            
            return out;
        },
        
        qq_plot: function (opts) {
            if (opts.data == undefined) { error('no data for qq-plot !'); return false; }
            
            var arry = opts.data;
            
            var ec = _ZeLib.math.ecartType(arry),
                esp = _ZeLib.math.avg(arry),
                length = arry.length,
                arr_norm = [],
                min = _ZeLib.math.min(arry),
                max = _ZeLib.math.max(arry);
            
            
            
            // Merge opts and default
            opts = _ZeLib.extend(
            { // Default
                data:           opts.data,
                withReg:        true,
                withRegLabel:   false,
                id:             'qq-plot',
                title:          'qq-plot',
                nbPoints:       30,
                x: {
                    scaling: 'linear'
                },
                y: {
                    scaling: 'linear'
                }, 
                quantileMethod: 1
            },
            opts);
            
            
            // Draw graph
            _ZeLib.graphs.plot(
                _ZeLib.statistics.quantile_normale(opts.nbPoints, false),
                _ZeLib.statistics.quantile(arry, opts.nbPoints, opts.quantileMethod, false), 
                opts.id,
                { 
                    dataTitle: opts.title,
                    withReg: opts.withReg,
                    withRegLabel: opts.withRegLabel,
                    x: { scaling: opts.x.scaling },
                    y: { scaling: opts.y.scaling }
                }
            );
        }
    }});
    
    // Remap maths function to root of ZeLib
    // Tests
    _ZeLib.isFinite         = _ZeLib.isFinite;
     
    // Values
    _ZeLib.phi                  = _ZeLib.statistics.phi;
    _ZeLib.normale              = _ZeLib.statistics.normale;
    _ZeLib.normalStdInverse     = _ZeLib.statistics.normalStdInverse;
    
    // standard 
    _ZeLib.log10            = _ZeLib.math.log10;
    _ZeLib.min              = _ZeLib.math.min;
    _ZeLib.max              = _ZeLib.math.max;
    _ZeLib.floor            = _ZeLib.math.floor;
    _ZeLib.ceiling          = _ZeLib.math.ceiling;
    _ZeLib.fractional_part  = _ZeLib.math.fractional_part;
        
    // Data aggregate   
    _ZeLib.sum              = _ZeLib.math.sum;
    _ZeLib.avg              = _ZeLib.math.avg;
    _ZeLib.mediane          = _ZeLib.math.mediane;
    _ZeLib.variance         = _ZeLib.math.variance;
    _ZeLib.ecartType        = _ZeLib.math.ecartType;
    _ZeLib.regression       = _ZeLib.math.regression;
    
    // Normality    
    _ZeLib.repart           = _ZeLib.math.repart;
    _ZeLib.loiNormale       = _ZeLib.math.loiNormale;
    _ZeLib.isNormal         = _ZeLib.math.isNormal;
    // Statistics
    _ZeLib.quantile         = _ZeLib.statistics.quantile;
    
    // Process  
    _ZeLib.process.cpk      = _ZeLib.math.cpk;
    _ZeLib.process.cp       = _ZeLib.math.cp;
    _ZeLib.process.LCI      = _ZeLib.math.LCI;
    _ZeLib.process.LCS      = _ZeLib.math.LCS;
    
    // Drawing functions
    _ZeLib.plot             = _ZeLib.graphs.plot;
    _ZeLib.qq_plot          = _ZeLib.statistics.qq_plot;
    

    /* ////
        Add features to functions prototypes
        - Date         : dateAdd
        - String    : insertVar, trim, toArray, capitalize
        - Array     : toNumeric, toIndexedList
    */ ////
    Date.prototype.dateAdd = _ZeLib.dates.dateAddExtension;
    String.prototype.insertVar = _ZeLib.string.insertVar;
    String.prototype.trim = _ZeLib.string.trim;
    String.prototype.toArray = _ZeLib.string.toArray;
    String.prototype.capitalize = _ZeLib.string.capitalize;
    Array.prototype.toNumeric = _ZeLib.array.toNumeric;
    Array.prototype.toIndexedList = _ZeLib.array.toIndexedList;
    
    Number.prototype.roundNumber = _ZeLib.fn.numArr;
    
    if (!window.z) { window.z = _ZeLib; }
})();
