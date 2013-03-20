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


(function () {
    var ajaxQueue = jQuery({});

    var _ZeLib = {
        /* Opérations sur les tableaux */
        tableau: {
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
        },

        /* Fonctions URL */
        url: {
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
                    },

                    dateD: function () {
                        var d = this.byName(URL_PAR.DATE_DEBUT)
                        if (d != '' && d != '') { d = d.substring(0, 2) + '/' + d.substring(2, 4) + '/' + d.substring(4, 10); } else { return false; }
                        return d;
                    },

                    dateF: function () {
                        var d = $g.url.get.param.byName(URL_PAR.DATE_FIN)
                        if (d != '' && d != '') { d = d.substring(0, 2) + '/' + d.substring(2, 4) + '/' + d.substring(4, 10); } else { return false; }
                        return d;
                    }
                }
            },

            redirect: function (thePage) {
                /* Ajout du hash pour conserver le parametre de langue */
                var lang = window.location.hash.split('/')[1];
                if (lang == undefined) { lang = 'fr'; }

                window.location.href = thePage + '#/' + lang;
            }
        },

        /* Fonctions Homepage */
        home: {
            go: {
                suivi_mesures: function () {
                    if (verifieDate() == false) { return false; }

                    saveInitPeriode();
                    setTimeout(ouvrirOverlay, 1);

                    redirect(
						AddParamUrl(
							'p/repMesures.aspx',
							document.getElementById('txtDateDebut').value,
							document.getElementById('txtDateFin').value,
							'', '', '', '', '', '', '', ''
						)
					);
                },

                suivi_mesure_v2: function () {
                    if (verifieDate() == false) { return false; }

                    saveInitPeriode();
                    setTimeout(ouvrirOverlay, 1);

                    redirect(
						AddParamUrl(
							'p/suivi_mesures.aspx',
							document.getElementById('txtDateDebut').value,
							document.getElementById('txtDateFin').value,
							'', '', '', '', '', '', '', ''
						)
					);
                },

                gest_postes: function () {
                    redirect('p/gest_postes.aspx');
                }
            }
        },

        /* Graphiques */
        graphs: {
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
                        showLabels: true,
                        tickFormatter: TickPareto
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
								Flotr._.clone(_lib.graphs.pareto.options),
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
                    HtmlText: false,
                    title: 'Temporel',
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

                    var i;
                    var datArr = new Array;

                    for (i = 0; i < arg.data.length; i++) {
                        datArr.push([arg.data[i][arg.cols.x], arg.data[i][arg.cols.y]]);
                    }
                    var container = document.getElementById(arg.cont);
                    var options = this.opt;
                    var d1 = datArr;
                    var graph_h;

                    // Draw graph with default options, overwriting with passed options
                    function drawGraph(opts) {
                        // Clone the options, so the 'options' variable always keeps intact.
                        o = Flotr._.extend(Flotr._.clone(options), opts || {});
                        // Return a new graph.
                        return Flotr.draw(container, [d1], o);
                    }

                    graph_h = drawGraph();

                    Flotr.EventAdapter.observe(container, 'flotr:select', function (area) {
                        // Draw selected area
                        graph_h = drawGraph({
                            xaxis: { min: area.x1, max: area.x2, mode: 'time', labelsAngle: 45 },
                            yaxis: { min: area.y1, max: area.y2 }
                        });
                    });
                    // When graph is clicked, draw the graph with default area.
                    Flotr.EventAdapter.observe(container, 'flotr:click', function () { graph_h = drawGraph(); });
                }
            },
			
			/* Graph de répartion des mesures */
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
                    selection: {
                        mode: 'x'
                    },
                    grid: {
                        verticalLines: false
                    },
                    HtmlText: false,
                    title: 'Repartition'
                },

                draw: function (arg) {
                    /*
                    arg.data    :   tableau de données
                    arg.cols    :   colonnes à utiliser, format : { x: 0 } [facultatif - par défaut { x: 0 }]
                    arg.cont    :   id du container
                    */

                    if (arg.cols == undefined) { arg.cols = { x: 0 }; }
                    if (arg.cont == undefined) { throw 'histo.draw: container not set'; }
                    if (arg.data == undefined) { throw 'histo.draw: no data'; }
                    if (arg.div == undefined || arg.div == 0) { arg.div = 10; }

                    Flotr.destroy();
                    var i;
                    var tArr = new Array;
                    for (i = 0; i < arg.data.length; i++) {
                        tArr.push(parseFloat(arg.data[i]));
                    }

                    var min = $$.math.min(tArr);
                    var max = $$.math.max(tArr);
                    var ec = (max - min) / (arg.div - 1);
                    var datArr = new Array;

                    this.opt.bars.barWidth = ec;
                    this.opt.xaxis.min = min - ec / 2;
                    this.opt.xaxis.max = max - ec / 2;

                    for (i = 0; i < arg.div; i++) {
                        datArr.push([min + i * ec, 0]);
                    }

                    for (i = 0; i < tArr.length; i++) {
                        datArr[parseInt((tArr[i] - min) / ec)][1]++;
                    }

                    var container = document.getElementById(arg.cont);
                    var options = this.opt;
                    var d1 = datArr;
                    var graph_r = undefined;

                    // Draw graph with default options, overwriting with passed options
                    function drawGraph(opts) {
                        // Clone the options, so the 'options' variable always keeps intact.
                        o = Flotr._.extend(Flotr._.clone(options), opts || {});
                        // Return a new graph.
                        return Flotr.draw(container, [d1], o);
                    }

                    graph_r = drawGraph();

                    Flotr.EventAdapter.observe(container, 'flotr:select', function (area) {
                        // Draw selected area
                        graph_r = drawGraph({
                            xaxis: { min: area.x1, max: area.x2, labelsAngle: 45 },
                            yaxis: { min: area.y1, max: area.y2 }
                        });
                    });
                    // When graph is clicked, draw the graph with default area.
                    Flotr.EventAdapter.observe(container, 'flotr:click', function () { graph_r = drawGraph(); });

                }
            }
        },

        /* Dates */
        dates: {
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
            dateAddExtention: function (p_Interval, p_Number) {
                var thing = new String();


                //in the spirt of VB we'll make this function non-case sensitive 
                //and convert the charcters for the coder. 
                p_Interval = p_Interval.toLowerCase();

                if (isNaN(p_Number)) {

                    //Only accpets numbers 
                    //throws an error so that the coder can see why he effed up     
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
            }
        },

        array: {
            sort: {
                dim: function (index) {
                    return function (a, b) { return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1)); };
                }
            }
        },

        ajax: {

            toArray: function (msg) {
                var tmpArray = msg.d.split('|&&'),
					i,
					tArray = new Array;

                for (i = 0; i < tmpArray.length - 1; i++) {
                    tArray[i] = tmpArray[i].split('|');
                }

                return tArray;
            },

            queue: function (ajaxOpts) {
                var oldComplete = ajaxOpts.complete;
                ajaxQueue.queue(function (next) {
                    ajaxOpts.complete = function () {
                        if (oldComplete) {
                            oldComplete.apply(this, arguments);
                        }
                        next();
                    };

                    jQuery.ajax(ajaxOpts);
                });
            }

        }
    }

    Date.prototype.dateAdd = _lib.dates.dateAddExtention;

    if (!window.z) { window.z = _ZeLib; }

})();
