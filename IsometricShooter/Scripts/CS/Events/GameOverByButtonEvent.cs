using UnityEngine;
using System.Collections;

public class GameOverByButtonEvent : MonoBehaviour {

	public AudioClip sfxActivate;

	private bool triggered = false;

	//All collisions here
	public void OnCollisionEnter(Collision collision) {

		//layer 8 = Player
		if(collision.collider.gameObject.layer == 8 
		&& !triggered) {
			triggered = true;
			GlobalVars.SetGameOver(true);
			//SFX
			GlobalVars.AudioPlay(sfxActivate);
		}

	}
	
}
