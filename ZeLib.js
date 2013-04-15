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
 */

/* Tiny fix for console */
(function() {
    if (!window.console) {
        window.console = {};
    }
    // union of Chrome, FF, IE, and Safari console methods
    var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
    // define undefined methods as noops to prevent errors
    for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function() { };
        }
    }
})();

(function() {
    if (jQuery == undefined) { throw 'jQuery was not detected !'; }
    if (Flotr == undefined) {
        console.log('Flotr2 was not dectected !');
        Flotr = function() { };
    }
    if (jQuery.tablesorter == undefined) { console.log('jQuery plugin \'tablesorter\' was not detected !'); }

    var ajaxQueue = jQuery({});

    var 
		core_toString = Object.prototype.toString,
		core_indexOf = Array.prototype.indexOf;

    function clnObj(objet_reference) {
        for (var i in objet_reference) {
            if (typeof objet_reference[i] == "object" && typeof objet_reference[i].src != "undefined") {
                //Object image
                this[i] = new Image();
                this[i].src = objet_reference[i].src;
            } else {
                if (typeof objet_reference[i] == "object" && typeof objet_reference[i].src == "undefined" && typeof objet_reference.length == "number") {
                    //Object Array
                    this[i] = new Array();
                    for (var j = 0; j < objet_reference[i].length; j++) { this[i][j] = new clnObj(objet_reference[i][j]); }
                } else {
                    if (typeof objet_reference[i] == "object") { /* Other Object */this[i] = new clnObj(objet_reference[i]); }
                    else { /* Not an Object */this[i] = objet_reference[i]; }
                }
            }
        }
    }

    var _ZeLib = {};

    _ZeLib.init = function() { logMe('I\'m ZeLib ! :)'); }

    _ZeLib.ui = {
        /* 	ZeLib can interact whith ui.
        Every interactions require jQuery */

        ajax: {
            alert: true, /* Par défaut n'affiche pas d'alert() en cas d'erreur */
            div: 'ajax-warn',
            label: 'ajax-warn-txt'
        }
    }

    _ZeLib.fx = {
        clone_object: {
            std: clnObj,
            j: function(obj) { return jQuery.extend(true, {}, obj); }
        },

        c: function(obj) { return this.clone_object.j(obj); }
    };

    _ZeLib.fn = {
        /* Retourne le type de l'argument */
        type: function(obj) {
            return (typeof obj).toString(); ;
        },

        /* Teste si l'argument est un tableau */
        isArray: function(obj) {
            if (typeof obj == typeof []) {
                return true;
            } else {
                return false;
            }
        },

        /* Teste si numérique */
        isNumeric: function(obj) {
            var numericExpression = _ZeLib.glob.reg.posNegInt;
            if (String(obj).match(numericExpression)) {
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
            for (i = 0; i < aArray.length; i++) { if (this.isNumeric(aArray[i]) == false) { return false; } }

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

        /* Test de parité */
        isPair: function(iValue) {
            if ((iValue / 2) == parseInt(iValue / 2)) { return true; } else { return false; }
        },

        /* Supprime les doublons d'un tableau */
        noDoublons: function(aArray) {
            aOut = [], i;
            for (i = 0; i < aArray.length; i++) { if (this.inArray(aArray[i], aOut) < 0) { aOut.push(aArray[i]); } }
            return aOut;
        },
        /* Fin des fonctions sur les nombres */

        /* Teste la présence de l'élément dans le tableau */
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
        },

        /* Envoie un message à l'utilisateur (Type E.T.-téléphone-maison) */
        logMe: function(msg) {
            console.log('ZeLib has a message for you : "' + msg + '"');
        },

        /* 'Jete' une erreur */
        error: function(msg) {
            var txt = 'ZeLib error : ';
            console.log(txt + msg);
            throw txt + msg;
            // throw new Error(msg);
        },

        warn: function(msg) {
            console.warn('ZeLib warning : ' + msg);
        }

    };

    if (!window.error) { window.error = _ZeLib.fn.error; }
    if (!window.logMe) { window.logMe = _ZeLib.fn.logMe; }
    if (!window.warnMe) { window.warnMe = _ZeLib.fn.warn; }

    _ZeLib.glob = {
        // Most used RegExp
        reg: {
            posInt: /^\d+$/,
            negInt: /^-\d+$/,
            posNegInt: /^-{0,1}\d*\.{0,1}\d+$/
        }
    };

    _ZeLib.tableau = {
        /* Read HTML Table */
        read: function(idTab) {
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

        /* Génère un tableau HTML */
        write: function(tID, cID, tArray /* , tHeaders, tClass */) {
            var i = 0,
				j = 0;

            var container = jQuery('#' + cID),
				tHeader = undefined, /* Textes des en-têtes */
				tClass = '', /* Classes CSS du tableau */
				table, /* tableau HTML */
				tbHeader, /* en-tete du tableau HTML */
				tbBody, /* corps du tableau HTML */
				tbTR, /* <tr> HTML */
				tbTD, /* <td> HTML */
				optTablesorter; /* Options pour le plugin tablesorter */

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

                for (i = 0; i < tHeader.length; i++) {
                    tbTR.append('<td>' + tHeader[i] + '</td>');
                }
            }

            /* Défini le body */
            table.append('<tbody></tbody>');
            tbBody = table.children('tbody');

            for (i = 0; i < tArray.length; i++) {
                tbBody.append('<tr></tr>');
                tbTR = jQuery(tbBody.children('tr')[i]);

                for (j = 0; j < tArray[i].length; j++) {
                    tbTR.append('<td>' + tArray[i][j] + '</td>');
                }
            }

            if (table.tablesorter != undefined) {
                /* Rends le tableau compatible avec tablesorter */
                if (!optTablesorter) {
                    optTablesorter = {
                        showProcessing: true,
                        widgets: ['stickyHeaders', 'filter'],
                        widgetOptions: {
                            stickyHeaders: "tablesorter-stickyHeader"
                        }
                    };
                } else {
                    if (!optTablesorter.showProcessing) {
                        optTablesorter.showProcessing = true;
                    }
                    if (!optTablesorter.widget) {
                        optTablesorter.widget = ['stickyHeaders', 'filter'];
                    }
                    if (!optTablesorter.widgetOptions) {
                        optTablesorter.widgetOptions = {
                            stickyHeaders: "tablesorter-stickyHeader"
                        };
                    } else {
                        if (!optTablesorter.widgetOptions.stickyHeaders) {
                            optTablesorter.widgetOptions.stickyHeaders = "tablesorter-stickyHeader";
                        }
                    }
                }
                table.tablesorter(optTablesorter);
            }

            /* Aplique les classes de style au tableau */
            table.addClass(tClass);
        }
    };

    _ZeLib.array = {
        sort: {
            dim: function(index) {
                return function(a, b) { return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1)); };
            }
        },

        getColumn: function(tArray, dim) {
            var a = new Array;
            for (i = 0; i < tArray.length; i++) {
                a.push(tArray[i][dim]);
            }
            return a;
        },

        filter: function(tArray, condition, dim) {
            /* condition -> value to be equal */
            var a = new Array;
            for (i = 0; i < tArray.length; i++) { if (tArray[i][dim] == condition) { a.push(tArray[i]); } }
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
                    for (i = 0; i < tArray.length; i++) { if (_ZeLib.fn.inArray(tArray[i], tOutput) < 0) { tOutput.push(tArray[i]); } }
                    break;
                case 2:
                    /* 2-dimensional */
                    /* Go ! (again) */
                    for (i = 0; i < tArray.length; i++) { if (_ZeLib.fn.inArray(tArray[i][dim], tOutput) < 0) { tOutput.push(tArray[i][dim]); } }
                    break;
                case 3, 4, 5, 6, 7, 8 /* usw ... */:
                default:
                    /* So... you want more ? Code it, please ! Thanks. */
                    break;
            }


            return tOutput;
        }
    };

    _ZeLib.url = {
        get: {
            param: {
                byName: function(name) {
                    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                    var regexS = "[\\?&]" + name + "=([^&#]*)";
                    var regex = new RegExp(regexS);
                    var results = regex.exec(window.location.search);
                    if (results == null)
                        return "";
                    else
                        return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
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
            for (i = 0; i < obj.length; i++) {
                if (_ZeLib.fn.inArray(obj[i].id, tAr) > -1) { error('Duplicate param name : `' + obj[i].id + '`'); } else { tAr.push(obj[i].id); };
            }

            param = param + obj[0].id + '=' + obj[0].value;

            if (obj.length > 1) {
                for (i = 1; i < obj.length; i++) {
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
    };

    _ZeLib.math = {
        loiNormale: function(value, esp, ect) {
            var tempExp,
				sqrt2pi = Math.sqrt(2 * Math.PI),
				fOut = 0;

            value = parseFloat(value);
            esp = parseFloat(esp);
            ect = parseFloat(ect);

            tempExp = -(value - esp) * (value - esp) / (2 * ect * ect);
            fOut = (1 / (ect * sqrt2pi)) * Math.exp(tempExp);

            return fOut;
        },

        min: function(aArray) {
            var i, min = parseFloat(aArray[0]);
            for (i = 0; i < aArray.length; i++) { if (parseFloat(aArray[i]) < min) { min = parseFloat(aArray[i]); } }
            return min;
        },

        max: function(aArray) {
            var i, max = parseFloat(aArray[0]);
            for (i = 0; i < aArray.length; i++) { if (parseFloat(aArray[i]) > max) { max = parseFloat(aArray[i]); } }
            return max;
        },

        moyenne: function(aArray) {
            var nbElem = 0, /* Nombre d'éléments dans le tableau */
			sum = 0, /* Somme de tous les éléments */
			i,
			arr = aArray.slice();

            if (!_ZeLib.fn.isSerie(arr)) {
                error('Le tableau n\'est pas une série (moyenne)');
            }

            nbElem = arr.length;

            /* Calcul de la moyenne */
            for (i = 0; i < arr.length; i++) { sum = parseFloat(sum) + parseFloat(arr[i]); }

            return parseFloat(sum) / parseFloat(nbElem);
        },

        mediane: function(aArray) {
            var i,
			nbElem,
			med,
			arr = aArray.slice();

            if (!_ZeLib.fn.isSerie(arr)) { error('Tableau n\'est pas une série'); }

            /* Tri du tableau */
            arr.sort();
            nbElem = arr.length;

            /* Calcul de la médianes */
            if (_ZeLib.fn.isPair(nbElem)) {
                med = this.moyenne([arr[(nbElem / 2) - 1], arr[((nbElem / 2) + 1) - 1]]);
            } else { med = arr[(nbElem - 1) / 2]; }

            return med;
        },

        variance: function(aArray) {
            var i,
			nbElem,
			fMoy,
			fVar,
			fTmp;

            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }

            nbElem = aArray.length;
            fMoy = parseFloat(this.moyenne(aArray));
            fVar = 0;
            for (i = 0; i < nbElem; i++) {
                fTmp = parseFloat(aArray[i]) - fMoy;
                fVar = parseFloat(fVar) + parseFloat(fTmp * fTmp);
            }

            fVar = parseFloat(fVar) / nbElem;

            return fVar;
        },

        ecartType: function(aArray) {
            var fEcTp,
			fVar;

            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (ecartType)'); }

            fVar = this.variance(aArray);
            fEcTp = Math.sqrt(fVar);
            return fEcTp;
        },

        /* Variance en % */
        variance_percent: function(aArray) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (R&R)'); }

            var max = this.max(aArray),
				min = this.min(aArray);
            stDev = this.variance(aArray);

            return parseFloat(100 * stDev / (max - min));
        },

        /* Calcul du CpK */
        cpk: function(aArray, tolMin, tolMax) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (CpK)'); }
            if (this.isNormal(aArray, 0)) {
                var cpkmin = parseFloat((this.moyenne(aArray) - tolMin) / (3 * this.ecartType(aArray))),
					cpkmax = parseFloat((tolMax - this.moyenne(aArray)) / (3 * this.ecartType(aArray)));
                return this.min([cpkmin, cpkmax]);
            } else {
                return '-';
            }
        },

        /* Calcul du Cp */
        cp: function(aArray, tolMin, tolMax) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Le tableau n\'est pas une série (CpK)'); }
            if (this.isNormal(aArray, 0)) {
                return parseFloat((tolMax - tolMin) / (6 * this.ecartType(aArray)));
            } else {
                return '-';
            }
        },

        /* Limites de controle à nbS ecart-types */
        LCI: function(aArray, nbS) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }
            if (!_ZeLib.fn.isNumeric(nbS)) { error('Variable non numerique'); }

            return this.moyenne(aArray) - nbS * this.ecartType(aArray);
        },

        /* Limites de controle à nbS ecart-types */
        LCS: function(aArray, nbS) {
            if (!_ZeLib.fn.isSerie(aArray)) { error('Tableau n\'est pas une série'); }
            if (!_ZeLib.fn.isNumeric(nbS)) { error('Variable non numerique'); }

            return this.moyenne(aArray) + nbS * this.ecartType(aArray);
        },

        isNormal: function(aArray, nbClasses /* Inutilisé pour l'instant */) {
            /*	Test de Kolgomorov-Smirnov */
            /*	Principe :
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

            sizeOf = aArray.length

            /* Calcul des fréquences */
            for (i = 0; i < sizeOf; i++) {
                pos = _ZeLib.fn.inArray(aArray[i], aFreq[0]);
                if (pos < 0) {
                    aFreq[0].push(aArray[i]);
                    aFreq[1].push(1);
                } else {
                    aFreq[1][pos] = aFreq[1][pos] + 1;
                }
            }

            for (i = 0; i < aFreq[1].length; i++) { aFreq[1][i] = aFreq[1][i] / sizeOf; }

            /* Calcul des fréquences théoriques */
            max = 0;
            for (i = 0; i < aFreq[0].length; i++) {
                aFreq[2][i] = this.loiNormale(
									aFreq[0][i],
									this.moyenne(aFreq[0]),
									this.ecartType(aFreq[0])) / aFreq[0].length;

                if (Math.abs(aFreq[2][i] - aFreq[1][i]) > max) { max = Math.abs(aFreq[2][i] - aFreq[1][i]); }
            }

            normal = false;

            if (sizeOf < 41) {
                /*	Table des valeurs critiques
                du test de Kolmogorov-Smirnov pour un échantillon
                pour une erreur à 5%
                N 	Valeur
                5	0.565
                6	0.52
                7	0.49
                8	0.46
                9	0.43
                10	0.41
                11	0.39
                12	0.38
                13	0.36
                14	0.35
                15	0.34
                16	0.33
                17	0.32
                18	0.31
                19	0.30
                20	0.29
                21	0.29
                22	0.28
                23	0.28
                24	0.27
                25	0.26
                26	0.26
                27	0.25
                28	0.25
                29	0.25
                30	0.24
                31	0.24
                32	0.23
                33	0.23
                34	0.23
                35	0.22
                36	0.22
                37	0.22
                38	0.22
                39	0.21
                40	0.21

					Equation de la courbe de tendance : 1.2349*max^(-0.48)
                Coeff R² = 0.9999
                */

                if (max > (1.2349 * Math.pow(sizeOf, -0.48))) { normal = false; } else { normal = true }
            } else {
                /* 	Pour sizeOf >= 40
                Les valeurs critiques du test sont déterminées par la formule :
                1.36 * racine (N)
                */

                if (max > (1.36 * Math.sqrt(sizeOf))) { normal = false; } else { normal = true }
            }

            return normal;
        }

    };

    _ZeLib.graphs = {
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
			init: function() { return _ZeLib.fx.clone_object.j(this); },

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

				for (i = 0; i < arg.data.length; i++) {
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

			init: function() { return _ZeLib.fx.clone_object.j(this); },

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
				arg.title	: 	titre du graphique
				arg.vertical:	array of values for vertical lines - format : [{data: val1, name:'nameOfLine'} (, {data: val2, name:'otherNameOfLine'}  (, ...))]
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
				for (i = 0; i < arg.data.length; i++) {
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
					for (i = 0; i < tTempArray.length; i++) { datArr.push([tTempArray[i], 0]); }
					for (i = 0; i < tArr.length; i++) {
						if (_ZeLib.fn.inArray(tArr[i], _ZeLib.array.getColumn(datArr, 0)) >= 0) {
							datArr[_ZeLib.fn.inArray(tArr[i], _ZeLib.array.getColumn(datArr, 0))][1]++;
						}
					}
					tTempArray = null;
					if (arg.min == undefined) { arg.min = _ZeLib.math.min(_ZeLib.array.getColumn(datArr, 0)); }
					if (arg.max == undefined) { arg.max = _ZeLib.math.max(_ZeLib.array.getColumn(datArr, 0)); }

				} else {
					for (i = 0; i < arg.div; i++) { datArr.push([min + i * ec, 0]); }
					for (i = 0; i < tArr.length; i++) { datArr[parseInt((tArr[i] - min) / ec)][1]++; }
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
					for (i = 0; i < arg.vertical.length; i++) {
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
		}
	};

	_ZeLib.dates = {
		// JJMMAAAA				- 8
		// JJ/MM/AAAA			- 10
		// JJ/MM/AAAA HH:MM:SS	- 19

		// Format FR
		defaultDateFormat: 'JJ/MM/AAAA HH:MM:SS',

		isJSDate: function(date) {
			return Object.prototype.toString.call(date) == '[object Date]';
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

		/* DO NOT USE AFTER 1.0-b.3 */
		dateCode2js: function(dCode) {
			warnMe('\'dateCode2js\' is obsolete !');
			var dD = parseInt(dCode.substring(0, 2), 10),
			dM = parseInt(dCode.substring(2, 4), 10),
			dY = parseInt(dCode.substring(4, 10), 10);
			var jsDate;
			jsDate = new Date(dY, dM - 1, dD);
			return jsDate;
		},

		/* DO NOT USE AFTER 1.0-b.3 */
		fr2js: function(frDate) {
			warnMe('\'fr2js\' is obsolete !');
			var frDate_j = parseInt(frDate.substring(0, 2), 10),
			frDate_m = parseInt(frDate.substring(3, 5), 10),
			frDate_a = parseInt(frDate.substring(6, 10), 10);
			var jsDate;

			jsDate = new Date(frDate_a, frDate_m - 1, frDate_j);

			return jsDate;
		},

		/* DO NOT USE AFTER 1.0-b.3 */
		fr2jstime: function(frDate) {
			warnMe('\'fr2jstime\' is obsolete !');
			var frDate_j = parseInt(frDate.substring(0, 2), 10),
			frDate_m = parseInt(frDate.substring(3, 5), 10),
			frDate_a = parseInt(frDate.substring(6, 10), 10),
			frDate_hh = parseInt(frDate.substring(11, 13), 10),
			frDate_mm = parseInt(frDate.substring(14, 16), 10),
			frDate_ss = parseInt(frDate.substring(17, 19), 10);
			var jsDate;

			jsDate = new Date(frDate_a, frDate_m - 1, frDate_j, frDate_hh, frDate_mm, frDate_ss);

			return jsDate;
		},

		diff: {
			inDays: function(d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000));
			},

			inWeeks: function(d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
			},

			inMonths: function(d1, d2) {
				var d1Y = d1.getFullYear();
				var d2Y = d2.getFullYear();
				var d1M = d1.getMonth();
				var d2M = d2.getMonth();

				return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
			},

			inYears: function(d1, d2) {
				return d2.getFullYear() - d1.getFullYear();
			}
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

		/* Retourne le numéro de semaine (ISO) */
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
		
		getMonth: function (value) {
			mois = parseInt(value, 10);
		
			var tab = [
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
		 
			value = tab[value - 1];
			
			return value;
		}
	};

	_ZeLib.string = {
		/* Supprime les espaces au début et à la fin d'une chaine */
		trim: function() {
			return this.replace(/^\s+/g, '').replace(/\s+$/g, '');
		},

		/* string to array */
		toArray: function(lSep /* line separator */, cSep /* column separator */, ignoreNullLines) {
			var me = this.toString();
			var tmpArray = me.split(lSep), i, tArray = new Array;

			if (ignoreNullLines == undefined) { ignoreNullLines = true; }

			for (i = 0; i < tmpArray.length; i++) {
				if ((tmpArray[i] != '' && ignoreNullLines) || (ignoreNullLines == false)) { tArray.push(tmpArray[i].split(cSep)); }
			}

			return tArray;
		},

		insertVar: function() {
			var func = function(me, arguments) {
				var i, reg, str;
				for (i = 0; i < arguments.length; i++) {
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
	};

	_ZeLib.ajax = {

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
				for (i = 0; i < param.length; i++) {
					if (param[i][0] == undefined || param[i][1] == undefined) {
						error('Parametre ' + parseInt(parseInt(i) + parseInt(1)) + ' invalide !\n' + param[i]);
						return false;
					} else {
						tData[i] = param[i][0] + ': "' + param[i][1] + '", ';
					}
				}

				cData = '{ ';

				for (i = 0; i < tData.length; i++) {
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
					/*	alert(msg); */
					$j('#' + _ZeLib.ui.ajax.div).hide();
					callback(msg);
					return msg.d;
				},
				failure: function(msg) {
					$j('#' + _ZeLib.ui.ajax.div).slideDown();
					$j('#' + _ZeLib.ui.ajax.label).html(msg);
					callback(msg);
					return false;
				},
				error: function(xhr, err) {
					if (xhr.responseText != undefined && _ZeLib.ui.ajax.alert) { var mess = jQuery.parseJSON(xhr.responseText).Message; if (mess != undefined) { alert(mess); } }
					$j('#' + _ZeLib.ui.ajax.div).slideDown();
					$j('#' + _ZeLib.ui.ajax.label).html(jQuery.parseJSON(xhr.responseText).Message);
					callback(xhr, err);
					return false;
				}
			});

			return output;
		}

	};

	_ZeLib.page = {
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
			var t = txt.split('#'), i;
			
			for (i=0;i<t.length;i++) {
				$j('#' + t[i].split('&')[0]).val(t[i].split('&')[1]);
			}
			
		},
		
		FieldsToText: function (tArray) {
			var i,out = '';
			for (i=0;i<tArray.length;i++) { out = out + tArray[i].id + '&' + tArray[i].val + '#'; }
			return out;
		},
		
		cookie: {
		/* Fonction de'enregistrement du cookie */
			set: function (nom, value, exdays) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
				document.cookie = nom + "=" + c_value;
			},
			
			/* Fonction de récupération du cookie */
			get: function (nom) {
				var i, x, y, ARRcookies = document.cookie.split(";");
				for (i = 0; i < ARRcookies.length; i++) {
					x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
					y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
					x = x.replace(/^\s+|\s+$/g, "");
					if (x == nom) {
						return unescape(y);
					}
				}
			}
		}
	};
	
	Date.prototype.dateAdd = _ZeLib.dates.dateAddExtension;
	String.prototype.insertVar = _ZeLib.string.insertVar;
	String.prototype.trim = _ZeLib.string.trim;
	String.prototype.toArray = _ZeLib.string.toArray;
	String.prototype.capitalize = _ZeLib.string.capitalize;

	if (!window.z) { window.z = _ZeLib; }
})();
