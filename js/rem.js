(function(win, doc) {
	function change() {
		doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 7.5 + 'px';
	}
	change();
	win.addEventListener('resize', change, false);
})(window, document);