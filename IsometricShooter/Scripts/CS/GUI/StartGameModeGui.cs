using UnityEngine;
using System.Collections;

public class StartGameModeGui : MonoBehaviour {

	public GameMode gameMode = GameMode.Campaign;
	public GameObject mainContainer;
	public GameObject settingsContainer;
	
	public void OnClick () {

		if(gameMode == GameMode.Campaign) {
			GlobalVars.SetCampaignMapIndex(0);
		}
		GlobalVars.SetGameMode(gameMode);
		settingsContainer.SetActive(true);
		mainContainer.SetActive(false);

	}
	
}
