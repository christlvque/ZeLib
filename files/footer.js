(function () {
  Date.prototype.dateAdd = _ZeLib.dates.dateAddExtension;
	String.prototype.insertVar = _ZeLib.string.insertVar;
	String.prototype.trim = _ZeLib.string.trim;
	String.prototype.toArray = _ZeLib.string.toArray;
	String.prototype.capitalize = _ZeLib.string.capitalize;

	if (!window.z) { window.z = _ZeLib; }
	
})();
