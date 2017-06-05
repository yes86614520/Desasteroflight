using UnityEngine;
using System.Collections;

public class ObstacleController : MonoBehaviour {

	public ObstacleConf obstacleConf; //Obstacle configuration reference
	public HealthConf healthConf; //Obstacle health configuration reference

	private bool isKilled = false; //is obstacle killed?

	//All things which are checked on collision here
	public void OnCollisionEnter(Collision collision) {

		//layer 10 = Projectile, layer 13 = NpcProjectile
		if(collision.collider.gameObject.layer == 10
		|| collision.collider.gameObject.layer == 13) {
			Vector3 dir = collision.collider.GetComponent<Rigidbody>().velocity * -1;
			float damage = collision.collider.gameObject.GetComponent<ProjectileController>().projectileConf.damage;
			AddDamage(damage, dir, collision.collider.gameObject.layer);
		}

	}

	public void AddDamage(float damage, Vector3 direction, int layer) {

		isKilled = healthConf.ReduceHealth(damage);
		Hit(direction);
		if(isKilled) {
			Die(direction, layer);
		}

	}

	//Action when hit by projectile
	public void Hit(Vector3 direction) {
		
		if(obstacleConf.onHitEffectType == Effect.LegacyParticleEmitter) {
			GameObject p = Object.Instantiate(obstacleConf.onHitEffect, transform.position, transform.rotation) as GameObject;
			p.transform.parent = GlobalVars.trash;
			p.SetActive(true);
			p.GetComponent<ParticleEmitter>().Emit();
			Destroy(p, 5);
		}
		else
		if(obstacleConf.onHitEffectType == Effect.GameObjectSpawn) {
			for(int x = 1; x <= 5; x++) {
				GameObject s = Object.Instantiate(obstacleConf.onHitEffect, transform.position, transform.rotation) as GameObject;
				s.transform.parent = GlobalVars.trash;
				s.SetActive(true);
				s.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
			}
		}
		
		//SFX
		GlobalVars.AudioPlay(obstacleConf.sfxHit);

	}

	//Action when die by projectile
	public void Die(Vector3 direction, int layer) {
		
		StartCoroutine(WaitSeconds());
		
		Destroy(GetComponent<Collider>(), 0);
		
		if(obstacleConf.onDieEffectType == Effect.LegacyParticleEmitter) {
			gameObject.GetComponent<MeshRenderer>().enabled = false;
			GameObject p = Object.Instantiate(obstacleConf.onDieEffect, transform.position, transform.rotation) as GameObject;
			p.transform.parent = GlobalVars.trash;
			p.SetActive(true);
			p.GetComponent<ParticleEmitter>().Emit();
			Destroy(p, 5);
			Destroy(gameObject, 5);
		}
		else
		if(obstacleConf.onDieEffectType == Effect.GameObjectSpawn) {
			for(int x = 1; x <= 5; x++) {
				GameObject s = Object.Instantiate(obstacleConf.onDieEffect, transform.position, transform.rotation) as GameObject;
				s.transform.parent = GlobalVars.trash;
				s.SetActive(true);
				s.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
			}
			Destroy(gameObject, 0);
		}
		
		//SFX
		GlobalVars.AudioPlay(obstacleConf.sfxDie);
		
		if(layer == 10) {
			//XP
			GlobalVars.AddXp(obstacleConf.getXpOnKill);
			GlobalVars.values.SpawnValue("+" + obstacleConf.getXpOnKill, transform.position, obstacleConf.getXpColor);
		}
		
		//Kill loot
		if(obstacleConf.killLoot != null) {
			GameObject k = Object.Instantiate(obstacleConf.killLoot, transform.position, transform.rotation) as GameObject;
			k.transform.parent = GlobalVars.trash;
			k.SetActive(true);
			k.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
		}
		
		//impact radius
		if(obstacleConf.onDieImpactRadius > 0.0) {
			var hitColliders = Physics.OverlapSphere(transform.position, obstacleConf.onDieImpactRadius);
			for (var i = 0; i < hitColliders.Length; i++) {
				if(hitColliders[i].GetComponent<HealthConf>()
				&& !hitColliders[i].GetComponent<HealthConf>().IsDead()) {
					if(hitColliders[i].GetComponent<ObstacleController>()) {
						hitColliders[i].GetComponent<ObstacleController>().AddDamage(obstacleConf.onDieArealDamage, Vector3.zero, gameObject.layer);
					}
					if(hitColliders[i].GetComponent<NpcController>()) {
						hitColliders[i].GetComponent<NpcController>().AddDamage(obstacleConf.onDieArealDamage, Vector3.zero);
					}
					if(hitColliders[i].GetComponent<PlayerController>()) {
						hitColliders[i].GetComponent<PlayerController>().AddDamage(obstacleConf.onDieArealDamage, Vector3.zero);
					}
				}
				//add explosion force
				if(hitColliders[i].GetComponent<Rigidbody>()) {
					hitColliders[i].GetComponent<Rigidbody>().AddExplosionForce(obstacleConf.onDieArealDamage, transform.position, obstacleConf.onDieImpactRadius, 10.0f);
				}
			}
		}
		
		//CAMERA ANIMATIONS
		GlobalVars.CameraAnimationPlay(obstacleConf.onDieCameraAnimation);

	}
	
	IEnumerator WaitSeconds() {
	
        yield return new WaitForSeconds (obstacleConf.onDieEffectWaitSeconds);
		
    }
	
}
