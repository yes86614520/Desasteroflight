#pragma strict

var mainContainer : GameObject;
var endContainer : GameObject;
var settingsContainer : GameObject;
var settingsMapList : MapListController;

function OnClick () {

	if(GlobalVars.GetGameMode() == GameMode.Campaign) {
		var i = GlobalVars.GetCampaignMapIndex();
		if(i < settingsMapList.mapList.Count-1) {
			i++;
			GlobalVars.SetCampaignMapIndex(i);
			settingsContainer.SetActive(true);
		} else {
			mainContainer.SetActive(true);
		}
	} else {
		mainContainer.SetActive(true);
	}
	
	Cursor.visible = true; //show mouse cursor		
	endContainer.SetActive(false);

}