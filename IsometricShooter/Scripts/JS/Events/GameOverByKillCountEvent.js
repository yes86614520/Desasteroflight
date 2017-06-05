#pragma strict

var killCount : int = 1;

function Update () {

	if(!GlobalVars.GetGameOver()) {
		if(GlobalVars.GetKillCount() >= killCount) {
			GlobalVars.SetGameOver(true);
		}
	}

}