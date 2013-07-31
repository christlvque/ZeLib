
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
