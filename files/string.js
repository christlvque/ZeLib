
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
