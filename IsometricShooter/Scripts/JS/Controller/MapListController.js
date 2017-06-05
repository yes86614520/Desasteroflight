#pragma strict

import System.Collections.Generic; //enable lists

var selectedMapIndex : int = 0; //index of current Map at list of Maps
var mapList : List.<MapConf>; //list of Maps
var playerTransform : Transform;

private var selectedMap : MapConf;
private var initialMapState : GameObject = null;

//select next Map
function SelectNextMap() {

	if(selectedMapIndex >= mapList.Count-1) {
		selectedMapIndex = 0;
	} else {
		selectedMapIndex++;
	}
	
	return GetMap();

}

//select previous Map
function SelectPreviousMap() {

	if(selectedMapIndex <= 0) {
		selectedMapIndex = mapList.Count-1;
	} else {
		selectedMapIndex--;
	}
	
	return GetMap();

}

//get current Map
function GetMap() {

	//hide all Maps
	for(var i : int = 0; i < mapList.Count; i++) {
		mapList[i].gameObject.SetActive(false);
	}
	
	//get selected Map conf
	selectedMap = mapList[selectedMapIndex];
	
	//show selected Map only
	selectedMap.gameObject.SetActive(true);
	
	return selectedMap;

}

function SetPlayerPosition() {

	playerTransform.position = selectedMap.playerPosition;

}

function SaveInitialMapState() {

	initialMapState = Instantiate(selectedMap.gameObject, selectedMap.gameObject.transform.position, selectedMap.gameObject.transform.rotation);
	initialMapState.name = selectedMap.gameObject.name;
	initialMapState.transform.parent = transform;
	initialMapState.SetActive(false);

}

function LoadInitialMapState() {

	if(initialMapState != null
	&& initialMapState.GetComponent(MapConf) != null) {
		mapList[selectedMapIndex] = initialMapState.GetComponent(MapConf);
		Destroy(selectedMap.gameObject);
		initialMapState.SetActive(true);
	}

}