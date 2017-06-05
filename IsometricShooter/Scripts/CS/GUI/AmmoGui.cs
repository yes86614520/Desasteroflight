using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class AmmoGui : MonoBehaviour {

	public WeaponListController playerWeaponList; //Reference to all weapons of player
	public Text ammo; //GUI text to show ammo of player
	
	private WeaponConf selectedWeapon; //currently selected weapon

	void OnGUI () {

		selectedWeapon = playerWeaponList.GetWeapon(); //set selected weapon
		//ammo.text = selectedWeapon.title +" : " + selectedWeapon.currentAmmunition + " / " + selectedWeapon.maximumAmmunition;
		ammo.text = "" + selectedWeapon.currentAmmunition;

	}
	
}
