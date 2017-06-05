#pragma strict

var playerCamera : Camera; //drop camera of player here
var playerAim : Transform; //drop aim-Transform of player here
var crosshair : GUITexture;

function Start () {

	Cursor.visible = false; //hide mouse cursor

}

function OnGUI () {

	crosshair.transform.position = playerCamera.WorldToViewportPoint(playerAim.position);

}