#pragma strict

var obstacleConf : ObstacleConf; //Obstacle configuration reference
var healthConf : HealthConf; //Obstacle health configuration reference

private var isKilled : boolean = false; //is obstacle killed?

//All things which are checked on collision here
function OnCollisionEnter(collision : Collision) {

	//layer 10 = Projectile, layer 13 = NpcProjectile
	if(collision.collider.gameObject.layer == 10
	|| collision.collider.gameObject.layer == 13) {
		var dir = collision.collider.GetComponent.<Rigidbody>().velocity * -1;
		var damage = collision.collider.gameObject.GetComponent(ProjectileController).projectileConf.damage;
		AddDamage(damage, dir, collision.collider.gameObject.layer);
	}

}

function AddDamage(damage : float, direction : Vector3, layer : int) {

	isKilled = healthConf.ReduceHealth(damage);
	Hit(direction);
	if(isKilled) {
		Die(direction, layer);
	}

}

//Action when hit by projectile
function Hit(direction : Vector3) {
	
	if(obstacleConf.onHitEffectType == Effect.LegacyParticleEmitter) {
		var p = Instantiate(obstacleConf.onHitEffect, transform.position, transform.rotation);
		p.transform.parent = GlobalVars.trash;
		p.SetActive(true);
		p.GetComponent(ParticleEmitter).Emit();
		Destroy(p, 5);
	}
	else
	if(obstacleConf.onHitEffectType == Effect.GameObjectSpawn) {
		for(var x : int = 1; x <= 5; x++) {
			var s = Instantiate(obstacleConf.onHitEffect, transform.position, transform.rotation);
			s.transform.parent = GlobalVars.trash;
			s.SetActive(true);
			s.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
		}
	}
	
	//SFX
	GlobalVars.AudioPlay(obstacleConf.sfxHit);

}

//Action when die by projectile
function Die(direction : Vector3, layer : int) {
	
	yield WaitForSeconds (obstacleConf.onDieEffectWaitSeconds);
	
	Destroy(GetComponent.<Collider>(), 0);
	
	if(obstacleConf.onDieEffectType == Effect.LegacyParticleEmitter) {
		gameObject.GetComponent(MeshRenderer).enabled = false;
		var p = Instantiate(obstacleConf.onDieEffect, transform.position, transform.rotation);
		p.transform.parent = GlobalVars.trash;
		p.SetActive(true);
		p.GetComponent(ParticleEmitter).Emit();
		Destroy(p, 5);
		Destroy(gameObject, 5);
	}
	else
	if(obstacleConf.onDieEffectType == Effect.GameObjectSpawn) {
		for(var x : int = 1; x <= 5; x++) {
			var s = Instantiate(obstacleConf.onDieEffect, transform.position, transform.rotation);
			s.transform.parent = GlobalVars.trash;
			s.SetActive(true);
			s.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
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
		var k = Instantiate(obstacleConf.killLoot, transform.position, transform.rotation);
		k.transform.parent = GlobalVars.trash;
		k.SetActive(true);
		k.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
	}
	
	//impact radius
	if(obstacleConf.onDieImpactRadius > 0.0) {
		var hitColliders = Physics.OverlapSphere(transform.position, obstacleConf.onDieImpactRadius);
		for (var i = 0; i < hitColliders.Length; i++) {
			if(hitColliders[i].GetComponent(HealthConf)
			&& !hitColliders[i].GetComponent(HealthConf).IsDead()) {
				if(hitColliders[i].GetComponent(ObstacleController)) {
					hitColliders[i].GetComponent(ObstacleController).AddDamage(obstacleConf.onDieArealDamage, Vector3.zero, gameObject.layer);
				}
				if(hitColliders[i].GetComponent(NpcController)) {
					hitColliders[i].GetComponent(NpcController).AddDamage(obstacleConf.onDieArealDamage, Vector3.zero);
				}
				if(hitColliders[i].GetComponent(PlayerController)) {
					hitColliders[i].GetComponent(PlayerController).AddDamage(obstacleConf.onDieArealDamage, Vector3.zero);
				}
			}
			//add explosion force
			if(hitColliders[i].GetComponent(Rigidbody)) {
				hitColliders[i].GetComponent(Rigidbody).AddExplosionForce(obstacleConf.onDieArealDamage, transform.position, obstacleConf.onDieImpactRadius, 10.0);
			}
		}
	}
	
	//CAMERA ANIMATIONS
	GlobalVars.CameraAnimationPlay(obstacleConf.onDieCameraAnimation);

}