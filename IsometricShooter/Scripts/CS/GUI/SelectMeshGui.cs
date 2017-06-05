using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SelectMeshGui : MonoBehaviour {

	public MeshListController meshList; //Reference to all meshs
	public Text title;
	public GameObject previousButton;
	public GameObject nextButton;
	
	private MeshConf selectedMesh; //currently selected mesh

	void OnEnable () {

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

	public void OnClickPrevious () {
		
		selectedMesh = meshList.SelectPreviousMesh();
		title.text = selectedMesh.title;
		//SFX
		GlobalVars.AudioPlay(selectedMesh.sfxSelected);

	}

	public void OnClickNext () {
		
		selectedMesh = meshList.SelectNextMesh();
		title.text = selectedMesh.title;
		//SFX
		GlobalVars.AudioPlay(selectedMesh.sfxSelected);
			
	}
	
}
