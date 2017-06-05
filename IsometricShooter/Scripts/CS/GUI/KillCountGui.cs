using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class KillCountGui : MonoBehaviour {

	public Text killCount; //GUI text to show kill count

	void OnGUI () {

		killCount.text = "" + GlobalVars.GetKillCount();

	}
	
}
