#pragma strict

var playerHealth : HealthConf; //Health reference of player
var health : UI.Text; //GUI text to show health

function OnGUI () {

	//health.text = playerHealth.currentHealth + " / " + playerHealth.maximumHealth;
	health.text = "" + playerHealth.currentHealth;

}