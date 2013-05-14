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
	//backgroundColor : '#336699',
	//borderRadius : 10,
	width : 'auto',
	height : 'auto',
	top : 10,
	bottom : 10,
	layout : 'vertical'
});

//view.add(submitBtn);
var xmlfile = Titanium.Filesystem.getFile(newDir.nativePath, win.urllink);

Ti.API.info(xmlfile.read());
var xmltext = xmlfile.read().text;
var xml = Ti.XML.parseString(xmltext);

var screenItems = xml.documentElement.getElementsByTagName("ScreenItems");
var screenItemDTO = xml.documentElement.getElementsByTagName("ScreenItemDTO");
var screenItemChoices = xml.documentElement.getElementsByTagName("ScreenItemChoices");
var screenItemChoiceDTO = xml.documentElement.getElementsByTagName("ScreenItemChoiceDTO");

Titanium.API.info('screenItemDTO length::' + screenItemDTO.length);
var screenItemsLength = screenItems.length;

for (var i = 0; i < screenItemsLength; i++) {
	Ti.API.info("screenItemsLenght::" + screenItemsLength);
	Ti.API.info("screenItemsLenght i value::" + i);
	Ti.API.info(screenItems.item(i).nodeName);

	if (screenItems.item(i).hasChildNodes()) {
		var screenItemsChildNodesLngth = screenItems.item(i).childNodes.length;
		for (var i2 = 0; i2 < screenItemsChildNodesLngth; i2++) {
			Ti.API.info("screenItemsChildNodesLngth::" + screenItems.item(i).childNodes.length);
			Ti.API.info("screenItemsChildNode Names::" + screenItems.item(i).childNodes.item(i2).nodeName);

			if (screenItems.item(i).childNodes.item(i2).hasChildNodes()) {

				var screenItemDTOLnght = screenItems.item(i).childNodes.item(i2).childNodes.length;
				Ti.API.info("Number of child Nodes for child ::" + screenItems.item(i).childNodes.item(i2).nodeName, 'is ::' + screenItemDTOLnght);

				for (var i3 = 0; i3 < screenItemDTOLnght; i3++) {
					Ti.API.info(i3);
					var screenDTOItems = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).nodeName;
					if (screenDTOItems == "SceeenIndex") {
						screenItemDTOSceenIndexVal = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
						//alert(screenItemDTOSceenIndexVal);

					}
					if (screenDTOItems == "Index") {
						screenItemDTOIndexVal = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
						//alert(screenItemDTOIndexVal);

					}

					if (screenDTOItems == "Caption") {
						var captionValue = screenItems.item(i).childNodes.item(i2).childNodes.item(i3).text;
					}
					if (screenDTOItems == "Kind") {
						//alert(screenItemDTOSceenIndexVal+''+screenItemDTOIndexVal)

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
							//win.add(radioLabel);
							view.add(radioLabel);
							//topPosition = topPosition + 30;

							/*
							 * ScreenItems.ScreenItemsDTO.ScreenIndex.value == ScreenItemChoices.ScreenItemChoiceDTO.ScreenIndex.value
							 * then ==> Radio Button(choice1) Text[ScreenItems.ScreenItemsDTO.Text.value]
							 * ``````` Radio Button(choice2) Text[ScreenItems.ScreenItemsDTO.Text.value]
							 */
							Ti.API.info("Kind value ::" + kindValue);
							Ti.API.info(screenItemDTOSceenIndexVal);
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
													/*getting the value of SceenIndex so that we camn compare with the ScreenItems's SceenIndex value
													 * If both are equal => get the <Text> tag value and assign it as choice to the Radio Button.
													 */
													screenItemChoiceDTOSceenIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "SceeenItemIndex") {
													screenItemChoiceDTOSceenItemIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}

												if (screenItemChoicesDTOItems == "Text") {
													//alert('yes');

													if (screenItemChoiceDTOSceenIndexVal == screenItemDTOSceenIndexVal && screenItemChoiceDTOSceenItemIndexVal == screenItemDTOIndexVal) {

														var buttonView = Ti.UI.createView({
															//top : topPosition,
															height : 40
														});

														var radioButton = Ti.UI.createButton({
															title : '\u2713',
															left : 10,
															width : 30,
															//height : 30,
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
														//win.add(buttonView);
														view.add(buttonView);

														//win.add(checkbox);

														//alert("Text Value::male/female?"+screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text);

														//data[w++]=Ti.UI.createPickerRow({title:screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text});

														// turn on the selection indicator (off by default)

													}

													//picker.selectionIndicator = true;

													//picker.add(data);

													//topPosition = topPosition + 40;

												}

											}

										} else {
											Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
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
							//alert('in check box area');
							var checkboxLabel = Titanium.UI.createLabel({
								left : 10,
								right : 10,
								bottom : 10,
								text : captionValue

							});
							//win.add(checkboxLabel);
							view.add(checkboxLabel);
							//topPosition = topPosition + 40;

							Ti.API.info("Kind value ::" + kindValue);
							Ti.API.info(screenItemDTOSceenIndexVal);
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
															//top : topPosition
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
														//win.add(checkButtonView);
														view.add(checkButtonView);

													}

												}

											}

										} else {
											Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
										}
									}

								}

							}
							//topPosition = topPosition + 40;
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
							//alert('dropdown');
							var dropdownLabel = Titanium.UI.createLabel({
								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue
							});

							view.add(dropdownLabel);
							var dropdownname = captionValue.split(' ').join('') + 'button';
							//alert(dropdownname);
							itemObj[dropdownname] = Ti.UI.createButton({
								left : 10,
								right : 10,
								bottom : 10,
								width : 200,
								title : captionValue,
							});
							view.add(itemObj[dropdownname]);
							var dropdowndialogname = captionValue.split(' ').join('') + 'dialog';
							//alert(dropdowndialogname);
							var opts = captionValue.split(' ').join('') + 'opts'

							itemObj[opts] = [];
							itemObj[dropdownname].addEventListener('click', function() {
								//alert('button clicked');
								//alert(dialog.titleid);
								//dialog.show();
								//alert(itemObj[dropdownname].title);
								var ddbuttonis = itemObj[dropdownname].title;
								var calldialog = ddbuttonis.split(' ').join('') + 'dialog';
								//alert(calldialog);
								itemObj[calldialog].show();

							});
							/*var tr = Ti.UI.create2DMatrix();
							 tr.rotate(0);
							 var dropdown_button = Ti.UI.createButton({
							 style : Ti.UI.iPhone.SystemButton.DISCLOSURE,
							 transform : tr
							 });
							 var dropdown_selected = Ti.UI.createTextField({
							 left:10,
							 bottom:10,
							 right:10,
							 width : 300,
							 borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
							 rightButton : dropdown_button,
							 rightButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS

							 });
							 view.add(dropdown_selected);
							 dropdown_button.addEventListener('click',function(){
							 alert('clicked');

							 });*/

							Ti.API.info("Kind value ::" + kindValue);
							Ti.API.info(screenItemDTOSceenIndexVal);
							var screenItemChoicesLength = screenItemChoices.length;
							for (var ii = 0; ii < screenItemChoicesLength; ii++) {
								//alert('screenItemChoices');
								if (screenItems.item(ii).hasChildNodes()) {
									var screenItemChoicesChildNodesLngth = screenItemChoices.item(ii).childNodes.length;
									//alert(screenItemChoicesChildNodesLngth);
									for (var ii2 = 0; ii2 < screenItemChoicesChildNodesLngth; ii2++) {
										//alert('screenitemchoicesdto');
										if (screenItemChoices.item(ii).childNodes.item(ii2).hasChildNodes()) {
											var screenItemChoicesDTOLnght = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.length;
											//alert(screenItemChoicesDTOLnght);
											for (var ii3 = 0; ii3 < screenItemChoicesDTOLnght; ii3++) {
												var screenItemChoicesDTOItems = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).nodeName;
												if (screenItemChoicesDTOItems == "SceeenIndex") {

													screenItemChoiceDTOSceenIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}
												if (screenItemChoicesDTOItems == "SceeenItemIndex") {

													screenItemChoiceDTOSceenItemIndexVal = screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text;

												}

												if (screenItemChoicesDTOItems == "Text") {
													//alert('text test');

													//view.add(dropdown_picker);

													if (screenItemChoiceDTOSceenIndexVal == screenItemDTOSceenIndexVal && screenItemChoiceDTOSceenItemIndexVal == screenItemDTOIndexVal) {
														//alert('@ condition');
														itemObj[opts].push(screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text);

														//alert(screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text);
														//dropdown_data[c++]=Ti.UI.createPickerRow({title:screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text});

														/*dialogdata.push(screenItemChoices.item(ii).childNodes.item(ii2).childNodes.item(ii3).text);
														 var tr = Titanium.UI.create2DMatrix();
														 tr = tr.rotate(0);

														 drop_button = Titanium.UI.createButton({
														 style : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
														 transform : tr
														 });

														 var my_combo = Titanium.UI.createTextField({
														 hintText : "choose value",
														 height : 40,
														 width : 300,
														 top : topPosition,
														 borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
														 rightButton : drop_button,
														 rightButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
														 });
														 //win.add(my_combo);
														 view.add(my_combo);*/

													}

												}

											}

										} else {
											Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItemChoices.item(i).childNodes.item(i2).nodeName);
										}
									}

								}

							}
							//topPosition = topPosition + 40;
							itemObj[dropdowndialogname] = Titanium.UI.createOptionDialog({
								options : itemObj[opts],
								title : captionValue,
								destructive : 1,
								cancel : 2,
								titleid : screenItemDTOSceenIndexVal + '' + screenItemDTOIndexVal
							});
							//alert(dropdowndialogname);
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
							//win.add(odometerLabel);
							view.add(odometerLabel);
							//topPosition = topPosition + 80;
							var odometerTF = Titanium.UI.createTextField({
								left : 10,
								bottom : 10,
								right : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});
							//win.add(odometerTF);
							view.add(odometerTF);
							//topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							//topPosition = topPosition + 40;
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
							//win.add(numericTF);
							view.add(numericTF);
							//topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							//topPosition = topPosition + 40;

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
							//win.add(currency);
							view.add(currency);
							//topPosition = topPosition + 80;
							var currencyTF = Titanium.UI.createTextField({
								left : 10,
								right : 10,
								bottom : 10,
								width : '300',
								keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
								returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
								borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
							});
							//win.add(currencyTF);
							view.add(currencyTF);
							topPosition = topPosition + 40;
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
							var date = Titanium.UI.createLabel({

								color : 'black',
								top : topPosition,
								layout : 'vertical',
								text : captionValue

							});

							//win.add(date);
							view.add(date);
							topPosition = topPosition + 40;

							var dateTF = Titanium.UI.createLabel({
								color : '#007FFF',
								top : topPosition,
								layout : 'vertical',
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							})
							//win.add(dateTF);
							view.add(dateTF);
							dateTF.addEventListener('click', function() {
								alert('yes');
								var picker = Titanium.UI.createPicker({
									type : Ti.UI.PICKER_TYPE_DATE,
									minDate : new Date(2009, 0, 1),
									maxDate : new Date(2014, 11, 31),
									value : new Date(2014, 3, 12)
								});
								view.add(picker);
								picker.addEventListener('change', function(e) {

								});
								/*

								 var picker_view = Titanium.UI.createView({
								 //height : '251',
								 //bottom : '251',
								 layout : 'vertical',
								 visisble : true
								 });
								 win.add(picker_view);
								 //view.add(picker_view);

								 var cancel = Titanium.UI.createButton({
								 title : 'Cancel',
								 style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED

								 });

								 var done = Titanium.UI.createButton({
								 title : 'Done',
								 style : Titanium.UI.iPhone.SystemButtonStyle.DONE

								 });
								 var spacer = Titanium.UI.createButton({
								 systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
								 })
								 var toolbar = Titanium.UI.iOS.createToolbar({
								 items : [cancel, spacer, done]
								 });

								 var dateValue = new Date();
								 var minDate = new Date();
								 minDate.setFullYear(1900);
								 minDate.setMonth(0);
								 minDate.setDate(1);

								 var maxDate = dateValue;
								 var picker = Ti.UI.createPicker({
								 type : Ti.UI.PICKER_TYPE_DATE,
								 minDate : minDate,
								 maxDate : maxDate,
								 value : dateValue,
								 selectionIndicator : true

								 });

								 picker_view.add(toolbar);
								 picker_view.add(picker);
								 var slide_in = Titanium.UI.createAnimation({
								 bottom : 0
								 });
								 var slide_out = Titanium.UI.createAnimation({
								 bottom : -251
								 });

								 picker.addEventListener('change', function(e) {

								 dateTF.text = e.value.toLocaleString();

								 });
								 cancel.addEventListener('click', function(e) {
								 picker_view.animate(slide_out);
								 picker_view.visible = false;
								 })
								 done.addEventListener('click', function(e) {

								 picker_view.animate(slide_out);
								 picker_view.visible = false;
								 });*/
							});
							topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								top : topPosition,
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							topPosition = topPosition + 40;

						}
						//End of Kind Value "9"

						/*
						 * Kind Value "10" which is Time
						 */

						if (kindValue == 10) {
							var time = Titanium.UI.createLabel({

								color : 'black',
								top : topPosition,
								layout : 'vertical',
								text : captionValue

							});

							win.add(time);

							var timeTF = Titanium.UI.createLabel({
								color : '#007FFF',
								top : topPosition,
								layout : 'vertical',
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							})
							win.add(timeTF);
							timeTF.addEventListener('click', function() {

								var picker_view = Titanium.UI.createView({
									height : '251',
									bottom : '251',
									layout : 'vertical',
									visible : true
								});
								win.add(picker_view);

								var cancel = Titanium.UI.createButton({
									title : 'Cancel',
									style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED

								});

								var done = Titanium.UI.createButton({
									title : 'Done',
									style : Titanium.UI.iPhone.SystemButtonStyle.DONE

								});
								var spacer = Titanium.UI.createButton({
									systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
								})
								var toolbar = Titanium.UI.iOS.createToolbar({
									items : [cancel, spacer, done]
								})

								var dateValue = new Date();
								var minDate = new Date();
								minDate.setFullYear(1900);
								minDate.setMonth(0);
								minDate.setDate(1);

								var maxDate = dateValue;
								var picker = Ti.UI.createPicker({
									type : Ti.UI.PICKER_TYPE_TIME,
									minDate : minDate,
									maxDate : maxDate,
									value : dateValue,
									selectionIndicator : true

								});

								picker_view.add(toolbar);
								picker_view.add(picker);
								var slide_in = Titanium.UI.createAnimation({
									bottom : 0
								});
								var slide_out = Titanium.UI.createAnimation({
									bottom : -251
								});

								picker.addEventListener('change', function(e) {

									timeTF.text = e.value.toLocaleString();

								});
								cancel.addEventListener('click', function(e) {
									picker_view.animate(slide_out);
									picker_view.visible = false;
								})
								done.addEventListener('click', function(e) {

									picker_view.animate(slide_out);
									picker_view.visible = false;
								});
							});
							topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								top : topPosition,
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							topPosition = topPosition + 40;

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
							//topPosition = topPosition + 40;

							var dateTimeTF = Titanium.UI.createLabel({
								bottom : 10,
								left : 10,
								right : 10,
								width : '300',
								textAlign : 'center',
								text : '--:--:--'
							});
							//win.add(dateTimeTF);
							view.add(dateTimeTF);
							//topPosition = topPosition + 40;

							dateTimeTF.addEventListener('click', function() {
								//alert('clicked');
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
							//topPosition = topPosition + 40;
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
							//win.add(cameraCaptionVal);
							view.add(cameraCaptionVal);
							//topPosition = topPosition + 80;
							var cameraView = Ti.UI.createView({
								//top : topPosition,
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
								alert('\'cameraaButton\' was clicked!');
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
							//win.add(cameraView);
							view.add(cameraView);
							//topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							//topPosition = topPosition + 40;
						}
						//Signature field, kindValue "13"
						if (kindValue == 13) {
							var signatureCaptionVal = Titanium.UI.createLabel({
								left : 10,
								bottom : 10,
								right : 10,
								text : captionValue

							});

							//win.add(signatureCaptionVal);
							view.add(signatureCaptionVal);
							//topPosition = topPosition + 80;
							var signatureView = Ti.UI.createView({
								//top : topPosition,
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
							//win.add(signatureView);
							view.add(signatureView);
							//topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							//topPosition = topPosition + 40;

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
							//alert('label value is :' + itemObj[itemLabel].textid);
							//alert(EmailIDLabel.textid);
							//var Ranjith=itemlabel;
							//win.add(itemObj[itemLabel]);
							//sv.add(itemObj[itemLabel]);
							view.add(itemObj[itemLabel]);
							//win.add(sv);
							//topPosition = topPosition + 50;
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
							//sv.add(itemObj[itemTextField]);
							//win.add(sv);

							//win.add(itemObj[itemTextField]);
							//Ti.App.Properties.setString();
							// Add some Properties.

							Ti.App.Properties.setString('Label', itemLabel);
							Ti.App.Properties.setString('TextField', itemTextField);
							Ti.App.Properties.setString(itemLabel, itemTextField);

							Ti.App.Properties.setInt('Int', 10);
							Ti.App.Properties.setBool('Bool', true);
							Ti.App.Properties.setDouble('Double', 10.6);
							Ti.App.Properties.setList('List', [{
								name : 'One',
								address : '1 Main St'
							}, {
								name : 'Two',
								address : '2 Main St'
							}]);

							// Retrieve the Properties.
							Ti.API.info('String: ' + Ti.App.Properties.getString('Label'));
							Ti.API.info('String: ' + Ti.App.Properties.getString('TextField'));
							//Ti.API.info('String: ' + Ti.App.Properties.getString(itemLabel));
							Ti.API.info('Int: ' + Ti.App.Properties.getInt('Int'));
							Ti.API.info('Bool: ' + Ti.App.Properties.getBool('Bool'));
							Ti.API.info('Double: ' + Ti.App.Properties.getDouble('Double'));
							Ti.API.info('List: ' + JSON.stringify(Ti.App.Properties.getList('List')));

							// Remove the Properties.
							//Ti.App.Properties.removeProperty('Label');
							Ti.App.Properties.removeProperty('TextField');
							//Ti.App.Properties.removeProperty(itemLabel);
							Ti.App.Properties.removeProperty('Int');
							Ti.App.Properties.removeProperty('Bool');
							Ti.App.Properties.removeProperty('Double');
							Ti.App.Properties.removeProperty('List');
							topPosition = topPosition + 40;
							var seperator = Ti.UI.createLabel({
								height : 1,
								width : '320',
								left : 0,
								backgroundColor : '#000'
							});
							view.add(seperator);
							//topPosition = topPosition + 40;
						}

					}
				}

			} else {
				Ti.API.info('no child nodes for iteration ::' + i2, 'and for node name' + screenItems.item(i).childNodes.item(i2).nodeName);
			}

		}
	}
}
submitBtn.addEventListener('click', function() {
	//itemLabel='EmailLabel';
	itemLabel = 'EmailTextField';
	alert('label value is :' + itemObj[itemLabel].value);
	//itemLabel='EmailIDLabel';
	//alert('label value is :'+itemObj[itemLabel].textid);
	//alert('label value is :'+itemObj[itemLabel].toSource);
	//alert('button clicked');
	//Ti.API.info('String: ' + Ti.App.Properties.getString('Label'));
	//Ti.API.info('String: ' + Ti.App.Properties.getString('EmailIDLabel'));
	//Ti.App.Properties.removeProperty(Label);
	/*var newWin = Titanium.UI.createWindow({
	 backgroundColor:'#fff',
	 title:'File Saving',
	 //url:'formView.js',
	 url:'fileSaviing.js',
	 layout:'vertical'
	 });

	 Titanium.UI.currentTab.open(newWin,{animation:true});*/
});
//win.add(sv);
scrollView.add(view);
win.add(scrollView);
win.open();
