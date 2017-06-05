using UnityEngine;
using System.Collections;

public class ReStartGameGui : MonoBehaviour {

	public GameObject mainContainer;
	public GameObject endContainer;
	public GameObject settingsContainer;
	public MapListController settingsMapList;

	public void OnClick () {

		if(GlobalVars.GetGameMode() == GameMode.Campaign) {
			var i = GlobalVars.GetCampaignMapIndex();
			if(i < settingsMapList.mapList.Count-1) {
				i++;
				GlobalVars.SetCampaignMapIndex(i);
				settingsContainer.SetActive(true);
			} else {
				mainContainer.SetActive(true);
			}
		} else {
			mainContainer.SetActive(true);
		}
		
		Cursor.visible = true; //show mouse cursor		
		endContainer.SetActive(false);

	}
	
}
