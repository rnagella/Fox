/**
 * @author rnagella
 */
var win = Titanium.UI.currentWindow;
win.barColor = 'black';
var header = Titanium.UI.createLabel({
	text : 'Access your existing account',
	top : 10, // In  vertivcal view if you say top as 10 it is top to the previous element
	width : 'auto',
	font : {
		fontWeight : 'bold',
		fontSize : 18
	}
});

//creating a login form
var accountNoLbl = Titanium.UI.createLabel({
	text : 'Account Number',
	top : 10,
	font : {
		fontSize : 15,
	}
});

var accountNoTxtFld = Ti.UI.createTextField({
	width : 300,
	top : 10,
	height : 40,
	font : {
		fontSize : 15,
	},
	hintText : 'Account Number',
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

});

var pwdLbl = Titanium.UI.createLabel({
	text : 'Password',
	top : 10,
	font : {
		fontSize : 15,
	}
});

var pwdTxtFld = Ti.UI.createTextField({
	top : 10,
	font : {
		fontSize : 15,
	},
	width : 300,
	height : 40,
	hintText : 'Password',
	passwordMask : true,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

});

var lgnBtn = Ti.UI.createButton({
	title : 'Login',
	color : 'black',
	top : 10,
	width : 90,
	borderRadius : 1,
	font : {
		fontWeight : 'bold',
		fontSize : 18,
	}
});

win.add(header);
win.add(accountNoLbl);
win.add(accountNoTxtFld);
win.add(pwdLbl);
win.add(pwdTxtFld);
win.add(lgnBtn);

var xhr = Titanium.Network.createHTTPClient();

// Listen for click events.
lgnBtn.addEventListener('click', function(e) {

	if (accountNoTxtFld.value != '' && pwdTxtFld.value != '') {
		xhr.open("POST", "http://www.cs.odu.edu/~rnagella/harris@nrk/comments/login1.php");
		var params = {
			uname : accountNoTxtFld.value,
			password : pwdTxtFld.value //password:md5HexDigest(pwdTxtFld.value)
		};
		xhr.send(params);

	} else {
		alert('Account Number/Password are required');
	}

});

xhr.onload = function() {
	var json = this.responseText;
	var response = JSON.parse(json);
	if (response.logged == true) {
		var newWin = Titanium.UI.createWindow({
			title : 'Form Selection',
			layout : 'vertical',
			url : 'formLst.js',
			barColor:'black'
		});
		Titanium.UI.currentTab.open(newWin, {
			animation : true
		});
	} else {
		alert(response.message);
	}
};

