#pragma strict

var playerCamera : Camera;

private var cube : GameObject;

function Update () {
	
	transform.position = playerCamera.WorldToViewportPoint(cube.transform.position);

}

function SetCube(cubeObject : GameObject) {

	cube = cubeObject;

}