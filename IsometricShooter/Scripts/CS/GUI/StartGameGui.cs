using UnityEngine;
using System.Collections;

public class StartGameGui : MonoBehaviour {

	public GameObject settingsContainer;
	public GameObject gameContainer;
	public MeshListController meshListSource;
	public MeshListController meshListTarget;
	public MapListController mapListSource;
	public MapListController mapListTarget;
	public PlayerController playerController;
	
	public void OnClick () {

		StartGame();

	}

	private void StartGame() {

		//Activate game
		gameContainer.SetActive(true);
		
		//Hide mouse cursor
		Cursor.visible = false;
		
		//Initialize game
		//Player
		meshListTarget.selectedMeshIndex = meshListSource.selectedMeshIndex;
		meshListTarget.GetMesh();
		
		//Map
		mapListTarget.selectedMapIndex = mapListSource.selectedMapIndex;
		mapListTarget.GetMap();
		mapListTarget.SaveInitialMapState();
		
		//Player position on map
		mapListTarget.SetPlayerPosition();
		
		//Not anymore game over
		GlobalVars.SetGameOver(false);
		
		//Reset kill count for each map
		GlobalVars.ResetKillCount();
		
		//Player reset health
		playerController.ResetPlayerHealth();
		
		if(GlobalVars.GetGameMode() == GameMode.Skirmish
		|| GlobalVars.GetCampaignMapIndex() == 0) {
			//Player weapons reset ammunition
			playerController.ResetPlayerWeapons();
			//Player XP
			GlobalVars.ResetXp();
		}
		
		settingsContainer.SetActive(false);

	}
	
}
