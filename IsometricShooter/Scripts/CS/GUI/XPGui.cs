using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class XPGui : MonoBehaviour {

	public Text xp; //GUI text to show xp
	
	void OnGUI () {

		xp.text = "" + GlobalVars.GetXpValue();

	}
	
}
