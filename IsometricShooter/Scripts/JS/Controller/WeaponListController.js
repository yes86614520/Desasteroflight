#pragma strict

import System.Collections.Generic; //enable lists

var selectedWeaponIndex : int = 0; //index of current weapon at list of weapons
var weaponList : List.<WeaponConf>; //list of weapons

function Start () {
	
	GetWeapon(); //set selected weapon
	
}

//select next weapon
function SelectNextWeapon() {

	if(selectedWeaponIndex >= weaponList.Count-1) {
		selectedWeaponIndex = 0;
	} else {
		selectedWeaponIndex++;
	}
	
	return GetWeapon();

}

//select previous weapon
function SelectPreviousWeapon() {

	if(selectedWeaponIndex <= 0) {
		selectedWeaponIndex = weaponList.Count-1;
	} else {
		selectedWeaponIndex--;
	}
	
	return GetWeapon();

}

//get current weapon
function GetWeapon() {

	//hide all weapons
	for(var i : int = 0; i < weaponList.Count; i++) {
		weaponList[i].gameObject.SetActive(false);
		if(weaponList[i].mesh != null) {
			weaponList[i].mesh.SetActive(false);
		}
	}
	
	//show selected weapon only
	weaponList[selectedWeaponIndex].gameObject.SetActive(true);
	if(weaponList[selectedWeaponIndex].mesh != null) {
		weaponList[selectedWeaponIndex].mesh.SetActive(true);
	}
	
	//Execute aim animation
	if(weaponList[selectedWeaponIndex].rightArmAnimator != null
	&& weaponList[selectedWeaponIndex].rightArmAnim != null) {
		weaponList[selectedWeaponIndex].rightArmAnimator.Play(weaponList[selectedWeaponIndex].rightArmAnim.name);
	}

	//get selected weapon conf
	return weaponList[selectedWeaponIndex];

}

function Reset() {

	for(var i : int = 0; i < weaponList.Count; i++) {
		weaponList[i].currentAmmunition = weaponList[i].maximumAmmunition;
	}

}