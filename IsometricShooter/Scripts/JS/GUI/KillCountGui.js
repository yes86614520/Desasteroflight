#pragma strict

var killCount : UI.Text; //GUI text to show kill count

function OnGUI () {

	killCount.text = "" + GlobalVars.GetKillCount();

}