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
console.log(newDir);
console.log(win.urllink);
var xmlfile = Titanium.Filesystem.getFile(newDir.nativePath, win.urllink);
console.log(xmlfile);

var xmltext = xmlfile.read().text;
var xml = Ti.XML.parseString(xmltext);

var screenItems = xml.documentElement.getElementsByTagName("ScreenItems");
var screenItemDTO = xml.documentElement.getElementsByTagName("ScreenItemDTO");
var screenItemChoices = xml.documentElement.getElementsByTagName("ScreenItemChoices");
var screenItemChoiceDTO = xml.documentElement.getElementsByTagName("ScreenItemChoiceDTO");
var screenItemsLength = screenItems.length;
var i;
for (i = 0; i < screenItemsLength; i++) {
	if (screenItems.item(i).hasChildNodes()) {
		var screenItemsChildNodesLngth = screenItems.item(i).childNodes.length;
		var i2;
		for (i2 = 0; i2 < screenItemsChildNodesLngth; i2++) {
			if (screenItems.item(i).childNodes.item(i2).hasChildNodes()) {
				var screenItemDTOLnght = screenItems.item(i).childNodes.item(i2).childNodes.length;
				var i3;
				for (i3 = 0; i3 < screenItemDTOLnght; i3++) {
					var screenDTOItems = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).nodeName;
					if (screenDTOItems == "SceeenIndex") {
						screenItemDTOSceenIndexVal = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
					}
					if (screenDTOItems == "Index") {
						screenItemDTOIndexVal = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
					}

					if (screenDTOItems == "Caption") {
						var captionValue = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
					}
					if (screenDTOItems == "Kind") {
						var kindValue = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
						//Kind is "0" which is TextBox UI
						if (kindValue == 0) {
							var caption = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue
							});

							view.add(caption);

							var textField = Titanium.UI.createTextField({
								left : 10,
								right : 10,
								bottom : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});

							view.add(textField);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#001'
							});
							view.add(seperator);

						}

						//Kind is "1" which is Information Tag
						if (kindValue == 1) {
							var information = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});
							view.add(information);
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#001'
							});

							view.add(seperator);

						}

						//End of Kind == 1
						//Kind Value "3" Implementing Radio Button UI
						if (kindValue == 3) {
							var radioLabel = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});
							view.add(radioLabel);
							/*
							 * ScreenItems.ScreenItemsDTO.ScreenIndex.value == ScreenItemChoices.ScreenItemChoiceDTO.ScreenIndex.value
							 * then ==> Radio Button(choice1) Text[ScreenItems.ScreenItemsDTO.Text.value]
							 * ``````` Radio Button(choice2) Text[ScreenItems.ScreenItemsDTO.Text.value]
							 */
							var screenItemChoicesLength = screenItemChoices.length;
							var ii;
							for (ii = 0; ii < screenItemChoicesLength; ii++) {
								if (screenItems.item(ii).hasChildNodes()) {
									var screenItemChoicesChildNodesLngth = screenItemChoices.item(ii).childNodes.length;
									var ii2;
									for (ii2 = 0; ii2 < screenItemChoicesChildNodesLngth; ii2++) {
										if (screenItemChoices.item(ii).childNodes.item(ii2).hasChildNodes()) {
											var screenItemChoicesDTOLnght = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.length;
											for (var ii3 = 0; ii3 < screenItemChoicesDTOLnght; ii3++) {
												var screenItemChoicesDTOItems = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).nodeName;
												if (screenItemChoicesDTOItems == "SceeenIndex") {
													/*getting the value of SceenIndex so that we camn compare with the ScreenItems's SceenIndex value
													 * If both are equal => get the <Text> tag value and assign it as choice to the Radio Button.
													 */
													screenItemChoiceDTOSceenIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "SceeenItemIndex") {
													screenItemChoiceDTOSceenItemIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}

												if (screenItemChoicesDTOItems == "Text") {

													if (screenItemChoiceDTOSceenIndexVal == screenItemDTOSceenIndexVal && screenItemChoiceDTOSceenItemIndexVal == screenItemDTOIndexVal) {

														var buttonView = Ti.UI.createView({

															height : 40
														});

														var radioButton = Ti.UI.createButton({
															title : '\u2713',
															left : 10,
															width : 30,

															borderColor : '#666',
															borderWidth : 2,
															borderRadius : 15,
															backgroundColor : '#aaa',
															backgroundImage : 'none',
															color : '#fff',
															font : {
																fontSize : 25,
																fontWeight : 'bold'
															},
															value : false
														});
														buttonView.add(radioButton);

														radioButton.on = function() {
															this.backgroundColor = '#159902';
															this.value = true;
														};

														radioButton.off = function() {
															this.backgroundColor = '#aaa';
															this.value = false;
														};

														radioButton.addEventListener('click', function(e) {
															if (false == e.source.value) {
																e.source.on();
															} else {
																e.source.off();
															}
														});

														var radiolb = Titanium.UI.createLabel({
															layout : 'vertical',
															color : 'black',
															left : 70,
															text : screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text

														});
														buttonView.add(radiolb);

														view.add(buttonView);

													}

												}

											}

										} else {
											//Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
										}
									}

								}

							}
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#001'
							});

							view.add(seperator);

						}

						//End of Kind Value "3"

						/*
						 * kindValue "4", check boxes
						 */
						if (kindValue == 4) {

							var checkboxLabel = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});

							view.add(checkboxLabel);
							var screenItemChoicesLength = screenItemChoices.length;
							for (var ii = 0; ii < screenItemChoicesLength; ii++) {
								if (screenItems.item(ii).hasChildNodes()) {
									var screenItemChoicesChildNodesLngth = screenItemChoices.item(ii).childNodes.length;
									for (var ii2 = 0; ii2 < screenItemChoicesChildNodesLngth; ii2++) {
										if (screenItemChoices.item(ii).childNodes.item(ii2).hasChildNodes()) {
											var screenItemChoicesDTOLnght = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.length;
											for (var ii3 = 0; ii3 < screenItemChoicesDTOLnght; ii3++) {
												var screenItemChoicesDTOItems = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).nodeName;
												if (screenItemChoicesDTOItems == "SceeenIndex") {

													screenItemChoiceDTOSceenIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "SceeenItemIndex") {

													screenItemChoiceDTOSceenItemIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "Text") {

													if (screenItemChoiceDTOSceenIndexVal == screenItemDTOSceenIndexVal && screenItemChoiceDTOSceenItemIndexVal == screenItemDTOIndexVal) {

														var checkButtonView = Ti.UI.createView({

															height : 40,

														});

														var checkButton = Ti.UI.createButton({
															title : '\u2713',
															top : 10,
															left : '10',
															right : 10,
															width : 30,
															height : 30,
															borderColor : '#666',
															borderWidth : 2,
															borderRadius : 3,
															backgroundColor : '#aaa',
															backgroundImage : 'none',
															color : '#fff',
															font : {
																fontSize : 25,
																fontWeight : 'bold'
															},
															value : false
														});
														checkButtonView.add(checkButton);

														checkButton.on = function() {
															this.backgroundColor = '#159902';
															this.value = true;
														};

														checkButton.off = function() {
															this.backgroundColor = '#aaa';
															this.value = false;
														};

														checkButton.addEventListener('click', function(e) {
															if (false == e.source.value) {
																e.source.on();
															} else {
																e.source.off();
															}
														});

														var checklb = Titanium.UI.createLabel({
															layout : 'vertical',
															color : 'black',
															left : 70,

															text : screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text

														});
														checkButtonView.add(checklb);

														view.add(checkButtonView);

													}

												}

											}

										} else {
											//Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
										}
									}

								}

							}

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#001'
							});

							view.add(seperator);
						}

						//End of check boxes

						/*
						 * Kind Value "5", Which is Drop Down
						 */
						if (kindValue == 5) {

							var dropdownLabel = Titanium.UI.createLabel({
								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue
							});

							view.add(dropdownLabel);
							var dropdownname = captionValue.split(' ').join('') + 'button';

							itemObj[dropdownname] = Ti.UI.createButton({
								left : 10,
								right : 10,
								bottom : 10,
								width : 200,
								title : captionValue,
							});
							view.add(itemObj[dropdownname]);
							var dropdowndialogname = captionValue.split(' ').join('') + 'dialog';

							var opts = captionValue.split(' ').join('') + 'opts'

							itemObj[opts] = [];
							itemObj[dropdownname].addEventListener('click', function() {

								var ddbuttonis = itemObj[dropdownname].title;
								var calldialog = ddbuttonis.split(' ').join('') + 'dialog';

								itemObj[calldialog].show();

							});

							var screenItemChoicesLength = screenItemChoices.length;
							for (var ii = 0; ii < screenItemChoicesLength; ii++) {

								if (screenItems.item(ii).hasChildNodes()) {
									var screenItemChoicesChildNodesLngth = screenItemChoices.item(ii).childNodes.length;

									for (var ii2 = 0; ii2 < screenItemChoicesChildNodesLngth; ii2++) {

										if (screenItemChoices.item(ii).childNodes.item(ii2).hasChildNodes()) {
											var screenItemChoicesDTOLnght = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.length;

											for (var ii3 = 0; ii3 < screenItemChoicesDTOLnght; ii3++) {
												var screenItemChoicesDTOItems = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).nodeName;
												if (screenItemChoicesDTOItems == "SceeenIndex") {

													screenItemChoiceDTOSceenIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "SceeenItemIndex") {

													screenItemChoiceDTOSceenItemIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}

												if (screenItemChoicesDTOItems == "Text") {

													if (screenItemChoiceDTOSceenIndexVal == screenItemDTOSceenIndexVal && screenItemChoiceDTOSceenItemIndexVal == screenItemDTOIndexVal) {

														itemObj[opts].push(screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text);

													}

												}

											}

										} else {
											//Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
										}
									}

								}

							}

							itemObj[dropdowndialogname] = Titanium.UI.createOptionDialog({
								options : itemObj[opts],
								title : captionValue,
								destructive : 1,
								cancel : 2,
								titleid : screenItemDTOSceenIndexVal + '' + screenItemDTOIndexVal
							});

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#001'
							});

							view.add(seperator);
						}

						//End of KInd Value "5"

						/*Kind Value "6", Odometer
						 *
						 */
						if (kindValue == 6) {
							var odometerLabel = Titanium.UI.createLabel({
								left : '10',
								right : 10,
								bottom : 10,
								text : captionValue

							});

							view.add(odometerLabel);

							var odometerTF = Titanium.UI.createTextField({
								left : 10,
								bottom : 10,
								right : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});

							view.add(odometerTF);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						//End of Odometer, Kind Value "6"

						/*
						 * Kind Value "7", Which is Numeric field
						 */
						if (kindValue == 7) {
							var numeric = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});
							view.add(numeric);
							var numericTF = Titanium.UI.createTextField({
								left : 10,
								right : 10,
								bottom : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});

							view.add(numericTF);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						//End of Kind value "7"

						/*
						 * Kind Value "8", which is currency
						 */
						if (kindValue == 8) {
							var currency = Titanium.UI.createLabel({

								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});

							view.add(currency);

							var currencyTF = Titanium.UI.createTextField({
								left : 10,
								right : 10,
								bottom : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});

							view.add(currencyTF);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						//End of Kind Value "8"

						/*
						 * Kind Value "9", Date field
						 */
						if (kindValue == 9) {
							var dateTime = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue
							});
							view.add(dateTime);

							var dateTimeTF = Titanium.UI.createLabel({
								bottom : 10,
								left : 10,
								right : 10,
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							});
							view.add(dateTimeTF);
							dateTimeTF.addEventListener('click', function() {
								var dtWin = Titanium.UI.createWindow({
									title : 'choose date time',
									backgroundColor : '#fff',
									layout : 'vertical'
								});
								var closeBtn = Ti.UI.createButton({
									title : 'Close'
								});
								dtWin.setLeftNavButton(closeBtn);
								closeBtn.addEventListener('click', function() {
									dtWin.close();
								});
								var doneBtn = Titanium.UI.createButton({
									title : 'Done'
								});
								dtWin.setRightNavButton(doneBtn);

								var dateValue = new Date();
								var minDate = new Date();
								minDate.setFullYear(1900);
								minDate.setMonth(0);
								minDate.setDate(1);

								var maxDate = dateValue;
								var dateTimeTF = Titanium.UI.createLabel({
									left : 10,
									right : 10,
									bottom : 10,
									color : '#007FFF',
									width : '300',
									textAlign : 'center',
									text : '--:--:--'
								});
								dtWin.add(dateTimeTF);
								var picker = Ti.UI.createPicker({
									type : Ti.UI.PICKER_TYPE_DATE,
									minDate : minDate,
									maxDate : maxDate,
									value : dateValue,
									selectionIndicator : true

								});
								dtWin.add(picker);
								picker.addEventListener('change', function(e) {
									dateTimeTF.text = e.value.toLocaleString();

								});
								doneBtn.addEventListener('click', function() {
									dtWin.fireEvent('return', {
										param : 42
									});

									dtWin.close();
								});

								dtWin.open({
									modal : true
								});
							});
							win.addEventListener('return', function(e) {
								alert(e.param);
							});
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}
						//End of Kind Value "9"

						/*
						 * Kind Value "10" which is Time
						 */

						if (kindValue == 10) {
							var dateTime = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue
							});
							view.add(dateTime);

							var dateTimeTF = Titanium.UI.createLabel({
								bottom : 10,
								left : 10,
								right : 10,
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							});
							view.add(dateTimeTF);
							dateTimeTF.addEventListener('click', function() {
								var dtWin = Titanium.UI.createWindow({
									title : 'choose date time',
									backgroundColor : '#fff',
									layout : 'vertical'
								});
								var closeBtn = Ti.UI.createButton({
									title : 'Close'
								});
								dtWin.setLeftNavButton(closeBtn);
								closeBtn.addEventListener('click', function() {
									dtWin.close();
								});
								var doneBtn = Titanium.UI.createButton({
									title : 'Done'
								});
								dtWin.setRightNavButton(doneBtn);

								var dateValue = new Date();
								var minDate = new Date();
								minDate.setFullYear(1900);
								minDate.setMonth(0);
								minDate.setDate(1);

								var maxDate = dateValue;
								var dateTimeTF = Titanium.UI.createLabel({
									left : 10,
									right : 10,
									bottom : 10,
									color : '#007FFF',
									width : '300',
									textAlign : 'center',
									text : '--:--:--'
								});
								dtWin.add(dateTimeTF);
								var picker = Ti.UI.createPicker({
									type : Ti.UI.PICKER_TYPE_TIME,
									minDate : minDate,
									maxDate : maxDate,
									value : dateValue,
									selectionIndicator : true

								});
								dtWin.add(picker);
								picker.addEventListener('change', function(e) {
									dateTimeTF.text = e.value.toLocaleString();

								});
								doneBtn.addEventListener('click', function() {
									dtWin.fireEvent('return', {
										param : 42
									});

									dtWin.close();
								});

								dtWin.open({
									modal : true
								});
							});
							win.addEventListener('return', function(e) {
								alert(e.param);
							});
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						//End of Kind Value "10"
						/*
						 * Kind Value is "11" which is Date N Time
						 */

						if (kindValue == 11) {
							var dateTime = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue
							});
							view.add(dateTime);

							var dateTimeTF = Titanium.UI.createLabel({
								bottom : 10,
								left : 10,
								right : 10,
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							});
							view.add(dateTimeTF);
							dateTimeTF.addEventListener('click', function() {
								var dtWin = Titanium.UI.createWindow({
									title : 'choose date time',
									backgroundColor : '#fff',
									layout : 'vertical'
								});
								var closeBtn = Ti.UI.createButton({
									title : 'Close'
								});
								dtWin.setLeftNavButton(closeBtn);
								closeBtn.addEventListener('click', function() {
									dtWin.close();
								});
								var doneBtn = Titanium.UI.createButton({
									title : 'Done'
								});
								dtWin.setRightNavButton(doneBtn);

								var dateValue = new Date();
								var minDate = new Date();
								minDate.setFullYear(1900);
								minDate.setMonth(0);
								minDate.setDate(1);

								var maxDate = dateValue;
								var dateTimeTF = Titanium.UI.createLabel({
									left : 10,
									right : 10,
									bottom : 10,
									color : '#007FFF',
									width : '300',
									textAlign : 'center',
									text : '--:--:--'
								});
								dtWin.add(dateTimeTF);
								var picker = Ti.UI.createPicker({
									type : Ti.UI.PICKER_TYPE_DATE_AND_TIME,
									minDate : minDate,
									maxDate : maxDate,
									value : dateValue,
									selectionIndicator : true

								});
								dtWin.add(picker);
								picker.addEventListener('change', function(e) {
									dateTimeTF.text = e.value.toLocaleString();

								});
								doneBtn.addEventListener('click', function() {
									dtWin.fireEvent('return', {
										param : 42
									});

									dtWin.close();
								});

								dtWin.open({
									modal : true
								});
							});
							win.addEventListener('return', function(e) {
								alert(e.param);
							});
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						//End of Kind Value "11"
						//Camera field, kindValue "12"
						if (kindValue == 12) {
							var cameraCaptionVal = Titanium.UI.createLabel({

								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue

							});

							view.add(cameraCaptionVal);

							var cameraView = Ti.UI.createView({

								height : 40
							});
							var cameraImage = Titanium.UI.createImageView({
								image : 'iphone-camera-icon.png',

								left : 0
							});
							cameraView.add(cameraImage);
							var cameraTextField = Titanium.UI.createTextField({

								layout : 'vertical',
								width : '250',
								right : 10,
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

							});
							cameraView.add(cameraTextField);
							cameraImage.addEventListener('click', function() {

								Titanium.Media.showCamera({
									success : function(e) {
										if (e.mediaType == Titanium.Media.MEDIA_TYPE_PHOTO) {
											//It's a photo
											var imageView = Titanium.UI.createImageView({
												image : e.media
											})
											win.add(imageView);
										} else if (e.mediaType == Titanium.Media.MEDIA_TYPE_VIDEO) {
											//It's a video
											var w = Titanium.UI.createWindow({
												title : 'New Video',
												backgroundColor : '#000000'
											});
											var videoPlayer = Titanium.Media.createVideoPlayer({
												media : e.media
											});
											w.add(videoPlayer);
											videoPlayer.addEventListener('complete', function(e) {
												w.remove(videoPlayer);
												videoPlayer = null;
												w.close();
											});
										}

									},
									error : function(e) {
										alert("There was an error");
									},
									cancel : function(e) {
										alert("The event was canceled");
									},
									allowEditing : false,
									saveToPhotoGallery : true,
									mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO],
									videoQuality : Titanium.Media.QUALITY_HIGH
								});
							});

							view.add(cameraView);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}
						//Signature field, kindValue "13"
						if (kindValue == 13) {
							var signatureCaptionVal = Titanium.UI.createLabel({
								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue

							});

							view.add(signatureCaptionVal);

							var signatureView = Ti.UI.createView({

								height : 40
							});
							var signatureImage = Titanium.UI.createImageView({
								image : 'drawing_pen1.png',

								left : 0
							});
							signatureView.add(signatureImage);
							var signatureTextField = Titanium.UI.createTextField({

								layout : 'vertical',
								width : '250',
								right : 10,
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

							});
							signatureView.add(signatureTextField);
							signatureImage.addEventListener('click', function() {

								Ti.include('signatureUI.js');

							});

							view.add(signatureView);

							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

						/*Kind Value "17" which is Email ID implementation
						 * Need to validate E-mail --
						 */

						if (kindValue == 17) {
							itemLabel = captionValue + 'Label';
							itemTextField = captionValue + 'TextField';

							itemObj[itemLabel] = Titanium.UI.createLabel({
								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue,
								textid : itemLabel

							});

							view.add(itemObj[itemLabel]);

							itemObj[itemTextField] = Titanium.UI.createTextField({
								left : 10,
								right : 10,
								bottom : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
								textAlign : itemTextField

							});
							view.add(itemObj[itemTextField]);
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);

						}

					}
				}

			} else {
				//Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItems.item(i).childNodes.item(i2).nodeName);
			}

		}
	}
}
submitBtn.addEventListener('click', function() {
	//itemLabel = 'EmailTextField';
	//alert('label value is :' + itemObj[itemLabel].value);
	//itemLabel='EmailIDLabel';
	//alert('label value is :'+itemObj[itemLabel].textid);
	//alert('label value is :'+itemObj[itemLabel].toSource);
});
scrollView.add(view);
win.add(scrollView);
win.open();
