/**
 * @author Ranjith Kumar Nagella
 */
/*
var Paint = require('ti.paint');

var win = Ti.UI.createWindow({
	backgroundColor : '#fff',
	layout : 'vertical'
});
var reject = Titanium.UI.createButton({
	title : 'Reject',
	style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED

});

var accept = Titanium.UI.createButton({
	title : 'Accept',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE

});
var spacer = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
})
var toolbar = Titanium.UI.iOS.createToolbar({

	items : [accept, spacer, reject]
})
win.add(toolbar);

reject.addEventListener('click', function() {
	alert('yes');
	win.close();

});

var paintView = Paint.createPaintView({
	right : 0,
	left : 0,
	// strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
	strokeColor : '#0f0',
	strokeAlpha : 150,
	strokeWidth : 5,
	eraseMode : false
});
win.add(paintView);
accept.addEventListener('click', function() {
	alert('accept');

	win.close();

});

win.open();

*/