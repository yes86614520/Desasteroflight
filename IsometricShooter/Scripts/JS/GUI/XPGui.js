#pragma strict

var xp : UI.Text; //GUI text to show xp

function OnGUI () {

	xp.text = "" + GlobalVars.GetXpValue();

}