#pragma strict

/*
	>>Description:
	
	This is an adapter for the 3rd party asset "Control Freak" (https://www.assetstore.unity3d.com/en/#!/content/11562).
	Use it for mobile devices.
	
	>>Usage:
	
	1. Import the above mentioned 3rd party asset "Control Freak".
	2. Deactivate any existing Input-Script at "/Game/Player" (no need to remove, just deactivate via checkbox).
	3. Drag and drop the prefab "/Scripts/Input/ControlFreak/CONTROL-FREAK" as a child to "/Game/Player/".
	4. This script: Remove the complete line below commented with "REMOVE THIS LINE IN ORDER TO USE THE SCRIPT".
	5. This script: Drag and drop at "/Game/Player".
	6. This script: Drag and drop "/Game/Player" at variable "Player Controller" (playerController).
	7. This script: Drag and drop "/Game/Player/CONTROL-FREAK" at variable "Mobile Touch Controller" (mobileTouchController).
	8. It should work now, otherwise please contact me at support@assetcrew.com.
	
	>>Please note:
	
	I am not responsible for disfunction or damage caused by any 3rd party asset used together with Isometric Shooter.
	However please do not hesitate to contact me at support@assetcrew.com in case of questions.

*/

/* REMOVE THIS LINE IN ORDER TO USE THE SCRIPT

var playerController : PlayerController;
var	mobileTouchController : TouchController;
var automaticAim : boolean = true;

public static var STICK_WALK : int = 0;
public static var STICK_AIM	: int = 1;
public static var ZONE_SCREEN : int = 0;
public static var ZONE_JUMP	: int = 1;
public static var ZONE_FIRE	: int = 2;
public static var ZONE_NEXTWEAPON : int = 3;
public static var ZONE_PREVIOUSWEAPON : int = 4;

function Start () {

	if(automaticAim) {
		mobileTouchController.GetStick(STICK_AIM).initiallyDisabled = true;
		mobileTouchController.GetStick(STICK_AIM).initiallyHidden = true;
		mobileTouchController.GetStick(STICK_AIM).disableGui = true;
	}

}

function Update () {

	var walkStick : TouchStick = mobileTouchController.GetStick(STICK_WALK);
	var aimStick : TouchStick = mobileTouchController.GetStick(STICK_AIM);
	var screenZone : TouchZone = mobileTouchController.GetZone(ZONE_SCREEN);
	var jumpZone : TouchZone = mobileTouchController.GetZone(ZONE_JUMP);
	var fireZone : TouchZone = mobileTouchController.GetZone(ZONE_FIRE);
	var nextweaponZone : TouchZone = mobileTouchController.GetZone(ZONE_NEXTWEAPON);
	var previousweaponZone : TouchZone = mobileTouchController.GetZone(ZONE_PREVIOUSWEAPON);

	// MOVEMENT
	
	//Jump
	if (jumpZone.UniPressed() && playerController.GetGrounded()) {
		playerController.GetComponent.<Rigidbody>().velocity.y = playerController.playerConf.speedJump;
		playerController.SetGrounded(false);
	}
	
	//Move
	if (walkStick.Pressed()) {
		var walkTilt : float = walkStick.GetTilt();
		var walkWorldVec : Vector3 = walkStick.GetVec3d(false, 0);
		playerController.GetComponent.<Rigidbody>().velocity.x = walkWorldVec.z * playerController.playerConf.speedVertical;
		playerController.GetComponent.<Rigidbody>().velocity.z = -walkWorldVec.x * playerController.playerConf.speedHorizontal;
		
		if(automaticAim) {
			playerController.playerAim.localPosition.x = walkWorldVec.z * walkTilt * 10;
			playerController.playerAim.localPosition.z = -walkWorldVec.x * walkTilt * 10;
		}
	}
	
	// AIM
	if (aimStick.Pressed() && !automaticAim) {
		var aimTilt : float	= aimStick.GetTilt();
		var angleDelta : float = playerController.playerCamera.transform.localEulerAngles.y;
		var aimWorldVec : Vector3 = aimStick.GetVec3d(true, -angleDelta);
		playerController.playerAim.localPosition.x = aimWorldVec.z * aimTilt * 10;
		playerController.playerAim.localPosition.z = -aimWorldVec.x * aimTilt * 10;
	}
	
	// SHOOT
	if (fireZone.UniPressed() && Time.time > playerController.GetNextFire()) {
		//Sufficient ammo?
		if(playerController.GetSelectedWeapon().currentAmmunition > 0) {
			playerController.SetNextFire(Time.time + playerController.GetSelectedWeapon().fireRate);
			//Create projectile
			for(var i : int = 0; i < playerController.GetSelectedWeapon().projectile.projectileConf.amount; i++) {
				var p = Instantiate(playerController.GetSelectedWeapon().projectile.gameObject, playerController.transform.position, playerController.transform.rotation);
				p.transform.parent = GlobalVars.trash;
				p.GetComponent(ProjectileController).Init(playerController.playerAim.position);
				playerController.GetSelectedWeapon().currentAmmunition--;
			}
			//SFX
			GlobalVars.AudioPlay(playerController.GetSelectedWeapon().sfxShot);
		}
	}
	
	// WEAPON SELECT
	if (nextweaponZone.JustUniReleased()) // next
	{
		playerController.SetSelectedWeapon(playerController.playerWeaponList.SelectPreviousWeapon());
		//SFX
		GlobalVars.AudioPlay(playerController.GetSelectedWeapon().sfxSelected);
	}
	if (previousweaponZone.JustUniReleased()) // previous
	{
		playerController.SetSelectedWeapon(playerController.playerWeaponList.SelectNextWeapon());
		//SFX
		GlobalVars.AudioPlay(playerController.GetSelectedWeapon().sfxSelected);
	}

}

function OnGUI()
{
	mobileTouchController.DrawControllerGUI();
}

// */