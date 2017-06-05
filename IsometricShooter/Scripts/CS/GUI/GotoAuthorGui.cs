using UnityEngine;
using System.Collections;

public class GotoAuthorGui : MonoBehaviour {

	public string url = "http://";

	public void OnClick () {

		Application.OpenURL(url);

	}
	
}
