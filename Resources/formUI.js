/**
 * @author rnagella
 */
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
var submitBtn = Titanium.UI.createButton({
	title : 'Submit'
});
win.rightNavButton = submitBtn;
var fname = win.urllink;
var data = [];
var x = 0;
var itemObj = [];
var value;
var itemLabel;
var itemTextField;
var topPosition = 10;
var scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
});

var view = Ti.UI.createView({
	width : 'auto',
	height : 'auto',
	top : 10,
	bottom : 10,
	layout : 'vertical'
});
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userData');
var xmlfile = Titanium.Filesystem.getFile(newDir.nativePath, fname);
var xmltext = xmlfile.read().text;
var xml = Ti.XML.parseString(xmltext);

var screenItems = xml.documentElement.getElementsByTagName("ScreenItems");
var screenItemDTO = xml.documentElement.getElementsByTagName("ScreenItemDTO");
var screenItemChoices = xml.documentElement.getElementsByTagName("ScreenItemChoices");
var screenItemChoiceDTO = xml.documentElement.getElementsByTagName("ScreenItemChoiceDTO");
var screenItemsLength = screenItems.length;
console.log(screenItemsLength);
var i;
for (i = 0; i < screenItemDTO.length; i++) {
	//console.log(screenItemDTO.item(i).getElementsByTagName("SceeenIndex").item(0).text);
	var sceeenIndexValue = screenItemDTO.item(i).getElementsByTagName("SceeenIndex").item(0).text;
	var indexValue = screenItemDTO.item(i).getElementsByTagName("Index").item(0).text;
	var captionValue = screenItemDTO.item(i).getElementsByTagName("Caption").item(0).text;
	var kindValue = screenItemDTO.item(i).getElementsByTagName("Kind").item(0).text;

	Ti.API.info('sccen value', sceeenIndexValue, 'index value', indexValue, 'caption value', captionValue, 'kind value', kindValue);

	if (kindValue == 0) {
		var caption = Titanium.UI.createLabel({
			left : 10,
			right : 10,
			bottom : 10,
			text : captionValue
		});

		view.add(caption);

		itemTextField = indexValue + 'TextField';
		Ti.API.info(itemTextField);

		itemObj[itemTextField] = Titanium.UI.createTextField({
			left : 10,
			right : 10,
			bottom : 10,
			width : '300',
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			myId : indexValue
		});

		view.add(itemObj[itemTextField]);

		var seperator = Ti.UI.createLabel({
			height : '0.2',
			width : Ti.UI.FILL, // iphone 320*480
			backgroundColor : 'black'
		});
		view.add(seperator);

	}

}
submitBtn.addEventListener('click', function() {
	Ti.API.info('submit button clicked');
	var myId = "0TextField";
	Ti.API.info(myId);

	Ti.API.info(itemObj[myId].value);

	var string;
	string = itemObj[myId].value;
	Ti.API.info('xml tag', string);

	var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userData');
	var xmlfile = Titanium.Filesystem.getFile(newDir.nativePath, fname);
	var xmltext = xmlfile.read().text;
	Ti.API.info('xmltext', xmltext);
	var xml = Ti.XML.parseString(xmltext);

	Ti.API.info('xml', xml);

	var string = " \u003C Cuservalue \u003E 'Hi' \u003C /uservalue \u003E";
	Ti.API.info(string);
	//var newele = xml.createElement("uservalue");
	var newele = xml.createTextNode(" \u003C Cuservalue \u003E 'Hi' \u003C /uservalue \u003E");
	//newele.setNodeValue(string);
	Ti.API.info(newele);

	var screenItemDTO = xml.documentElement.getElementsByTagName("ScreenItemDTO").item(0);
	Ti.API.info('x is', screenItemDTO);
	Ti.API.info('get data', newele.getData);
	screenItemDTO.appendChild(newele);

	//newele.setNodeValue = "hi";

	//var z = xml.documentElement.getElementsByTagName("ScreenItemDTO").item(0).getElementsByTagName("uservalue").item(0).text;
	//z = "hi";

	//Ti.API.info("final",xml.documentElement.getElementsByTagName("ScreenItemDTO").item(0).getElementsByTagName("uservalue").item(0).text);

	xmlfile.write(Ti.XML.serializeToString(xml));

	// Read the file, write the file [may beyou can append some where or make it as string and pass the only values required ]
	// in an easy way and w/o considering performance issue.
	// create xml file and send it back to server.

	//itemLabel = 'EmailTextField';
	//alert('label value is :' + itemObj[itemLabel].value);
	//itemLabel='EmailIDLabel';
	//alert('label value is :'+itemObj[itemLabel].textid);
	//alert('label value is :'+itemObj[itemLabel].toSource);
});
scrollView.add(view);
win.add(scrollView);
win.open();
