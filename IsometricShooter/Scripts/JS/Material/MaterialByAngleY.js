#pragma strict

import System.Collections.Generic; //enable lists

var directionReference : Transform;
var materialTarget : MeshRenderer;
var materialList : List.<DirectionMaterial>; //list of DirectionMaterial

private var currentMaterial : Material;

function Update () {

	for(var i : int = 0; i < materialList.Count; i++) {
		var m = materialList[i];
		if(directionReference.eulerAngles.y >= m.fromAngle
		&& directionReference.eulerAngles.y <= m.toAngle) {
			if(currentMaterial != m.material) {
				currentMaterial = m.material;
				materialTarget.material = currentMaterial;
			}
		}
	}

}