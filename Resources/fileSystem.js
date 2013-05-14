/**
 * @author Ranjith Kumar Nagella
 */
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
Ti.include('formUI.js');

var fname = win.urllink;
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userData');
if (newDir.exists() === false) {
	//creating direcory name called "userData" to store all the xml files into filesystem
	newDir.createDirectory();
}
//Ti.API.info('directory is'+Titanium.Filesystem.applicationDataDirectory);
var f = Ti.Filesystem.getFile(newDir.nativePath, fname);
var fexists1;
if (f.exists() === true) {
	fexists1 = "yes";
}

if (fexists1 == "yes") {

	Ti.include('formUI.js');
}

if (f.exists() === false) {
	fexists1 = "no";
	//f.createFile();
	var myHttpClient = Ti.Network.createHTTPClient();
	myHttpClient.open("GET", "http://www.cs.odu.edu/~rnagella/harris@nrk/comments/xmlfiles/" + win.urllink);
	myHttpClient.onload = function() {
		if (fexists1 == "no") {
			f.write(this.responseData);
			fexists1 = "yes";

		}
		if (fexists1 == "yes") {
			Ti.include('formUI.js');
		}

	};

	myHttpClient.send();
}

