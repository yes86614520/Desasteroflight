using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class StatisticGui : MonoBehaviour {

	public Text uiXP;
	public Text uiKills;
	
	void OnEnable () {

		uiXP.text = "" + GlobalVars.GetXpValue();
		uiKills.text = "" + GlobalVars.GetKillCount();

	}
	
}
