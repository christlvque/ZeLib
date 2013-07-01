
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
