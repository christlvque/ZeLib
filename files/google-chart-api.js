	/* New ! begin supporting Google Chart API */
	/* Very beginning */
	_ZeExtend({ chart: function (type, data, opts) {
			var out = false;
			
			/* Implement Google Chart API */
			
			if (!window.google) { throw 'Google API not detected !'; return false; }
			else { _ZeLib.log.basic('Google API OK'); }
			
			switch(type) {
				case 'pareto':
				case 'barchart':
				{
					_ZeLib.log.basic('Chart type selected : ' + type);
					out = true;
					break;
				}
				default:
				{
					_ZeLib.log.warn('Unknown chart type : ' + type);
					break;
				}
			}
			
			return out;
			
		}	
	});
	
	