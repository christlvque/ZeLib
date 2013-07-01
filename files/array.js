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
