
  _ZeLib.dates = {
		// JJMMAAAA				- 8
		// JJ/MM/AAAA			- 10
		// JJ/MM/AAAA HH:MM:SS	- 19

		// Format FR
		defaultDateFormat: 'JJ/MM/AAAA HH:MM:SS',

		isJSDate: function(date) {
			return Object.prototype.toString.call(date) == '[object Date]';
		},
		
		toStringFR = function (d) {
			return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		},
	
		// >> JJ[/]MM[/]AAAA[ HH[:MM[:SS]]]
		toJSDate: function(dDate, dCode /* UNUSED */) {

			if (this.isJSDate(dDate)) { return dDate; }

			var d_day, d_month, d_year, d_hour, d_min, d_second;

			var date, time;

			// TODO : USE THIS ! :)
			if (dCode == undefined) {
				dCode = this.defaultDateFormat;
			}

			// SWITCH CASE POSITION OF ITEMS

			date = dDate.split(' ')[0];
			time = dDate.split(' ')[1];

			d_day = date.split('/')[0];
			d_month = date.split('/')[1];
			d_year = date.split('/')[2];

			if (time != undefined) {
				d_hour = time.split(':')[0];
				d_min = time.split(':')[1];
				d_second = time.split(':')[2];
			}

			if (d_month == undefined && d_day.length == 8) {
				d_year = d_day.substring(4, 10);
				d_month = d_day.substring(2, 4);
				d_day = d_day.substring(0, 2);
			}

			var check = false;

			// VERIFICATION OF DATE VALIDITY
			// ADD A NEW LINE TO ADD A NEW CHECK
			check = check || (d_day == undefined || d_day.length != 2);
			check = check || (d_month == undefined || d_month.length != 2);
			check = check || (d_year == undefined || d_year.length != 4);
			check = check || (d_hour != undefined && d_hour.length != 2);
			check = check || (d_min != undefined && d_min.length != 2);
			check = check || (d_second != undefined && d_second.length != 2);

			if (check) { return false; }
			// END CHECK

			d_day = parseInt(d_day, 10);
			d_month = parseInt(d_month, 10);
			d_year = parseInt(d_year, 10);

			if (d_hour != undefined) { d_hour = parseInt(d_hour, 10); } else { d_hour = 0; }
			if (d_min != undefined) { d_min = parseInt(d_min, 10); } else { d_min = 0; }
			if (d_second != undefined) { d_second = parseInt(d_second, 10); } else { d_second = 0; }

			var jsDate = new Date(d_year, d_month - 1, d_day, d_hour, d_min, d_second);
			//logMe(jsDate);
			return jsDate;
		},

		/* DO NOT USE AFTER 1.0-b.3 */
		dateCode2js: function(dCode) {
			warnMe('\'dateCode2js\' is obsolete !');
			var dD = parseInt(dCode.substring(0, 2), 10),
			dM = parseInt(dCode.substring(2, 4), 10),
			dY = parseInt(dCode.substring(4, 10), 10);
			var jsDate;
			jsDate = new Date(dY, dM - 1, dD);
			return jsDate;
		},

		/* DO NOT USE AFTER 1.0-b.3 */
		fr2js: function(frDate) {
			warnMe('\'fr2js\' is obsolete !');
			var frDate_j = parseInt(frDate.substring(0, 2), 10),
			frDate_m = parseInt(frDate.substring(3, 5), 10),
			frDate_a = parseInt(frDate.substring(6, 10), 10);
			var jsDate;

			jsDate = new Date(frDate_a, frDate_m - 1, frDate_j);

			return jsDate;
		},

		/* DO NOT USE AFTER 1.0-b.3 */
		fr2jstime: function(frDate) {
			warnMe('\'fr2jstime\' is obsolete !');
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
			inSeconds: function (d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1),10);
			},


			inDays: function(d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000));
			},

			inWeeks: function(d1, d2) {
				var t2 = d2.getTime();
				var t1 = d1.getTime();

				return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
			},

			inMonths: function(d1, d2) {
				var d1Y = d1.getFullYear();
				var d2Y = d2.getFullYear();
				var d1M = d1.getMonth();
				var d2M = d2.getMonth();

				return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
			},

			inYears: function(d1, d2) {
				return d2.getFullYear() - d1.getFullYear();
			}
		},

		dateAddExtension: function(p_Interval, p_Number) {
			var thing = new String();
			p_Interval = p_Interval.toLowerCase();

			if (isNaN(p_Number)) {
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
		},

		/* Retourne le numéro de semaine (ISO) */
		numSem: function(aaaa, mm, jj) {
			var maDate;

			if (mm != undefined) {
				mm = mm - 1;
				MaDate = new Date(aaaa, mm, jj);
			} else if (this.isJSDate(aaaa)) {
				MaDate = aaaa;
				jj = MaDate.getDate();
				mm = MaDate.getMonth();
				aaaa = MaDate.getFullYear();
			} else {
				error('Date non valide');
				return false;
			}

			var annee = MaDate.getFullYear(),
			NumSemaine = 0,
			ListeMois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
			TotalJour = 0,
			JourDebutAn;

			if (annee % 4 == 0 && annee % 100 != 0 || annee % 400 == 0) { ListeMois[1] = 29 };
			for (cpt = 0; cpt < mm; cpt++) { TotalJour += ListeMois[cpt]; }

			TotalJour += jj;
			DebutAn = new Date(annee, 0, 1);
			JourDebutAn = DebutAn.getDay();

			if (JourDebutAn == 0) { JourDebutAn = 7 };

			TotalJour -= 8 - JourDebutAn;
			NumSemaine = 1;
			NumSemaine += Math.floor(TotalJour / 7);

			if (TotalJour % 7 != 0) { NumSemaine += 1 };
			if (JourDebutAn > 4) { NumSemaine -= 1 };
			if (NumSemaine == 0) { NumSemaine = 53 };

			return (NumSemaine);
		},

		getMonth: function (value) {
			mois = parseInt(value, 10);

			var tab = [
				'Janvier',
				'Fevrier',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Aout',
				'Septembre',
				'Octobre',
				'Novembre',
				'Décembre'
			];

			value = tab[value - 1];

			return value;
		}
	};
