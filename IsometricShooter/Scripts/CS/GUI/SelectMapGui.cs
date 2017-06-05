using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SelectMapGui : MonoBehaviour {

	public MapListController mapList; //Reference to all maps
	public Text title;
	public Text subtitle;
	public GameObject previousButton;
	public GameObject nextButton;
	
	private MapConf selectedMap; //currently selected map
	
	void OnEnable () {

		if(GlobalVars.GetGameMode() == GameMode.Skirmish) {
			selectedMap = mapList.GetMap();
			title.text = selectedMap.title;
			subtitle.text = selectedMap.subtitle;
			previousButton.SetActive(true);
			nextButton.SetActive(true);
			//SFX
			GlobalVars.AudioPlay(selectedMap.sfxSelected);
		} else
		if(GlobalVars.GetGameMode() == GameMode.Campaign) {
			mapList.selectedMapIndex = GlobalVars.GetCampaignMapIndex();
			selectedMap = mapList.GetMap();
			title.text = selectedMap.title;
			subtitle.text = selectedMap.subtitle;
			previousButton.SetActive(false);
			nextButton.SetActive(false);
			//SFX
			GlobalVars.AudioPlay(selectedMap.sfxSelected);
		}

	}
	
	// Update is called once per frame
	void Update () {
	
		if(GlobalVars.GetGameMode() == GameMode.Campaign) {
			if(mapList.selectedMapIndex != GlobalVars.GetCampaignMapIndex()) {
				mapList.selectedMapIndex = GlobalVars.GetCampaignMapIndex();
				selectedMap = mapList.GetMap();
				title.text = selectedMap.title;
				subtitle.text = selectedMap.subtitle;
				//SFX
				GlobalVars.AudioPlay(selectedMap.sfxSelected);
			}
		}
	
	}
	
	public void OnClickPrevious () {

		selectedMap = mapList.SelectPreviousMap();
		title.text = selectedMap.title;
		subtitle.text = selectedMap.subtitle;
		//SFX
		GlobalVars.AudioPlay(selectedMap.sfxSelected);	

	}

	public void OnClickNext () {

		selectedMap = mapList.SelectNextMap();
		title.text = selectedMap.title;
		subtitle.text = selectedMap.subtitle;
		//SFX
		GlobalVars.AudioPlay(selectedMap.sfxSelected);

	}
}
