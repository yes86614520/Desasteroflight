#pragma strict

var settingsContainer : GameObject;
var gameContainer : GameObject;
var meshListSource : MeshListController;
var meshListTarget : MeshListController;
var mapListSource : MapListController;
var mapListTarget : MapListController;
var playerController : PlayerController;

function OnClick () {

	StartGame();

}

function StartGame() {

	//Activate game
	gameContainer.SetActive(true);
	
	//Hide mouse cursor
	Cursor.visible = false;
	
	//Initialize game
	//Player
	meshListTarget.selectedMeshIndex = meshListSource.selectedMeshIndex;
	meshListTarget.GetMesh();
	
	//Map
	mapListTarget.selectedMapIndex = mapListSource.selectedMapIndex;
	mapListTarget.GetMap();
	mapListTarget.SaveInitialMapState();
	
	//Player position on map
	mapListTarget.SetPlayerPosition();
	
	//Not anymore game over
	GlobalVars.SetGameOver(false);
	
	//Reset kill count for each map
	GlobalVars.ResetKillCount();
	
	//Player reset health
	playerController.ResetPlayerHealth();
	
	if(GlobalVars.GetGameMode() == GameMode.Skirmish
	|| GlobalVars.GetCampaignMapIndex() == 0) {
		//Player weapons reset ammunition
		playerController.ResetPlayerWeapons();
		//Player XP
		GlobalVars.ResetXp();
	}
	
	settingsContainer.SetActive(false);

}