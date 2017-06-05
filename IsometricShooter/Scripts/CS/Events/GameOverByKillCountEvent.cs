using UnityEngine;
using System.Collections;

public class GameOverByKillCountEvent : MonoBehaviour {

	public int killCount = 1;
	
	// Update is called once per frame
	void Update () {
	
		if(!GlobalVars.GetGameOver()) {
			if(GlobalVars.GetKillCount() >= killCount) {
				GlobalVars.SetGameOver(true);
			}
		}
	
	}
}
