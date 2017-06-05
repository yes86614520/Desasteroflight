#pragma strict

var mainContainer : GameObject;
var settingsContainer : GameObject;
var endContainer : GameObject;

function OnClick () {

	settingsContainer.SetActive(false);
	endContainer.SetActive(false);
	mainContainer.SetActive(true);

}