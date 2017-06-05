using UnityEngine;
using System.Collections;

public class NpcController : MonoBehaviour {

	public GameObject meshContainer; //mesh reference
	public WeaponConf selectedWeapon; //weapon reference
	public NpcConf npcConf; //NPC configuration reference
	public HealthConf healthConf; //NPC health configuration reference
	public SmoothLookAtXZ lookAt; //NPC looks at

	private float nextFire = 0.0f; //helper for fire rate
	private float nextSpawn = 0.0f; //helper for spawn rate
	private bool isKilled = false; //is the NPC killed?
	private float distanceToPlayer; //distance to target
	private float distanceToTarget; //distance to target
	private int patrolPointIndex = 0; //current patrol point index

	// Use this for initialization
	void Start () {
	
		if(!npcConf.target && GameObject.Find("Player")) {
			npcConf.target = GameObject.Find("Player").transform;
		}
	
	}
	
	// Update is called once per frame
	void Update () {
	
		if(npcConf.target) {
		
			distanceToPlayer = Vector3.Distance(transform.position, npcConf.target.position);
			
			/* SIGHT */
			if(distanceToPlayer <= npcConf.sightDistance) {
				LookAtTarget(npcConf.target);
			}

			/* IDLE */
			if(npcConf.action == AiAction.Idle) {
				if(distanceToPlayer < npcConf.sightDistance) {
					npcConf.action = AiAction.Attack;
				}
			}
			
			/* PATROL */
			if(npcConf.action == AiAction.Patrol) {
				//move to target
				MoveToTarget(npcConf.patrolPointList[patrolPointIndex], 0.0f);
				
				if(distanceToTarget <= 1.0f) {
					patrolPointIndex++;
				}
				
				if(patrolPointIndex >= npcConf.patrolPointList.Count) {
					patrolPointIndex = 0;
				}
				
				if(distanceToPlayer < npcConf.sightDistance) {
					npcConf.action = AiAction.Attack;
				}
			}
			
			/* ATTACK */
			if(npcConf.action == AiAction.Attack) {
				//move to target
				MoveToTarget(npcConf.target, npcConf.holdDistance);
				
				//shoot at target
				ShootAtTarget(npcConf.target, npcConf.attackDistance);
			}
			
			/* HOLD */
			if(npcConf.action == AiAction.Hold) {
				if(distanceToPlayer <= npcConf.sightDistance) {
					//shoot at target
					ShootAtTarget(npcConf.target, npcConf.attackDistance);
				}
			}
			
			/* CALL */
			if(npcConf.action == AiAction.Call) {
				if(distanceToPlayer <= npcConf.sightDistance) {
					//move to target
					MoveToTarget(npcConf.target, npcConf.holdDistance);
					//shoot at target
					ShootAtTarget(npcConf.target, npcConf.attackDistance);
					//call units
					CallUnits(npcConf.target, npcConf.sightDistance);
				}
			}
			
			/* FREEZE */
			if(npcConf.action == AiAction.Freeze) {
				//do absolutely nothing at all ever
			}
			
		} else {
		
			npcConf.action = AiAction.Freeze;
		
		}
		
		//avoid NPC to "fly"
		if(Physics.OverlapSphere(transform.position, GetComponent<SphereCollider>().radius * transform.localScale.x + 0.1f, 1 << 9).Length <= 0) {
			GetComponent<Rigidbody>().velocity = new Vector3(GetComponent<Rigidbody>().velocity.x, Physics.gravity.y, GetComponent<Rigidbody>().velocity.z);
		} else {
			GetComponent<Rigidbody>().velocity = new Vector3(GetComponent<Rigidbody>().velocity.x, 0.0f, GetComponent<Rigidbody>().velocity.z);
		}
	
	}
	
	public void LookAtTarget (Transform target) {

		if(lookAt.target != target) {
			lookAt.target = target;
		}

	}

	//Move to specified target
	public void MoveToTarget (Transform target, float holdDistance) {

		distanceToTarget = Vector3.Distance(transform.position, target.position);
		
		LookAtTarget(target);

		var heading = target.position - transform.position;
		var distance = heading.magnitude;
		var direction = heading / distance;
		
		//hold position
		if(distanceToTarget <= holdDistance) {
			GetComponent<Rigidbody>().velocity = direction * 0.0f;
		} else {
			GetComponent<Rigidbody>().velocity = direction * npcConf.speed;
		}

	}

	public void ShootAtTarget (Transform target, float attackDistance) {

		distanceToTarget = Vector3.Distance(transform.position, target.position);

		//shoot in player's direction when close enough
		if (distanceToTarget < attackDistance) {
			LookAtTarget(target);
			//Check fire rate
			if(Time.time > nextFire) {
				//Sufficient ammo?
				if(selectedWeapon.currentAmmunition > 0) {
					nextFire = Time.time + selectedWeapon.fireRate;
					//create projectile
					GameObject p = Object.Instantiate(selectedWeapon.projectile.gameObject, transform.position, transform.rotation) as GameObject;
					p.transform.parent = GlobalVars.trash;
					p.GetComponent<ProjectileController>().Init(target.position);
					selectedWeapon.currentAmmunition--;
					//SFX
					GlobalVars.AudioPlay(selectedWeapon.sfxShot);
				}
			}
		}

	}

	public void CallUnits (Transform target, float sightDistance) {

		distanceToTarget = Vector3.Distance(transform.position, target.position);

		//spawn units when player is close enough
		if (distanceToTarget < sightDistance) {
			LookAtTarget(target);
			if(npcConf.unitSpawnList.Count > 0) {
				//Check spawn rate
				if(Time.time > nextSpawn) {
					var unitSpawn = npcConf.unitSpawnList[0];
					for(int i = 1; i < npcConf.unitSpawnList.Count; i++) {
						if(Vector3.Distance(unitSpawn.spawnPoint.position, target.position) > Vector3.Distance(npcConf.unitSpawnList[i].spawnPoint.position, target.position)) {
							unitSpawn = npcConf.unitSpawnList[i];
						}
					}
					if(unitSpawn.unit != null
					&& unitSpawn.spawnPoint != null) {
						nextSpawn = Time.time + unitSpawn.spawnRate;
						//create unit
						for(int c = 0; c < unitSpawn.amount; c++) {
							var pos = unitSpawn.spawnPoint.position;
							var tolerance = unitSpawn.amount * 1.0f; //lower = narrow, higher = wide
							GameObject p = Object.Instantiate(unitSpawn.unit, new Vector3(Random.Range(pos.x-tolerance, pos.x+tolerance), pos.y, Random.Range(pos.z-tolerance, pos.z+tolerance)), unitSpawn.spawnPoint.rotation) as GameObject;
							p.transform.parent = GlobalVars.trash;
							p.SetActive(true);
						}
						//SFX
						GlobalVars.AudioPlay(npcConf.sfxCall);
					}
				}
			}
		}

	}

	//All things which are checked on collision here
	public void OnCollisionEnter(Collision collision) {

		//layer 10 = Projectile (projectile hits the NPC)
		if(collision.collider.gameObject.layer == 10) {
			Vector3 dir = collision.collider.GetComponent<Rigidbody>().velocity * -1;
			float damage = collision.collider.gameObject.GetComponent<ProjectileController>().projectileConf.damage;
			AddDamage(damage, dir);
		}

	}

	public void AddDamage(float damage, Vector3 direction) {

		if(!isKilled) {
			isKilled = healthConf.ReduceHealth(damage);
			Hit(direction);
			if(isKilled) {
				Die(direction);
			}
		}
		
		//a damaged NPC attacks you
		if(npcConf.action == AiAction.Idle
		|| npcConf.action == AiAction.Patrol) {
			npcConf.action = AiAction.Attack;
		}
		//in CALL mode, a damaged NPC recognizes you
		if(npcConf.action == AiAction.Call
		&& npcConf.sightDistance < distanceToPlayer) {
			npcConf.sightDistance = distanceToPlayer + 1.0f; //add tolerance value
		}

	}

	//Action when hit by projectile
	public void Hit(Vector3 direction) {

		//Either via particle emitter
		if(npcConf.onHitEffectType == Effect.LegacyParticleEmitter) {
			GameObject p = Object.Instantiate(npcConf.onHitEffect, transform.position, transform.rotation) as GameObject;
			p.transform.parent = GlobalVars.trash;
			p.SetActive(true);
			p.GetComponent<ParticleEmitter>().Emit();
			Destroy(p, 5);
		}
		else //or via game object spawn
		if(npcConf.onHitEffectType == Effect.GameObjectSpawn) {
			for(int x = 1; x <= 5; x++) {
				GameObject s = Object.Instantiate(npcConf.onHitEffect, transform.position, transform.rotation) as GameObject;
				s.transform.parent = GlobalVars.trash;
				s.SetActive(true);
				s.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
			}
		}
		else //or via game object replace
		if(npcConf.onDieEffectType == Effect.GameObjectReplace) {
			GameObject r = Object.Instantiate(npcConf.onDieEffect, transform.position, transform.rotation) as GameObject;
			r.transform.parent = GlobalVars.trash;
			r.SetActive(true);
			r.GetComponent<Rigidbody>().velocity = gameObject.GetComponent<Rigidbody>().velocity * 0.1f;
			Destroy(GetComponent<Collider>(), 0);
			Destroy(gameObject, 0);
		}
		
		//SFX
		GlobalVars.AudioPlay(npcConf.sfxHit);

	}

	//Action when die by projectile
	public void Die(Vector3 direction) {
		
		//Kill loot
		if(npcConf.killLoot != null) {
			GameObject k = Object.Instantiate(npcConf.killLoot, transform.position, transform.rotation) as GameObject;
			k.transform.parent = GlobalVars.trash;
			k.SetActive(true);
			k.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
		}
		
		Destroy(GetComponent<Collider>(), 0);
		
		//Either via particle emitter
		if(npcConf.onDieEffectType == Effect.LegacyParticleEmitter) {
			meshContainer.SetActive(false);
			selectedWeapon.gameObject.SetActive(false);
			GameObject p = Object.Instantiate(npcConf.onDieEffect, transform.position, transform.rotation) as GameObject;
			p.transform.parent = GlobalVars.trash;
			p.SetActive(true);
			p.GetComponent<ParticleEmitter>().Emit();
			Destroy(gameObject, 5);
		}
		else //or via game object spawn
		if(npcConf.onDieEffectType == Effect.GameObjectSpawn) {
			for(int x = 1; x <= 5; x++) {
				GameObject s = Object.Instantiate(npcConf.onDieEffect, transform.position, transform.rotation) as GameObject;
				s.transform.parent = GlobalVars.trash;
				s.SetActive(true);
				s.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector() + gameObject.GetComponent<Rigidbody>().velocity * 0.1f;
			}
			Destroy(gameObject, 0);
		}
		else //or via game object replace
		if(npcConf.onDieEffectType == Effect.GameObjectReplace) {
			GameObject r = Object.Instantiate(npcConf.onDieEffect, transform.position, transform.rotation) as GameObject;
			r.transform.parent = GlobalVars.trash;
			r.SetActive(true);
			r.GetComponent<Rigidbody>().velocity = gameObject.GetComponent<Rigidbody>().velocity * 0.1f;
			Destroy(GetComponent<Collider>(), 0);
			Destroy(gameObject, 0);
		}
		
		//SFX
		GlobalVars.AudioPlay(npcConf.sfxScream);
		GlobalVars.AudioPlay(npcConf.sfxDie);
		
		//XP
		GlobalVars.AddXp(npcConf.getXpOnKill);
		GlobalVars.values.SpawnValue("+" + npcConf.getXpOnKill, transform.position, npcConf.getXpColor);
		
		//Kill count
		GlobalVars.AddKillCount();

	}
	
}
