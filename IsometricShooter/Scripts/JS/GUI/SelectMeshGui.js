#pragma strict

var meshList : MeshListController; //Reference to all meshs
var title : UI.Text;
var previousButton : GameObject;
var nextButton : GameObject;

private var selectedMesh : MeshConf; //currently selected mesh

function OnEnable () {

	selectedMesh = meshList.GetMesh();
	title.text = selectedMesh.title;
	
	if(meshList.meshList.Count > 1) {
		previousButton.SetActive(true);
		nextButton.SetActive(true);
	} else {
		previousButton.SetActive(false);
		nextButton.SetActive(false);
	}

}

function OnClickPrevious () {
	
	selectedMesh = meshList.SelectPreviousMesh();
	title.text = selectedMesh.title;
	//SFX
	GlobalVars.AudioPlay(selectedMesh.sfxSelected);

}

function OnClickNext () {
	
	selectedMesh = meshList.SelectNextMesh();
	title.text = selectedMesh.title;
	//SFX
	GlobalVars.AudioPlay(selectedMesh.sfxSelected);
		
}