﻿#pragma strict

/*
	>>Description:
	
	This is the standard adapter for Keyboard and Mouse input.
	Use it for PC and Mac.

*/

var playerController : PlayerController;

function Update () {

	/* MOVEMENT */
	
	//Jump (Space)
	if(Input.GetAxis("Jump") && playerController.GetGrounded()) {
		playerController.GetComponent.<Rigidbody>().velocity.y = playerController.playerConf.speedJump;
		playerController.SetGrounded(false);
	}
	
	//Move (W,A,S,D)
	if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical")) {
		var velocityVec : Vector3 = Vector3(Input.GetAxis("Vertical") * playerController.playerConf.speedVertical,
											playerController.GetComponent.<Rigidbody>().velocity.y,
											-Input.GetAxis("Horizontal") * playerController.playerConf.speedHorizontal);
		
		if(velocityVec.magnitude > Mathf.Max(playerController.playerConf.speedVertical, playerController.playerConf.speedHorizontal)) 
		{
			velocityVec.x = velocityVec.normalized.x * playerController.playerConf.speedVertical;
			velocityVec.z = velocityVec.normalized.z * playerController.playerConf.speedHorizontal;
		}
		
		playerController.GetComponent.<Rigidbody>().velocity = velocityVec;
	}
	
	/* AIM POSITION */
	var hit: RaycastHit;
	var ray : Ray = playerController.playerCamera.ScreenPointToRay(Input.mousePosition);
	//layer 16 = AimArea
	if (Physics.Raycast(ray.origin, ray.direction, hit, Mathf.Infinity, 1 << 16)) {
		playerController.playerAim.position = hit.point;
	}
	
	/* SHOOT */
	if (Input.GetButton("Fire1") && Time.time > playerController.GetNextFire()) {
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
	
	/* WEAPON SELECT */
	if (Input.GetAxis("Mouse ScrollWheel") > 0) // next
	{
		playerController.SetSelectedWeapon(playerController.playerWeaponList.SelectPreviousWeapon());
		//SFX
		GlobalVars.AudioPlay(playerController.GetSelectedWeapon().sfxSelected);
	}
	if (Input.GetAxis("Mouse ScrollWheel") < 0) // previous
	{
		playerController.SetSelectedWeapon(playerController.playerWeaponList.SelectNextWeapon());
		//SFX
		GlobalVars.AudioPlay(playerController.GetSelectedWeapon().sfxSelected);
	}

}