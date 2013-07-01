
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
					warnMe('Erreur ajax : \n"' + jQuery.parseJSON(xhr.responseText).Message + '"\n\ncallback function :\n' + eval(callback));
					callback(xhr, err);
					return false;
				}
			});

			return output;
		}

	};
