#pragma strict

var uiXP : UI.Text;
var uiKills : UI.Text;

private var statsText = "";

function OnEnable () {

	uiXP.text = "" + GlobalVars.GetXpValue();
	uiKills.text = "" + GlobalVars.GetKillCount();

}