#pragma strict

var playerWeaponList : WeaponListController; //Reference to all weapons of player
var ammo : UI.Text; //GUI text to show ammo of player

private var selectedWeapon : WeaponConf; //currently selected weapon

function OnGUI () {

	selectedWeapon = playerWeaponList.GetWeapon(); //set selected weapon
	//ammo.text = selectedWeapon.title +" : " + selectedWeapon.currentAmmunition + " / " + selectedWeapon.maximumAmmunition;
	ammo.text = "" + selectedWeapon.currentAmmunition;

}