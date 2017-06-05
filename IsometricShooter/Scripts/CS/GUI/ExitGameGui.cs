using UnityEngine;
using System.Collections;

public class ExitGameGui : MonoBehaviour {

	public GameObject mainContainer;
	public GameObject settingsContainer;
	public GameObject endContainer;

	public void OnClick () {

		settingsContainer.SetActive(false);
		endContainer.SetActive(false);
		mainContainer.SetActive(true);

	}
	
}
