using UnityEngine;
using System.Collections;

public class MoveLeftEvent : MonoBehaviour {

	public Transform targetObject;
	public float newPositionZ;
	public float speed = 1.0f;
	public bool triggerOnStart = false;
	public AudioClip sfxActivate;

	private bool triggered = false;
	private bool processing = false;

	// Use this for initialization
	void Start () {
	
		if(triggerOnStart) {
			TriggerEvent();
		}
	
	}
	
	// Update is called once per frame
	void Update () {
	
		if(processing) {
			if(targetObject.localPosition.z < newPositionZ) {
				float newZ = targetObject.localPosition.z + newPositionZ * Time.deltaTime * speed;
				targetObject.localPosition = new Vector3(targetObject.localPosition.x, targetObject.localPosition.y, newZ);
				
			} else {
				processing = false;
			}
		}
	
	}

	//All collisions here
	public void OnCollisionEnter (Collision collision) {

		//layer 8 = Player
		if(collision.collider.gameObject.layer == 8) {
			TriggerEvent();
		}

	}

	public void TriggerEvent () {

		if(!triggered) {
			triggered = true;
			processing = true;
			//SFX
			GlobalVars.AudioPlay(sfxActivate);
		}

	}
}
