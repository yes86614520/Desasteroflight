using UnityEngine;
using System.Collections;

public class WeaponConf : MonoBehaviour {

	public string title= "Weapon"; //name of weapon
	public float fireRate = 0.5f; //rate of fire for this weapon, lower = faster, higher = slower
	public bool infiniteAmmunition = false; //if true, the max and current values are ignored
	public int maximumAmmunition = 100; //maximum ammount of ammo for this weapon
	public int currentAmmunition = 100; //current ammount of ammo for this weapon
	public bool allowAmmoOverload = false; //allow currentAmmunition > maximumAmmunition
	public Color addColor = Color.green;
	public ProjectileController projectile; //projectile reference
	public GameObject mesh; //mesh reference
	public Animator rightArmAnimator; //Right arm animator reference
	public AnimationClip rightArmAnim; //Right arm aim animation
	//SFX
	public AudioClip sfxSelected;
	public AudioClip sfxShot;

	//Add ammo by value
	public bool AddAmmo(int ammo) {

		currentAmmunition += ammo;
		
		//GUI
		GlobalVars.values.SpawnValue("+" + ammo, transform.position, addColor);
		
		//Is ammo > max?
		if(!allowAmmoOverload) {
			if(currentAmmunition > maximumAmmunition) {
				currentAmmunition = maximumAmmunition;
			}
		}
		
		return true;

	}
	
}
