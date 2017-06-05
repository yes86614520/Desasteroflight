#pragma strict

var projectileConf : ProjectileConf; //Projectile configuration reference

private var processing : boolean = false; //helper to check processing of projectile
private var velocity : Vector3; //helper for velocity of projectile

function Start () {

	//muzzle flash
	if(projectileConf.muzzleFlash != null) {
		var mf = Instantiate(projectileConf.muzzleFlash, projectileConf.muzzleFlash.transform.position, projectileConf.muzzleFlash.transform.rotation);
		mf.transform.parent = GlobalVars.trash;
		mf.GetComponent(ParticleEmitter).Emit();
		Destroy(mf, 5);
	}
	
	//muzzle steam
	if(projectileConf.muzzleSteam != null) {
		var ms = Instantiate(projectileConf.muzzleSteam, projectileConf.muzzleSteam.transform.position, projectileConf.muzzleSteam.transform.rotation);
		ms.transform.parent = GlobalVars.trash;
		ms.GetComponent(ParticleEmitter).Emit();
		Destroy(ms, 5);
	}

}

function Update () {

	//if projectile is processing, it moves
	if(processing) {
		if(projectileConf.isBallistic) {
			GetComponent.<Rigidbody>().AddForce (velocity);
			processing = false;
		} else {
			GetComponent.<Rigidbody>().velocity = velocity;
		}
	}

}

//Create projectile
function Init(aimPos : Vector3) {

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
		var tolerance = projectileConf.amount * 0.05;
		direction.y = Random.Range(direction.y-tolerance, direction.y+tolerance);
		direction.x = Random.Range(direction.x-tolerance, direction.x+tolerance);
		direction.z = Random.Range(direction.z-tolerance, direction.z+tolerance);
	}
	
	velocity = direction * projectileConf.speed;
	Destroy(gameObject, projectileConf.lifetime);
	processing = true;

}

//Collision events
function OnCollisionEnter(collision : Collision) {

	processing = false;
	
	if(projectileConf.onHitDestroy) {
		Destroy(gameObject, 0.0);
	}
	
	//on hit effect, e.g. projectile hit collider of obstacle
	var h = Instantiate(projectileConf.onHitEffect, transform.position, transform.rotation);
	h.transform.parent = GlobalVars.trash;
	h.GetComponent(ParticleEmitter).Emit();
	Destroy(h, 5);
	
	//impact radius
	if(projectileConf.impactRadius > 0.0) {
		var hitColliders = Physics.OverlapSphere(transform.position, projectileConf.impactRadius);
		for (var i = 0; i < hitColliders.Length; i++) {
			//Debug.Log(hitColliders[i].name);
			//add damage
			if(hitColliders[i].GetComponent(HealthConf)
			&& !hitColliders[i].GetComponent(HealthConf).IsDead()) {
				if(hitColliders[i].GetComponent(ObstacleController)) {
					hitColliders[i].GetComponent(ObstacleController).AddDamage(projectileConf.arealDamage, Vector3.zero, gameObject.layer);
				}
				if(hitColliders[i].GetComponent(NpcController)) {
					hitColliders[i].GetComponent(NpcController).AddDamage(projectileConf.arealDamage, Vector3.zero);
				}
			}
			//add explosion force
			if(hitColliders[i].GetComponent(Rigidbody)) {
				hitColliders[i].GetComponent(Rigidbody).AddExplosionForce(projectileConf.arealDamage, transform.position, projectileConf.impactRadius, 10.0);
			}
		}
	}
	
	//SFX
	GlobalVars.AudioPlay(projectileConf.sfxImpact);
	
	//CAMERA ANIMATIONS
	GlobalVars.CameraAnimationPlay(projectileConf.onHitCameraAnimation);

}