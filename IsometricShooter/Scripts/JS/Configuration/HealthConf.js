#pragma strict

var maximumHealth : int = 100;
var currentHealth : int = 100;
var reduceColor : Color = Color.red;
var addColor : Color = Color.green;

//Reduce health by damage value
function ReduceHealth(damage : int) {

	currentHealth -= damage;
	
	//GUI
	GlobalVars.values.SpawnValue("-" + damage, transform.position, reduceColor);
	
	//Is this entity dead?
	return IsDead();

}

//Add health by health value
function AddHealth(health : int) {

	currentHealth += health;
	
	//GUI
	GlobalVars.values.SpawnValue("+" + health, transform.position, addColor);
	
	//Is health > max?
	if(currentHealth > maximumHealth) {
		currentHealth = maximumHealth;
	}
	
	return true;

}

function IsDead() {

	//Is this entity dead?
	if(currentHealth <= 0) {
		currentHealth = 0;
		return true;
	} else {
		return false;
	}

}

function Reset() {

	currentHealth = maximumHealth;

}