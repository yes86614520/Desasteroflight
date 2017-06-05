#pragma strict

var mapList : MapListController; //Reference to all maps
var title : UI.Text;
var subtitle : UI.Text;
var previousButton : GameObject;
var nextButton : GameObject;

private var selectedMap : MapConf; //currently selected map

function OnEnable () {

	if(GlobalVars.GetGameMode() == GameMode.Skirmish) {
		selectedMap = mapList.GetMap();
		title.text = selectedMap.title;
		subtitle.text = selectedMap.subtitle;
		previousButton.SetActive(true);
		nextButton.SetActive(true);
		//SFX
		GlobalVars.AudioPlay(selectedMap.sfxSelected);
	} else
	if(GlobalVars.GetGameMode() == GameMode.Campaign) {
		mapList.selectedMapIndex = GlobalVars.GetCampaignMapIndex();
		selectedMap = mapList.GetMap();
		title.text = selectedMap.title;
		subtitle.text = selectedMap.subtitle;
		previousButton.SetActive(false);
		nextButton.SetActive(false);
		//SFX
		GlobalVars.AudioPlay(selectedMap.sfxSelected);
	}

}

function Update () {

	if(GlobalVars.GetGameMode() == GameMode.Campaign) {
		if(mapList.selectedMapIndex != GlobalVars.GetCampaignMapIndex()) {
			mapList.selectedMapIndex = GlobalVars.GetCampaignMapIndex();
			selectedMap = mapList.GetMap();
			title.text = selectedMap.title;
			subtitle.text = selectedMap.subtitle;
			//SFX
			GlobalVars.AudioPlay(selectedMap.sfxSelected);
		}
	}

}

function OnClickPrevious () {

	selectedMap = mapList.SelectPreviousMap();
	title.text = selectedMap.title;
	subtitle.text = selectedMap.subtitle;
	//SFX
	GlobalVars.AudioPlay(selectedMap.sfxSelected);	

}

function OnClickNext () {

	selectedMap = mapList.SelectNextMap();
	title.text = selectedMap.title;
	subtitle.text = selectedMap.subtitle;
	//SFX
	GlobalVars.AudioPlay(selectedMap.sfxSelected);

}