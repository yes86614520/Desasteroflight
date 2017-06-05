using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MaterialByAngleY : MonoBehaviour {

	public Transform directionReference;
	public MeshRenderer materialTarget;
	public List<DirectionMaterial> materialList; //list of DirectionMaterial

	private Material currentMaterial;
	
	// Update is called once per frame
	void Update () {
	
		for(int i = 0; i < materialList.Count; i++) {
			DirectionMaterial m = materialList[i];
			if(directionReference.eulerAngles.y >= m.fromAngle
			&& directionReference.eulerAngles.y <= m.toAngle) {
				if(currentMaterial != m.material) {
					currentMaterial = m.material;
					materialTarget.material = currentMaterial;
				}
			}
		}
	
	}
}
