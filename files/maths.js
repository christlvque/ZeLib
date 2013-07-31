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