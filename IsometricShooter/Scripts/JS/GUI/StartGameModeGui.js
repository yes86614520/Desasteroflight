#pragma strict

var gameMode : GameMode = GameMode.Campaign;
var mainContainer : GameObject;
var settingsContainer : GameObject;

function OnClick () {

	if(gameMode == GameMode.Campaign) {
		GlobalVars.SetCampaignMapIndex(0);
	}
	GlobalVars.SetGameMode(gameMode);
	settingsContainer.SetActive(true);
	mainContainer.SetActive(false);

}