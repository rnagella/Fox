/**
 * @author Ranjith Kumar Nagella
 */
var win = Titanium.UI.currentWindow;
win.barColor='black';
win.layout = 'vertical';
var lb = Titanium.UI.createLabel({
	color : 'black',
	//top:10,

	layout : 'vertical'
	//text:'Register for a free account'

});
win.add(lb);
var view = Titanium.UI.createView({
});
var row1 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var row2 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var row3 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var row4 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var row5 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var row6 = Ti.UI.createTableViewRow({
	height : 'auto'
});
var FName = Titanium.UI.createTextField({
	hintText : 'First Name',
	layout : 'vertical',
	width : '300',
	height : 40,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,

});
var LName = Titanium.UI.createTextField({
	hintText : 'Last Name',
	layout : 'vertical',
	width : '300',
	height : 40,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,

});
var Email = Titanium.UI.createTextField({
	hintText : 'Email Address',
	layout : 'vertical',
	width : '300',
	height : 40,

	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
});

var cname = Titanium.UI.createTextField({
	hintText : 'Company Name',
	layout : 'vertical',
	width : '300',
	height : 40,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,

});

var passwd = Titanium.UI.createTextField({
	hintText : 'Password',
	layout : 'vertical',
	width : '300',
	height : 40,
	passwordMask : true,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
});

var cpasswd = Titanium.UI.createTextField({
	hintText : 'Confirm Password',
	layout : 'vertical',
	width : '300',
	height : 40,
	passwordMask : true,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,

});
row1.add(FName);
row2.add(LName);
row3.add(Email);
row4.add(cname);
row5.add(passwd);
row6.add(cpasswd);
var data = [row1, row2, row3, row4, row5, row6];
var table = Ti.UI.createTableView({
	data : data,
	//style: Ti.UI.iPhone.TableViewStyle.GROUPED
});
view.add(table);
win.add(view);
var btn = Ti.UI.createButton({
	title : 'Create Account',
	layout : 'vertical'
});
win.add(btn);

win.open();

