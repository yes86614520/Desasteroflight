using UnityEngine;
using System.Collections;

public class HealthConf : MonoBehaviour {

	public float maximumHealth = 100.0f;
	public float currentHealth = 100.0f;
	public Color reduceColor = Color.red;
	public Color addColor = Color.green;

	//Reduce health by damage value
	public bool ReduceHealth(float damage) {

		currentHealth -= damage;
		
		//GUI
		GlobalVars.values.SpawnValue("-" + damage, transform.position, reduceColor);
		
		//Is this entity dead?
		return IsDead();

	}

	//Add health by health value
	public bool AddHealth(float health) {

		currentHealth += health;
		
		//GUI
		GlobalVars.values.SpawnValue("+" + health, transform.position, addColor);
		
		//Is health > max?
		if(currentHealth > maximumHealth) {
			currentHealth = maximumHealth;
		}
		
		return true;

	}

	public bool IsDead() {

		//Is this entity dead?
		if(currentHealth <= 0) {
			currentHealth = 0;
			return true;
		} else {
			return false;
		}

	}

	public void Reset() {

		currentHealth = maximumHealth;

	}
	
}
