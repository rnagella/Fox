var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({
	title : 'Log In',
	url : 'login.js',
	layout : 'vertical',
	backgroundColor : '#fff'
});

var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'Login',
	window : win1
});

var win2 = Titanium.UI.createWindow({
	title : 'Sign Up',
	url : 'signup.js',
	backgroundColor : '#fff'
});

var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Sign Up',
	window : win2
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();
