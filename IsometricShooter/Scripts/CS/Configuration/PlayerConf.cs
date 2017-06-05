using UnityEngine;
using System.Collections;

public class PlayerConf : MonoBehaviour {

	public string nickname = "Player";  //Nickname of player
	public float speedHorizontal = 5.0f; //Speed at horizontal movement
	public float speedVertical = 5.0f; //Speed at vertical movement
	public float speedJump = 5.0f; //Speed at jump movement
	public GameObject onHitEffect; //Effect on hit by projectile
	public Effect onHitEffectType; //Type of effect on hit by projectile
	public GameObject onDieEffect; //Effect on die by projectile
	public Effect onDieEffectType; //Type of effect on die by projectile
	public AudioClip sfxHit; //Audio to be played in case of bullet hit
	public AudioClip sfxDie; //Audio to be played in case of death
	public AudioClip sfxScream; //Audio to be played in case of scream
	
}
