(function() {
	/* Plugins detection */
    if (!window.jQuery) { throw 'jQuery was not detected !'; }
    if (!window.Flotr) {
        console.log('Flotr2 was not dectected !');
        Flotr = function() { };
    }
    if (jQuery.tablesorter == undefined) { console.log('jQuery plugin \'tablesorter\' was not detected !'); }


	/* Initial declaration */
	var _ZeLib = function () { console.log ('Hello, user !'); return true; };
	
	/* Use of jQuery.extend for adding new functions */
	var _ZeExtend = _ZeLib.ZeExtend = function (obj) {
		/* Deep copy of the object */
		var recursive = true;
		return jQuery.extend(recursive, _ZeLib, obj);
	};

	/* Hello world function */
	_ZeExtend({ init: function () { return _ZeLib.clone(_ZeLib); }});

	/* Default options */
	_ZeExtend({ options: {
		ajax: {
			divID: 'ajax-warn',
			labelID: 'ajax-warn-txt',
			showAlert: true
		},

		regex: {
			posInt: /^\d+$/,
            negInt: /^-\d+$/,
            posNegInt: /^-{0,1}\d*\.{0,1}\d+$/,
			posNegIntComma: /^-{0,1}\d*,{0,1}\d+$/
		}
	}});

	/* Log functions */
	_ZeExtend({ log: {
		/* Standart log */
		basic: function(msg) {
			console.log('ZeLib has a message for you : "' + msg + '"');
		},

		/* error */
		error: function(msg) {
			var txt = 'ZeLib error : ';
			console.log(txt + msg);
			throw txt + msg;
			// throw new Error(msg);
		},

		/* Warning*/
		warn: function(msg) {
			console.warn('ZeLib warning : ' + msg);
		}
	} });

	if (!window.error) { window.error = _ZeLib.log.error; }
    if (!window.logMe) { window.logMe = _ZeLib.log.basic; }
    if (!window.warnMe) { window.warnMe = _ZeLib.log.warn; }
	
})();