#pragma strict

var title : String = "Weapon"; //name of weapon
var fireRate : float = 0.5; //rate of fire for this weapon, lower = faster, higher = slower
var infiniteAmmunition : boolean = false; //if true, the max and current values are ignored
var maximumAmmunition : int = 100; //maximum ammount of ammo for this weapon
var currentAmmunition : int = 100; //current ammount of ammo for this weapon
var allowAmmoOverload : boolean = false; //allow currentAmmunition > maximumAmmunition
var addColor : Color = Color.green;
var projectile : ProjectileController; //projectile reference
var mesh : GameObject; //mesh reference
var rightArmAnimator : Animator; //Right arm animator reference
var rightArmAnim : AnimationClip; //Right arm aim animation
//SFX
var sfxSelected : AudioClip;
var sfxShot : AudioClip;

//Add ammo by value
function AddAmmo(ammo : int) {

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