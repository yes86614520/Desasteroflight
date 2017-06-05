using UnityEngine;
using System.Collections;

public class ValueTextGui : MonoBehaviour {

	public Camera playerCamera;

	private GameObject cube;
	
	// Update is called once per frame
	void Update () {
	
		transform.position = playerCamera.WorldToViewportPoint(cube.transform.position);
	
	}
	
	public void SetCube(GameObject cubeObject) {

		cube = cubeObject;

	}
	
}
