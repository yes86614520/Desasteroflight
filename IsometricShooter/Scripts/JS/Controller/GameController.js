#pragma strict

var gameContainer : GameObject;
var endContainer : GameObject;
var playerController : PlayerController;
var mapListController : MapListController;

function Update () {

	if(GlobalVars.GetGameOver()) {
		endContainer.SetActive(true);
		Cursor.visible = true; //show mouse cursor
		mapListController.LoadInitialMapState();
		gameContainer.SetActive(false);
	}

}