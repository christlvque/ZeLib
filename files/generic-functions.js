(function() {
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

		/* Teste si le tableau est une s�rie de nombres */
        isSerie: function(aArray) {
            var dim, i;

            /* Teste si l'argument est un tableau */
            if (!this.isArray(aArray)) { return false; }

            /* Obtient le nombre de dimensions du tableau */
            dim = this.getDimOfArray(aArray);
            if (dim != 1) { return false; }

            /* Verification que tous les �l�ments soient num�riques */
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

        /* Test de parit� */
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
		write: function(tID, cID, tArray /* , tHeaders, tClass */) {
            var i = 0,
				j = 0;

            var container = jQuery('#' + cID),
				tHeader = undefined, /* Textes des en-t�tes */
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

            /* D�termine si le conteneur existe */
            if (container == undefined) {
                error('le div conteneur n\'existe pas !');
                return false;
            }

            /* vide le conteneur */
            container.html('');

            /* D�termine si 'tID' est d�j� utilis� */
            if (jQuery('#' + tID).length > 0) {
                logMe('l\'ID utilis� pour le tableau existe d�j� !');
                return false;
            }

            /* D�termine si 'tArray' est un tableau javascript */
            if (jQuery.isArray(tArray) == false) {
                error('le parametre n\'est pas un tableau !');
                return false;
            }

            /* Determine si un tableau d'en-tete est pass� en parametre */
            if (tHeader) {
                if (jQuery.isArray(tHeader) == false) {
                    error('le parametre d\'en-tete n\'est pas un tableau !');
                    return false;
                }
            }

            /* D�fini la table */
            container.append('<table id="' + tID + '"></table>');
            table = jQuery('#' + tID);

            /* Si tHeader est d�fini */
            if (tHeader != undefined) {
                /* D�fini le header */
                table.append('<thead></thead>');
                tbHeader = table.children('thead');

                /* Ecriture des en-tete */
                tbHeader.append('<tr></tr>');
                tbTR = tbHeader.children('tr');

                for (i = 0; i < tHeader.length; i++) {
                    tbTR.append('<td>' + tHeader[i] + '</td>');
                }
            }

            /* D�fini le body */
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
	}});
})();