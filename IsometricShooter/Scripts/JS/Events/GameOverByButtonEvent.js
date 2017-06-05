#pragma strict

var sfxActivate : AudioClip;

private var triggered : boolean = false;

//All collisions here
function OnCollisionEnter(collision : Collision) {

	//layer 8 = Player
	if(collision.collider.gameObject.layer == 8 
	&& !triggered) {
		triggered = true;
		GlobalVars.SetGameOver(true);
		//SFX
		GlobalVars.AudioPlay(sfxActivate);
	}

}