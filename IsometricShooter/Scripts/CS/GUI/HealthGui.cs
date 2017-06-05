using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class HealthGui : MonoBehaviour {

	public HealthConf playerHealth; //Health reference of player
	public Text health; //GUI text to show health

	void OnGUI () {

		//health.text = playerHealth.currentHealth + " / " + playerHealth.maximumHealth;
		health.text = "" + playerHealth.currentHealth;

	}
	
}
