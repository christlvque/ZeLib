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
	Required :
	- jQuery 1.8.0+ (http://jquery.com) [ jQuery ;) ]	//TODO : Remove jQuery references
	- Flotr2 (http://www.humblesoftware.com/flotr2/) [ graphs ]
	[ should be optional but recommended : - TableSorter 2.0 (http://tablesorter.com), a jQuery plugin ]
	
	-------------
	
	Change log :
	
	v. 1.0-b.2
		- Description translated in english
		- New functions organisation
		- Add toArray() String prototype
		- Fix bug on trim() function
	
	v. 1.0-b.1
		- Added jQuery, Flotr and tablesorter detection - just throw an error, nothing else !
	
	v. 1.0-b.0
		- Add fn object
		- Add math object
		
	v. 1.0-a
		- First public release
	
	-------------
	
	
*/

 
/*
	JS Library for common functions
	-------------
	
	
	* HTML Table :
		- 'Convert' a JS Array into a html table (Array)
			//TODO : make tableSorter2 optional
		- Load a html table inside a JS Array
	* JS Array
		- Sort a multidimensional Array by one dimension
		- return one column of a 2-dimensional array
	* URLs :
		- get parameters by id
		- JS redirection
	* Charts & Graphs :
		- Pareto
		- time repartition
			//TODO : fix xaxis -> show date-time values
			//TODO : fix negatives values (bug ???)
		- values repartition
			//TODO : fix bug when multiple redraw
			//TODO : add option to draw vertical line
	* Dates
			//TODO : Group date convert functions
		- Convert date from "JJMMAAAA" to JS date format
		- Convert date from "JJ/MM/AAAA" to JS date format
		- convert date from "JJ/MM/AAAA HH:MM:SS" to JS date format
		- Calculate date difference in days, weeks, months or years
		- Add a time interval to a JS date
		- Get ISO week number 
	* Strings
	    - Add equivalent to 'Trim' VB-function
		- Return a JS array from a string
			//TODO : Add options
	* Ajax
		- Queue ajax request
			//TODO : Add clear queue option
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
	* Maths
		- loiNormale
		- min
		- max
		- moyenne
		- medianne
		- variance
		- ecartType
		- variance_percent
		- cpk
		- LCI
		- LCS
		- isNormal
			//TODO: investigate about random false results
			
			
	//GLOBAL TODO
		- improve documentation & comments !!
 */
 


(function () {
	if (jQuery == undefined) { throw 'jQuery was not detected !'; }
	if (Flotr == undefined) { throw 'Flotr2 was not dectected !'; }
	if (jQuery.tablesorter == undefined) { console.log('jQuery plugin \'tablesorter\' was not detected !'); }
	
    var ajaxQueue = jQuery({});
		
    var _ZeLib = {};
		
	_ZeLib.tableau = {
		/* Lit le tableau HTML */
		read: function (idTab) {
			var $table = jQuery('#' + idTab),
				$headerCells = $table.find("thead th"),
				$rows = $table.find("tbody tr"),
				headers = [],
				rows = [];

			$headerCells.each(function (k, v) {
				headers[headers.length] = jQuery(this).text();
			});

			$rows.each(function (row, v) {
				jQuery(this).find("td").each(function (cell, v) {
					if (typeof rows[row] === 'undefined') rows[row] = [];
					rows[row][cell] = jQuery(this).text();
				});
			});

			return rows;
		},

		/* Génère un tableau HTML */
		write: function (tID, cID, tArray /* , tHeaders, tClass */) {
			var i = 0,
				j = 0;

			var container = jQuery('#' + cID),
				tHeader = undefined, /* Textes des en-têtes */
				tClass = '', /* Classes CSS du tableau */
				table, /* tableau HTML */
				tbHeader, /* en-tete du tableau HTML */
				tbBody, /* corps du tableau HTML */
				tbTR, /* <tr> HTML */
				tbTD; /* <td> HTML */

			/* Gestion des parametres facultatifs */
			if (arguments[3]) { tHeader = arguments[3]; }
			if (arguments[4]) { tClass = arguments[4]; }

			/* Détermine si le conteneur existe */
			if (container == undefined) {
				alert('le div conteneur n\'existe pas !');
				return false;
			}

			/* vide le conteneur */
			container.html('');

			/* Détermine si 'tID' est déjà utilisé */
			if (jQuery('#' + tID).length > 0) {
				alert('l\'ID utilisé pour le tableau existe déjà !');
				return false;
			}

			/* Détermine si 'tArray' est un tableau javascript */
			if (jQuery.isArray(tArray) == false) {
				alert('le parametre n\'est pas un tableau !');
				return false;
			}

			/* Determine si un tableau d'en-tete est passé en parametre */
			if (tHeader) {
				if (jQuery.isArray(tHeader) == false) {
					alert('le parametre d\'en-tete n\'est pas un tableau !');
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


			/* Rends le tableau compatible avec tablesorter */
			table.tablesorter({
				showProcessing: true,
				widgets: ['stickyHeaders', 'filter'],
				widgetOptions: {
					stickyHeaders: "tablesorter-stickyHeader"
				}
			});

			/* Aplique les classes de style au tableau */
			table.addClass(tClass);
		}
	};
	
	_ZeLib.array = {
		sort: {
			dim: function (index) {
				return function (a, b) { return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1)); };
			}
		},
		
		getColumn: function (tArray, dim) {
			var a = new Array;
			for (i = 0; i < tArray.length; i++) {
				a.push(tArray[i][dim]);
			}
			return a;
		}
	};
		
	_ZeLib.url = {
		get: {
			param: {
				byName: function (name) {
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

		redirect: function (thePage) {
			/* Ajout du hash pour conserver le parametre de langue */
			var lang = window.location.hash.split('/')[1];
			if (lang == undefined) { lang = 'fr'; }

			window.location.href = thePage + '#/' + lang;
		}
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
			var numericExpression = /^(-|[0-9]|\.)+$/;
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
			if (this.isNumeric(rnum) == false) {
				return rnum; }
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
		inArray: function(elem, arr, i) {
			var len;

			if (arr) {
				if (core_indexOf) {
					return core_indexOf.call(arr, elem, i);
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

				for (; i < len; i++) {
					// Skip accessing in sparse arrays
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}

			return -1;
		},

		/* Envoie un message à l'utilisateur (Type E.T.-téléphone-maison) */
		alert: function(msg) {
			console.log('Message stats.js : \n' + msg);
		},

		/* 'Jete' une erreur */
		error: function(msg) {
			console.log('Erreur stats.js : \n' + msg);
			throw 'Erreur stats.js : \n' + msg;
			// throw new Error(msg);
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
		
		min: function (aArray) {
			var i, min = aArray[0];
			for (i=0;i<aArray.length;i++) { if (aArray[i] < min) { min = aArray[i]; } }
			return min;
		},
		
		max: function (aArray) {
			var i, max = aArray[0];
			for (i=0;i<aArray.length;i++) { if (aArray[i] > max) { max = aArray[i]; } }
			return max;
		},
				
		moyenne: function(aArray) {
			var nbElem = 0, /* Nombre d'éléments dans le tableau */
			sum = 0, /* Somme de tous les éléments */
			i;

			if (!_ZeLib.fn.isSerie(aArray)) {
				_ZeLib.fn.error('Le tableau n\'est pas une série (moyenne)');
			}

			nbElem = aArray.length;

			/* Calcul de la moyenne */
			for (i = 0; i < aArray.length; i++) { sum = parseFloat(sum) + parseFloat(aArray[i]); }

			return parseFloat(sum) / parseFloat(nbElem);
		},

		mediane: function(aArray) {
			var i,
			nbElem,
			med;

			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Tableau n\'est pas une série'); }

			/* Tri du tableau */
			aArray.sort();
			nbElem = aArray.length;

			/* Calcul de la médianes */
			if (_ZeLib.fn.isPair(nbElem)) {
				med = this.moyenne([aArray[(nbElem / 2) - 1], aArray[((nbElem / 2) + 1) - 1]]);
			} else { med = aArray[(nbElem - 1) / 2]; }

			return med;
		},

		variance: function(aArray) {
			var i,
			nbElem,
			fMoy,
			fVar,
			fTmp;

			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Tableau n\'est pas une série'); }

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

			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Le tableau n\'est pas une série (ecartType)'); }

			fVar = this.variance(aArray);
			fEcTp = Math.sqrt(fVar);
			return fEcTp;
		},
		
		/* Variance en % */
		variance_percent: function (aArray) {
			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Le tableau n\'est pas une série (R&R)'); }
			
			var max = this.max(aArray),
				min = this.min(aArray);
				stDev = this.variance(aArray);
				
			return parseFloat(100 * stDev/(max-min));
		},
		
		/* Calcul du CpK */
		cpk: function (aArray, tolMin, tolMax) {
			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Le tableau n\'est pas une série (CpK)'); }
			if (this.isNormal(aArray,0)) {
				var cpkmin = parseFloat((this.moyenne(aArray) - tolMin) / (3 * this.ecartType(aArray))),
					cpkmax = parseFloat((tolMax - this.moyenne(aArray)) / (3 * this.ecartType(aArray)));
				return this.min([cpkmin,cpkmax]);
			} else {
				return '-';
			}
		},

		/* Limites de controle à nbS ecart-types */
		LCI: function(aArray, nbS) {
			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Tableau n\'est pas une série'); }
			if (!_ZeLib.fn.isNumeric(nbS)) { _ZeLib.fn.error('Variable non numerique'); }

			return this.moyenne(aArray) - nbS * this.ecartType(aArray);
		},

		/* Limites de controle à nbS ecart-types */
		LCS: function(aArray, nbS) {
			if (!_ZeLib.fn.isSerie(aArray)) { _ZeLib.fn.error('Tableau n\'est pas une série'); }
			if (!_ZeLib.fn.isNumeric(nbS)) { _ZeLib.fn.error('Variable non numerique'); }

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
		
			var aFreq = [[],[],[]], /* Tableau des fréquences */
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
					aFreq[1][pos] = aFreq[1][pos]+1;
				}
			}

			for (i = 0; i < aFreq[1].length; i++) { aFreq[1][i] = aFreq[1][i] / sizeOf; }

			/* Calcul des fréquences théoriques */
			max = 0;
			for(i=0;i<aFreq[0].length;i++) {
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
				
				if (max > (1.2349 * Math.pow(sizeOf,-0.48))) { normal = false; } else { normal = true }
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
                        showLabels: true
                    },
                    xaxis: {
                        autoscale: true
                    },
                    legend: {
                        position: 'se',
                        backgroundColor: '#fff'
                    }
                },

                /* Dessine le graph */
                draw: function (id, dArray, tFormat, opts) {

                    function internal_draw_pa(id, dArray, tFormat, opts) {
                        var o = Flotr._.extend(
								Flotr._.clone(_ZeLib.graphs.pareto.options),
								opts || {});

                        oM = { mouse: { track: true, relative: true, trackFormatter: tFormat} };
                        o = Flotr._.extend(
									Flotr._.clone(o),
									oM || {});

                        var graph_c = document.getElementById(id);

                        return Flotr.draw(graph_c, [{
                            data: dArray,
                            label: 'Pareto',
                            markers: {
                                show: true,
                                position: 'rm',
                                fontSize: 9,
                                labelFormatter: tFormat,
                                horizontal: true
                            }
                        }], o);
                    }

                    if (!tFormat) { tFormat = function (obj) { return 'x=' + obj.x + ' y=' + obj.y; }; }

                    internal_draw_pa(id, dArray, tFormat, opts);

                    Flotr.EventAdapter.observe(graph_c, 'flotr:select', function (area) {
                        graph = internal_draw_pa(id, dArray, tFormat, {
                            xaxis: { autoscale: true },
                            yaxis: { min: area.y1, max: area.y2, autoscaleMargin: 1, showLabels: true /*, tickFormatter: TickPareto */ }
                        });
                    });

                    Flotr.EventAdapter.observe(graph_c, 'flotr:click', function () { internal_draw_pa(id, dArray, tFormat); });
                }
            },

			/* Graph de répartion temporelle */
            histo: {
                opt: {
                    xaxis: {
                        mode: 'time',
                        labelsAngle: 45
                    },
                    yaxis: {
                        autoscale: true,
                        autoscaleMargin: 5
                    },
                    selection: {
                        mode: 'x'
                    },
					legend : {
						position : 'ne'
					},
                    HtmlText: false,
                    mouse: {
                        track: true,
                        relative: true
                    }
                },

                draw: function (arg) {
                    /*
                    arg.data    :   tableau de données
                    arg.cols    :   colonnes à utiliser, format : { x: 2, y: 0 } [facultatif - par défaut { x: 0, y: 1 }]
                    arg.cont    :   id du container
                    */

                    if (arg.cols == undefined) { arg.cols = { x: 0, y: 1 }; }
                    if (arg.cont == undefined) { throw 'histo.draw: container not set'; }
                    if (arg.data == undefined) { throw 'histo.draw: no data'; }
					if (arg.title == undefined) { arg.title = 'Serie 1'; }
					if (arg.timeProportional == undefined) { arg.timeProportional = true; }
                    var i;
                    var datArr = new Array;

                    for (i = 0; i < arg.data.length; i++) {
						if (arg.timeProportional == false) {
							datArr.push([i, arg.data[i][arg.cols.y]]);
						} else {
							datArr.push([arg.data[i][arg.cols.x], arg.data[i][arg.cols.y]]);
						}
                    }
                    var container = document.getElementById(arg.cont);
                    var options = this.opt;
                    var d1 = datArr;
                    var graph_h;

                    options.xaxis.margin = 30;
					options.mouse.trackFormatter = function (t) { return arg.data[parseInt(t.x,10)][arg.cols.x] + ' - ' + t.y; }
					if (arg.timeProportional == false) {
						options.xaxis.mode = 'normal';
					}
                    // Draw graph with default options, overwriting with passed options
                    function drawGraph(opts) {
                        // Clone the options, so the 'options' variable always keeps intact.
                        o = Flotr._.extend(Flotr._.clone(options), opts || {});
                        // Return a new graph.
                        return Flotr.draw(container, [{data: d1, label: arg.title}], o);
                    }

                    graph_h = drawGraph();

                    Flotr.EventAdapter.observe(container, 'flotr:select', function (area) {
                        // Draw selected area
                        graph_h = drawGraph({
                            xaxis: { min: area.x1, max: area.x2, mode: 'time', labelsAngle: 45, margin: 30 },
                            yaxis: { min: area.y1, max: area.y2 }
                        });
                    });
                    // When graph is clicked, draw the graph with default area.
                    Flotr.EventAdapter.observe(container, 'flotr:click', function () { graph_h = drawGraph(); });
                }
            },
			
			/* Graph de répartion de valeurs */
            repart: {
                opt: {
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
                        trackFormatter: function (t) { return parseInt(t.y, 10); }
                    },
                    yaxis: {
                        min: 0,
                        autoscaleMargin: 1
                    },
                    xaxis: {
                        labelsAngle: 45
                    },
					legend : {
						position : 'ne'
					},
                    selection: {
                        mode: 'x'
                    },
                    grid: {
                        verticalLines: false
                    },
                    HtmlText: false
                },

                draw: function (arg) {
					//TODO : fix bug when multiple redraw
					//TODO : add option to draw vertical line
                    /*
						arg.data    :   tableau de données
						arg.cols    :   colonnes à utiliser, format : { x: 0 } [facultatif - par défaut { x: 0 }]
						arg.cont    :   id du container
						arg.title	: 	titre du graphique
						arg.vertical:	array of values for vertical lines - formart : [{data: val1, name:'nameOfLine'} (, {data: val2, name:'otherNameOfLine'}  (, ...))]
                    */
					var withVert = true;
					
                    if (arg.cols == undefined) { arg.cols = { x: 0 }; }
                    if (arg.cont == undefined) { throw 'histo.draw: container not set'; }
                    if (arg.data == undefined) { throw 'histo.draw: no data'; }
                    if (arg.div == undefined || arg.div == 0) { arg.div = 10; }
					if (arg.title == undefined) { arg.title = 'Serie 1'; }
					if (arg.vertical == undefined) { withVert = false; }
					
                    //Flotr.destroy();
                    var i;
                    var tArr = new Array;
                    for (i = 0; i < arg.data.length; i++) {
                        tArr.push(parseFloat(arg.data[i]));
                    }

                    var min = $$.math.min(tArr);
                    var max = $$.math.max(tArr);
                    var ec = (max - min) / (arg.div - 1);
                    var datArr = new Array;                    

                    for (i = 0; i < arg.div; i++) {
                        datArr.push([min + i * ec, 0]);
                    }

                    for (i = 0; i < tArr.length; i++) {
                        datArr[parseInt((tArr[i] - min) / ec)][1]++;
                    }

                    var container = document.getElementById(arg.cont);
                    container.innerHTML = '';
                    
                    var options = this.opt;
                    var d1 = datArr;
					
					options.yaxis.min = 0;
					options.yaxis.max = _ZeLib.math.max(_ZeLib.array.getColumn(d1,1))*(1.1);
					
					options.bars.barWidth = ec;
                    options.xaxis.min = min - ec / 2;
                    options.xaxis.max = max - ec / 2;
					options.xaxis.margin = 30;
					
					var dataArray = [{data: d1, label: arg.title}];
					
					var vertValue, vertName;
					/* Ajout des lignes verticales */
					if (withVert == true) {
						for (i=0;i<arg.vertical.length;i++) {
							vertValue = arg.vertical[i].data;
							vertName = arg.vertical[i].name;
							
							dataArray.push({data: [[vertValue, -1],[vertValue, 1000000]], label: vertName, lines: {show: true}, bars: {show: false}});
						}
					}
					
                    // Draw graph with default options, overwriting with passed options
                    function drawGraph(opts) {
                        // Clone the options, so the 'options' variable always keeps intact.
                        o = Flotr._.extend(Flotr._.clone(options), opts || {});
                        // Return a new graph.
                        Flotr.draw(container, dataArray, o);
                    }

                    drawGraph();

                    Flotr.EventAdapter.observe(container, 'flotr:select', function (area) {
                        // Draw selected area
                        drawGraph({
                            xaxis: { min: area.x1, max: area.x2, labelsAngle: 45, margin: 30 },
                            yaxis: { min: area.y1, max: area.y2 }
                        });
                    });
                    // When graph is clicked, draw the graph with default area.
                    Flotr.EventAdapter.observe(container, 'flotr:click', function () { drawGraph(); });

                }
            }
	};

    _ZeLib.dates = {
		dateCode2js: function (dCode) {
			var dD =  parseInt(dCode.substring(0, 2),10),
				dM =  parseInt(dCode.substring(2, 4),10),
				dY =  parseInt(dCode.substring(4, 10),10);
			var jsDate;
			jsDate = new Date(dY, dM - 1, dD);
			return jsDate;
		},
		
		fr2js: function (frDate) {
			var frDate_j = parseInt(frDate.substring(0, 2), 10),
				frDate_m = parseInt(frDate.substring(3, 5), 10),
				frDate_a = parseInt(frDate.substring(6, 10), 10);
			var jsDate;

			jsDate = new Date(frDate_a, frDate_m - 1, frDate_j);

			return jsDate;
		},
		
		fr2jstime: function (frDate) {
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
			inDays: function (d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000));
			},

			inWeeks: function (d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
			},

			inMonths: function (d1, d2) {
				var d1Y = d1.getFullYear();
				var d2Y = d2.getFullYear();
				var d1M = d1.getMonth();
				var d2M = d2.getMonth();

				return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
			},

			inYears: function (d1, d2) {
				return d2.getFullYear() - d1.getFullYear();
			}
		},
		
		dateAddExtension: function (p_Interval, p_Number) {
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
		numSem: function (aaaa, mm, jj) {
			mm = mm - 1;
			var MaDate = new Date(aaaa, mm, jj),
				annee = MaDate.getFullYear(),
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
		}
	};
	
	_ZeLib.string = {
		/* Supprime les espaces au début et à la fin d'une chaine */
		trim: function () {
			return this.replace(/^\s+/g, '').replace(/\s+$/g, '');
		},
		
		/* string to array */
		toArray: function (lSep /* line separator */, cSep /* column separator */) {
			var me = this.toString();
			var tmpArray = me.split(lSep), i, tArray = new Array;

			for (i = 0; i < tmpArray.length; i++) {
				tArray[i] = tmpArray[i].split(cSep);
			}

			return tArray;
		}
	};

	_ZeLib.ajax = {
	
		/*
			queue ajax
			-- Make ajax become synchrone !
			-- Not in Javascript spirit, but can be useful.
		*/
		queue: function (ajaxOpts) {
			var oldComplete = ajaxOpts.complete;
			ajaxQueue.queue(function (next) {
				ajaxOpts.complete = function () {
					if (oldComplete) {oldComplete.apply(this, arguments);}
					next();
				};

				jQuery.ajax(ajaxOpts);
			});
		}

	};

    Date.prototype.dateAdd = _ZeLib.dates.dateAddExtension;
	String.prototype.trim = _ZeLib.string.trim;
	String.prototype.toArray = _ZeLib.string.toArray;
	
	if (!window.z) { window.z = _ZeLib; }
})();
