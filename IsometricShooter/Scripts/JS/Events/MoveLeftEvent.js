#pragma strict

var object : Transform;
var newPositionZ : float;
var speed : float = 1.0;
var triggerOnStart : boolean = false;
var sfxActivate : AudioClip;

private var triggered : boolean = false;
private var processing : boolean = false;

function Start () {

	if(triggerOnStart) {
		TriggerEvent();
	}

}

function Update () {

	if(processing) {
		if(object.localPosition.z < newPositionZ) {
			object.localPosition.z += newPositionZ * Time.deltaTime * speed;
		} else {
			processing = false;
		}
	}

}

//All collisions here
function OnCollisionEnter (collision : Collision) {

	//layer 8 = Player
	if(collision.collider.gameObject.layer == 8) {
		TriggerEvent();
	}

}

function TriggerEvent () {

	if(!triggered) {
		triggered = true;
		processing = true;
		//SFX
		GlobalVars.AudioPlay(sfxActivate);
	}

}