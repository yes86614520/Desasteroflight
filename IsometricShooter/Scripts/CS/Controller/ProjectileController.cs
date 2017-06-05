using UnityEngine;
using System.Collections;

public class ProjectileController : MonoBehaviour {

	public ProjectileConf projectileConf; //Projectile configuration reference

	private bool processing = false; //helper to check processing of projectile
	private Vector3 velocity; //helper for velocity of projectile

	// Use this for initialization
	void Start () {
	
		//muzzle flash
		if(projectileConf.muzzleFlash != null) {
			GameObject mf = Object.Instantiate(projectileConf.muzzleFlash.gameObject, projectileConf.muzzleFlash.transform.position, projectileConf.muzzleFlash.transform.rotation);
			mf.transform.parent = GlobalVars.trash;
			mf.GetComponent<ParticleEmitter>().Emit();
			Destroy(mf, 5);
		}
		
		//muzzle steam
		if(projectileConf.muzzleSteam != null) {
			GameObject ms = Object.Instantiate(projectileConf.muzzleSteam.gameObject, projectileConf.muzzleSteam.transform.position, projectileConf.muzzleSteam.transform.rotation);
			ms.transform.parent = GlobalVars.trash;
			ms.GetComponent<ParticleEmitter>().Emit();
			Destroy(ms, 5);
		}
	
	}
	
	// Update is called once per frame
	void Update () {
	
		//if projectile is processing, it moves
		if(processing) {
			if(projectileConf.isBallistic) {
				GetComponent<Rigidbody>().AddForce (velocity);
				processing = false;
			} else {
				GetComponent<Rigidbody>().velocity = velocity;
			}
		}
	
	}
	
	//Create projectile
	public void Init(Vector3 aimPos) {

		gameObject.SetActive(true);
		
		var originPos = (projectileConf.muzzlePosition != null) ? projectileConf.muzzlePosition.position : transform.position;
		transform.position = originPos;
		
		var heading = aimPos - originPos;
		var distance = heading.magnitude;
		var direction = heading / distance;
		
		//ballistic projectile?
		if(projectileConf.isBallistic) {
			direction.y += projectileConf.ballisticStrength;
			direction.x *= projectileConf.ballisticStrength * distance/10;
			direction.z *= projectileConf.ballisticStrength * distance/10;
		} else if(projectileConf.amount > 1) {
			var tolerance = projectileConf.amount * 0.05f;
			direction = new Vector3(Random.Range(direction.y-tolerance, direction.y+tolerance), Random.Range(direction.x-tolerance, direction.x+tolerance), Random.Range(direction.z-tolerance, direction.z+tolerance));
		}
		
		velocity = direction * projectileConf.speed;
		Destroy(gameObject, projectileConf.lifetime);
		processing = true;

	}

	//Collision events
	public void OnCollisionEnter(Collision collision) {

		processing = false;
		
		if(projectileConf.onHitDestroy) {
			Destroy(gameObject, 0.0f);
		}
		
		//on hit effect, e.g. projectile hit collider of obstacle
		GameObject h = Object.Instantiate(projectileConf.onHitEffect, transform.position, transform.rotation) as GameObject;
		h.transform.parent = GlobalVars.trash;
		h.GetComponent<ParticleEmitter>().Emit();
		Destroy(h, 5);
		
		//impact radius
		if(projectileConf.impactRadius > 0.0) {
			var hitColliders = Physics.OverlapSphere(transform.position, projectileConf.impactRadius);
			for (var i = 0; i < hitColliders.Length; i++) {
				//Debug.Log(hitColliders[i].name);
				//add damage
				if(hitColliders[i].GetComponent<HealthConf>()
				&& !hitColliders[i].GetComponent<HealthConf>().IsDead()) {
					if(hitColliders[i].GetComponent<ObstacleController>()) {
						hitColliders[i].GetComponent<ObstacleController>().AddDamage(projectileConf.arealDamage, Vector3.zero, gameObject.layer);
					}
					if(hitColliders[i].GetComponent<NpcController>()) {
						hitColliders[i].GetComponent<NpcController>().AddDamage(projectileConf.arealDamage, Vector3.zero);
					}
				}
				//add explosion force
				if(hitColliders[i].GetComponent<Rigidbody>()) {
					hitColliders[i].GetComponent<Rigidbody>().AddExplosionForce(projectileConf.arealDamage, transform.position, projectileConf.impactRadius, 10.0f);
				}
			}
		}
		
		//SFX
		GlobalVars.AudioPlay(projectileConf.sfxImpact);
		
		//CAMERA ANIMATIONS
		GlobalVars.CameraAnimationPlay(projectileConf.onHitCameraAnimation);

	}
	
}
