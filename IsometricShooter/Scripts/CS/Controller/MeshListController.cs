using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MeshListController : MonoBehaviour {

	public int selectedMeshIndex = 0; //index of current Mesh at list of Meshs
	public List<MeshConf> meshList; //list of Meshs

	
	//select next Mesh
	public MeshConf SelectNextMesh() {

		if(selectedMeshIndex >= meshList.Count-1) {
			selectedMeshIndex = 0;
		} else {
			selectedMeshIndex++;
		}
		
		return GetMesh();

	}

	//select previous Mesh
	public MeshConf SelectPreviousMesh() {

		if(selectedMeshIndex <= 0) {
			selectedMeshIndex = meshList.Count-1;
		} else {
			selectedMeshIndex--;
		}
		
		return GetMesh();

	}

	//get current Mesh
	public MeshConf GetMesh() {

		//hide all Meshs
		for(int i = 0; i < meshList.Count; i++) {
			meshList[i].gameObject.SetActive(false);
		}
		
		//show selected Mesh only
		meshList[selectedMeshIndex].gameObject.SetActive(true);

		//get selected Mesh conf
		return meshList[selectedMeshIndex];

	}
	
}
