using UnityEngine;
using System.Collections;

public class ProjectileConf : MonoBehaviour {

	public Transform muzzlePosition; //Projectile trajectory starts here
	public ParticleEmitter muzzleFlash; //muzzle flash reference
	public ParticleEmitter muzzleSteam; //muzzle steam reference
	public float speed = 10.0f; //Speed of projectile
	public float lifetime = 2.0f; //Lifetime of projectile
	public int damage = 5; //Damage of projectile
	public int arealDamage = 0; //Areal damage in case of impact radius > 0
	public float impactRadius = 0.0f; //Damage radius
	public bool isBallistic = false; //has ballistic trajectory
	public float ballisticStrength = 0.0f; //use if ballistic = true and please set rigidbody constraint without freezed position
	public int amount = 1; //amount of projectiles to be spawned, 0 = no projectile
	public bool onHitDestroy = true; //true = destroyed at first hit, false = bounce within lifetime
	public GameObject onHitEffect; //Effect on hit any collider
	public AnimationClip onHitCameraAnimation;
	//SFX
	public AudioClip sfxImpact;
	
}
