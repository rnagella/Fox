/**
 * @author rnagella
 */
var win = Ti.UI.currentWindow;
var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", "http://www.cs.odu.edu/~rnagella/harris@nrk/comments/xmllist.php");
var dataN = [];

xhr.onload = function() {
	try {

		var result = this.responseText;
		var xml = Ti.XML.parseString(result);
		var fields = xml.documentElement.getElementsByTagName("field");
		var names = xml.documentElement.getElementsByTagName("name");
		var url = xml.documentElement.getElementsByTagName("url");
		for (var i = 0, l = fields.length; i < l; i++) {
			dataN.push({
				title : names.item(i).text
			});
		}
		var table = Titanium.UI.createTableView({
			data : dataN

		});
		win.add(table);

	} catch(E) {
		alert(E);
	}
	table.addEventListener('click', function(e) {
		var indexValue = e.index;
		var fname = url.item(indexValue).text;
		var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userData');
		if (newDir.exists() === false) {
			//creating direcory name called "userData" to store all the xml files into filesystem
			newDir.createDirectory();
		}
		var file = Ti.Filesystem.getFile(newDir.nativePath, fname);
		if (file.exists() === true) {
			var newWin = Titanium.UI.createWindow({
				backgroundColor : '#fff',
				title : 'Form View',
				url : 'formUI.js',
				layout : 'vertical',
				barColor : 'black',
				urllink:fname
			});

			Titanium.UI.currentTab.open(newWin, {
				animation : true
			});
		}  
		if (file.exists() === false) {
			console.log('false');
			//f.createFile();
			var xhr = Ti.Network.createHTTPClient();
			xhr.open("GET", "http://www.cs.odu.edu/~rnagella/harris@nrk/comments/xmlfiles/" + fname);
			xhr.onload = function() {
				console.log('onload');
				file.write(this.responseData);
				var newWin = Titanium.UI.createWindow({
				backgroundColor : '#fff',
				title : 'Form View',
				url : 'formUI.js',
				layout : 'vertical',
				barColor : 'black',
				urllink:fname
			});

			Titanium.UI.currentTab.open(newWin, {
				animation : true
			});
				

			};

			xhr.send();
		}

	});

	win.open();

}

xhr.send();
