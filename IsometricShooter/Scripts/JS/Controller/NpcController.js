#pragma strict

import System.Collections.Generic; //enable lists

var meshContainer : GameObject; //mesh reference
var selectedWeapon : WeaponConf; //weapon reference
var npcConf : NpcConf; //NPC configuration reference
var healthConf : HealthConf; //NPC health configuration reference
var lookAt : SmoothLookAtXZ; //NPC looks at

private var nextFire : float = 0.0; //helper for fire rate
private var nextSpawn : float = 0.0; //helper for spawn rate
private var isKilled : boolean = false; //is the NPC killed?
private var distanceToPlayer : float; //distance to target
private var distanceToTarget : float; //distance to target
private var patrolPointIndex : int = 0; //current patrol point index

function Start () {

	if(!npcConf.target && GameObject.Find("Player")) {
		npcConf.target = GameObject.Find("Player").transform;
	}

}

function Update () {

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
			MoveToTarget(npcConf.patrolPointList[patrolPointIndex], 0.0);
			
			if(distanceToTarget <= 1.0) {
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
	var hit : RaycastHit;
	if(Physics.OverlapSphere(transform.position, GetComponent.<SphereCollider>().radius * transform.localScale.x + 0.1, 1 << 9).Length <= 0) {
		GetComponent.<Rigidbody>().velocity.y = Physics.gravity.y;
	} else {
		GetComponent.<Rigidbody>().velocity.y = 0.0;
	}
	
}

function LookAtTarget (target : Transform) {

	if(lookAt.target != target) {
		lookAt.target = target;
	}

}

//Move to specified target
function MoveToTarget (target : Transform, holdDistance : float) {

	distanceToTarget = Vector3.Distance(transform.position, target.position);
	
	LookAtTarget(target);

	var heading = target.position - transform.position;
	var distance = heading.magnitude;
	var direction = heading / distance;
	
	//hold position
	if(distanceToTarget <= holdDistance) {
		GetComponent.<Rigidbody>().velocity = direction * 0.0;
	} else {
		GetComponent.<Rigidbody>().velocity = direction * npcConf.speed;
	}

}

function ShootAtTarget (target : Transform, attackDistance : float) {

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
				var p = Instantiate(selectedWeapon.projectile.gameObject, transform.position, transform.rotation);
				p.transform.parent = GlobalVars.trash;
				p.GetComponent(ProjectileController).Init(target.position);
				selectedWeapon.currentAmmunition--;
				//SFX
				GlobalVars.AudioPlay(selectedWeapon.sfxShot);
			}
		}
	}

}

function CallUnits (target : Transform, sightDistance : float) {

	distanceToTarget = Vector3.Distance(transform.position, target.position);

	//spawn units when player is close enough
	if (distanceToTarget < sightDistance) {
		LookAtTarget(target);
		if(npcConf.unitSpawnList.Count > 0) {
			//Check spawn rate
			if(Time.time > nextSpawn) {
				var unitSpawn = npcConf.unitSpawnList[0];
				for(var i : int = 1; i < npcConf.unitSpawnList.Count; i++) {
					if(Vector3.Distance(unitSpawn.spawnPoint.position, target.position) > Vector3.Distance(npcConf.unitSpawnList[i].spawnPoint.position, target.position)) {
						unitSpawn = npcConf.unitSpawnList[i];
					}
				}
				if(unitSpawn.unit != null
				&& unitSpawn.spawnPoint != null) {
					nextSpawn = Time.time + unitSpawn.spawnRate;
					//create unit
					for(var c : int = 0; c < unitSpawn.amount; c++) {
						var pos = unitSpawn.spawnPoint.position;
						var tolerance = unitSpawn.amount * 1.0; //lower = narrow, higher = wide
						var p = Instantiate(unitSpawn.unit, Vector3(Random.Range(pos.x-tolerance, pos.x+tolerance), pos.y, Random.Range(pos.z-tolerance, pos.z+tolerance)), unitSpawn.spawnPoint.rotation);
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
function OnCollisionEnter(collision : Collision) {

	//layer 10 = Projectile (projectile hits the NPC)
	if(collision.collider.gameObject.layer == 10) {
		var dir = collision.collider.GetComponent.<Rigidbody>().velocity * -1;
		var damage = collision.collider.gameObject.GetComponent(ProjectileController).projectileConf.damage;
		AddDamage(damage, dir);
	}

}

function AddDamage(damage : float, direction : Vector3) {

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
		npcConf.sightDistance = distanceToPlayer + 1.0; //add tolerance value
	}

}

//Action when hit by projectile
function Hit(direction : Vector3) {

	//Either via particle emitter
	if(npcConf.onHitEffectType == Effect.LegacyParticleEmitter) {
		var p = Instantiate(npcConf.onHitEffect, transform.position, transform.rotation);
		p.transform.parent = GlobalVars.trash;
		p.SetActive(true);
		p.GetComponent(ParticleEmitter).Emit();
		Destroy(p, 5);
	}
	else //or via game object spawn
	if(npcConf.onHitEffectType == Effect.GameObjectSpawn) {
		for(var x : int = 1; x <= 5; x++) {
			var s = Instantiate(npcConf.onHitEffect, transform.position, transform.rotation);
			s.transform.parent = GlobalVars.trash;
			s.SetActive(true);
			s.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
		}
	}
	else //or via game object replace
	if(npcConf.onDieEffectType == Effect.GameObjectReplace) {
		var r = Instantiate(npcConf.onDieEffect, transform.position, transform.rotation);
		r.transform.parent = GlobalVars.trash;
		r.SetActive(true);
		r.GetComponent.<Rigidbody>().velocity = gameObject.GetComponent.<Rigidbody>().velocity * 0.1;
		Destroy(GetComponent.<Collider>(), 0);
		Destroy(gameObject, 0);
	}
	
	//SFX
	GlobalVars.AudioPlay(npcConf.sfxHit);

}

//Action when die by projectile
function Die(direction : Vector3) {
	
	//Kill loot
	if(npcConf.killLoot != null) {
		var k = Instantiate(npcConf.killLoot, transform.position, transform.rotation);
		k.transform.parent = GlobalVars.trash;
		k.SetActive(true);
		k.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
	}
	
	Destroy(GetComponent.<Collider>(), 0);
	
	//Either via particle emitter
	if(npcConf.onDieEffectType == Effect.LegacyParticleEmitter) {
		meshContainer.SetActive(false);
		selectedWeapon.gameObject.SetActive(false);
		var p = Instantiate(npcConf.onDieEffect, transform.position, transform.rotation);
		p.transform.parent = GlobalVars.trash;
		p.SetActive(true);
		p.GetComponent(ParticleEmitter).Emit();
		Destroy(gameObject, 5);
	}
	else //or via game object spawn
	if(npcConf.onDieEffectType == Effect.GameObjectSpawn) {
		for(var x : int = 1; x <= 5; x++) {
			var s = Instantiate(npcConf.onDieEffect, transform.position, transform.rotation);
			s.transform.parent = GlobalVars.trash;
			s.SetActive(true);
			s.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector() + gameObject.GetComponent.<Rigidbody>().velocity * 0.1;
		}
		Destroy(gameObject, 0);
	}
	else //or via game object replace
	if(npcConf.onDieEffectType == Effect.GameObjectReplace) {
		var r = Instantiate(npcConf.onDieEffect, transform.position, transform.rotation);
		r.transform.parent = GlobalVars.trash;
		r.SetActive(true);
		r.GetComponent.<Rigidbody>().velocity = gameObject.GetComponent.<Rigidbody>().velocity * 0.1;
		Destroy(GetComponent.<Collider>(), 0);
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