#pragma strict

import System.Collections.Generic; //enable lists

var selectedMeshIndex : int = 0; //index of current Mesh at list of Meshs
var meshList : List.<MeshConf>; //list of Meshs

//select next Mesh
function SelectNextMesh() {

	if(selectedMeshIndex >= meshList.Count-1) {
		selectedMeshIndex = 0;
	} else {
		selectedMeshIndex++;
	}
	
	return GetMesh();

}

//select previous Mesh
function SelectPreviousMesh() {

	if(selectedMeshIndex <= 0) {
		selectedMeshIndex = meshList.Count-1;
	} else {
		selectedMeshIndex--;
	}
	
	return GetMesh();

}

//get current Mesh
function GetMesh() {

	//hide all Meshs
	for(var i : int = 0; i < meshList.Count; i++) {
		meshList[i].gameObject.SetActive(false);
	}
	
	//show selected Mesh only
	meshList[selectedMeshIndex].gameObject.SetActive(true);

	//get selected Mesh conf
	return meshList[selectedMeshIndex];

}