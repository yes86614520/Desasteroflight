#pragma strict

var playerCamera : Camera;
var playerMeshList : MeshListController; //Reference to all meshs
var playerWeaponList : WeaponListController; //Reference to all weapons
var playerAim : Transform; //Player aims here
var playerConf : PlayerConf; //Configuration reference
var healthConf : HealthConf; //Health reference

private var grounded : boolean = true; //is player on floor?
private var selectedMesh : MeshConf; //currently selected mesh
private var selectedWeapon : WeaponConf; //currently selected weapon
private var nextFire : float = 0.0; //helper for fire rate
private var isKilled : boolean = false; //player killed?

function Start () {
	
	selectedMesh = playerMeshList.GetMesh(); //set selected mesh
	selectedWeapon = playerWeaponList.GetWeapon(); //set selected weapon
	
}

//All collisions here
function OnCollisionEnter(collision : Collision) {

	//layer 9 = Ground
	if(collision.collider.gameObject.layer == 9) {
		grounded = true;
	}
	
	//layer 13 = NpcProjectile
	if(collision.collider.gameObject.layer == 13) {
		var dir = collision.collider.GetComponent.<Rigidbody>().velocity * -1;
		var damage = collision.collider.gameObject.GetComponent(ProjectileController).projectileConf.damage;
		AddDamage(damage, dir);
	}
	
	//layer 14 = Medikit
	if(collision.collider.gameObject.layer == 14) {
		healthConf.AddHealth(collision.collider.gameObject.GetComponent(ItemConf).gain);
		Destroy(collision.collider.gameObject, 0);
		//SFX
		GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent(ItemConf).sfxCollect);
	}
	
	//layer 15 = Ammo
	if(collision.collider.gameObject.layer == 15) {
		selectedWeapon.AddAmmo(collision.collider.gameObject.GetComponent(ItemConf).gain);
		Destroy(collision.collider.gameObject, 0);
		//SFX
		GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent(ItemConf).sfxCollect);
	}
	
	//layer 22 = XPcoin
	if(collision.collider.gameObject.layer == 22) {
		Destroy(collision.collider.gameObject, 0);
		//XP
		GlobalVars.AddXp(collision.collider.gameObject.GetComponent(ItemConf).gain);
		GlobalVars.values.SpawnValue("+" + collision.collider.gameObject.GetComponent(ItemConf).gain, transform.position, collision.collider.gameObject.GetComponent(ItemConf).gainColor);
		//SFX
		GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent(ItemConf).sfxCollect);
	}

}

function ResetPlayerWeapons() {

	playerWeaponList.Reset();

}

function ResetPlayerHealth() {

	healthConf.Reset();
	
}

function AddDamage(damage : float, direction : Vector3) {

	isKilled = healthConf.ReduceHealth(damage);
	Hit(direction);
	if(isKilled) {
		Die(direction);
	}

}

//Action when hit by projectile
function Hit(direction : Vector3) {

	if(playerConf.onHitEffectType == Effect.LegacyParticleEmitter) {
		var p = Instantiate(playerConf.onHitEffect, transform.position, transform.rotation);
		p.transform.parent = GlobalVars.trash;
		p.SetActive(true);
		p.GetComponent(ParticleEmitter).Emit();
		Destroy(p, 5);
	}
	else
	if(playerConf.onHitEffectType == Effect.GameObjectSpawn) {
		for(var x : int = 1; x <= 5; x++) {
			var s = Instantiate(playerConf.onHitEffect, transform.position, transform.rotation);
			s.transform.parent = GlobalVars.trash;
			s.SetActive(true);
			s.GetComponent.<Rigidbody>().velocity = GlobalVars.GetRandomVector();
		}
	}
	
	//SFX
	GlobalVars.AudioPlay(playerConf.sfxHit);

}

//Action when die by projectile
function Die(direction : Vector3) {

	GlobalVars.SetGameOver(true);
	GlobalVars.SetCampaignMapIndex(-1); //restart campaign
	
	//SFX
	GlobalVars.AudioPlay(playerConf.sfxScream);
	GlobalVars.AudioPlay(playerConf.sfxDie);

}

//Getter / Setter for private variables
function GetGrounded () { return grounded; }
function SetGrounded (value : boolean) { grounded = value; }

function GetSelectedMesh () { return selectedMesh; }
function SetSelectedMesh (value : MeshConf) { selectedMesh = value; }

function GetSelectedWeapon () { return selectedWeapon; }
function SetSelectedWeapon (value : WeaponConf) { selectedWeapon = value; }

function GetNextFire () { return nextFire; }
function SetNextFire (value : float) { nextFire = value; }

function GetIsKilled () { return isKilled; }
function SetIsKilled (value : boolean) { isKilled = value; }