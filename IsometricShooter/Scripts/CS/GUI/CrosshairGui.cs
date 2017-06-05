using UnityEngine;
using System.Collections;

public class CrosshairGui : MonoBehaviour {

	public Camera playerCamera; //drop camera of player here
	public Transform playerAim; //drop aim-Transform of player here
	public GUITexture crosshair;

	// Use this for initialization
	void Start () {
	
		Cursor.visible = false; //hide mouse cursor
	
	}
	
	void OnGUI () {

		crosshair.transform.position = playerCamera.WorldToViewportPoint(playerAim.position);

	}
	
}
