using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class WeaponListController : MonoBehaviour {

	public int selectedWeaponIndex = 0; //index of current weapon at list of weapons
	public List<WeaponConf> weaponList; //list of weapons

	// Use this for initialization
	void Start () {
	
		GetWeapon(); //set selected weapon
	
	}
	
	//select next weapon
	public WeaponConf SelectNextWeapon() {

		if(selectedWeaponIndex >= weaponList.Count-1) {
			selectedWeaponIndex = 0;
		} else {
			selectedWeaponIndex++;
		}
		
		return GetWeapon();

	}

	//select previous weapon
	public WeaponConf SelectPreviousWeapon() {

		if(selectedWeaponIndex <= 0) {
			selectedWeaponIndex = weaponList.Count-1;
		} else {
			selectedWeaponIndex--;
		}
		
		return GetWeapon();

	}

	//get current weapon
	public WeaponConf GetWeapon() {

		//hide all weapons
		for(int i = 0; i < weaponList.Count; i++) {
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

	public void Reset() {

		for(int i = 0; i < weaponList.Count; i++) {
			weaponList[i].currentAmmunition = weaponList[i].maximumAmmunition;
		}

	}
}
