using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour {

	public GameObject gameContainer;
	public GameObject endContainer;
	public PlayerController playerController;
	public MapListController mapListController;
	
	// Update is called once per frame
	void Update () {
	
		if(GlobalVars.GetGameOver()) {
			endContainer.SetActive(true);
			Cursor.visible = true; //show mouse cursor
			mapListController.LoadInitialMapState();
			gameContainer.SetActive(false);
		}
	
	}
}
