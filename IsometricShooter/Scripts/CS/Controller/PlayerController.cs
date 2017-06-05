using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public Camera playerCamera;
	public MeshListController playerMeshList; //Reference to all meshs
	public WeaponListController playerWeaponList; //Reference to all weapons
	public Transform playerAim; //Player aims here
	public PlayerConf playerConf; //Configuration reference
	public HealthConf healthConf; //Health reference

	private bool grounded = true; //is player on floor?
	private MeshConf selectedMesh; //currently selected mesh
	private WeaponConf selectedWeapon; //currently selected weapon
	private float nextFire = 0.0f; //helper for fire rate
	private bool isKilled = false; //player killed?

	// Use this for initialization
	void Start () {
	
		selectedMesh = playerMeshList.GetMesh(); //set selected mesh
		selectedWeapon = playerWeaponList.GetWeapon(); //set selected weapon
	
	}
	
	//All collisions here
	public void OnCollisionEnter(Collision collision) {

		//layer 9 = Ground
		if(collision.collider.gameObject.layer == 9) {
			grounded = true;
		}
		
		//layer 13 = NpcProjectile
		if(collision.collider.gameObject.layer == 13) {
			Vector3 dir = collision.collider.GetComponent<Rigidbody>().velocity * -1;
			float damage = collision.collider.gameObject.GetComponent<ProjectileController>().projectileConf.damage;
			AddDamage(damage, dir);
		}
		
		//layer 14 = Medikit
		if(collision.collider.gameObject.layer == 14) {
			healthConf.AddHealth(collision.collider.gameObject.GetComponent<ItemConf>().gain);
			Destroy(collision.collider.gameObject, 0);
			//SFX
			GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent<ItemConf>().sfxCollect);
		}
		
		//layer 15 = Ammo
		if(collision.collider.gameObject.layer == 15) {
			selectedWeapon.AddAmmo(collision.collider.gameObject.GetComponent<ItemConf>().gain);
			Destroy(collision.collider.gameObject, 0);
			//SFX
			GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent<ItemConf>().sfxCollect);
		}
		
		//layer 22 = XPcoin
		if(collision.collider.gameObject.layer == 22) {
			Destroy(collision.collider.gameObject, 0);
			//XP
			GlobalVars.AddXp(collision.collider.gameObject.GetComponent<ItemConf>().gain);
			GlobalVars.values.SpawnValue("+" + collision.collider.gameObject.GetComponent<ItemConf>().gain, transform.position, collision.collider.gameObject.GetComponent<ItemConf>().gainColor);
			//SFX
			GlobalVars.AudioPlay(collision.collider.gameObject.GetComponent<ItemConf>().sfxCollect);
		}

	}

	public void ResetPlayerWeapons() {

		playerWeaponList.Reset();

	}

	public void ResetPlayerHealth() {

		healthConf.Reset();
		
	}

	public void AddDamage(float damage, Vector3 direction) {

		isKilled = healthConf.ReduceHealth(damage);
		Hit(direction);
		if(isKilled) {
			Die(direction);
		}

	}

	//Action when hit by projectile
	public void Hit(Vector3 direction) {

		if(playerConf.onHitEffectType == Effect.LegacyParticleEmitter) {
			GameObject p = Object.Instantiate(playerConf.onHitEffect, transform.position, transform.rotation) as GameObject;
			p.transform.parent = GlobalVars.trash;
			p.SetActive(true);
			p.GetComponent<ParticleEmitter>().Emit();
			Destroy(p, 5);
		}
		else
		if(playerConf.onHitEffectType == Effect.GameObjectSpawn) {
			for(int x = 1; x <= 5; x++) {
				GameObject s = Object.Instantiate(playerConf.onHitEffect, transform.position, transform.rotation) as GameObject;
				s.transform.parent = GlobalVars.trash;
				s.SetActive(true);
				s.GetComponent<Rigidbody>().velocity = GlobalVars.GetRandomVector();
			}
		}
		
		//SFX
		GlobalVars.AudioPlay(playerConf.sfxHit);

	}

	//Action when die by projectile
	public void Die(Vector3 direction) {

		GlobalVars.SetGameOver(true);
		GlobalVars.SetCampaignMapIndex(-1); //restart campaign
		
		//SFX
		GlobalVars.AudioPlay(playerConf.sfxScream);
		GlobalVars.AudioPlay(playerConf.sfxDie);

	}

	//Getter / Setter for private variables
	public bool GetGrounded () { return grounded; }
	public void SetGrounded (bool value) { grounded = value; }

	public MeshConf GetSelectedMesh () { return selectedMesh; }
	public void SetSelectedMesh (MeshConf value) { selectedMesh = value; }

	public WeaponConf GetSelectedWeapon () { return selectedWeapon; }
	public void SetSelectedWeapon (WeaponConf value) { selectedWeapon = value; }

	public float GetNextFire () { return nextFire; }
	public void SetNextFire (float value) { nextFire = value; }

	public bool GetIsKilled () { return isKilled; }
	public void SetIsKilled (bool value) { isKilled = value; }
}
