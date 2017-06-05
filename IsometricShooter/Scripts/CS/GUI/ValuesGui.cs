using UnityEngine;
using System.Collections;

public class ValuesGui : MonoBehaviour {

	public GUIText valueText;
	public float spawnSpeed = 10.0f;
	public float lifetime = 2.0f;
	public PhysicMaterial physicMaterial;

	public void SpawnValue (string value, Vector3 position, Color textColor) {

		//Physical object popping out as position reference for GUI text
		GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
		cube.layer = 17; //layer 17 = values
		cube.name = value + "(cube)";
		cube.transform.parent = GlobalVars.trash;
		cube.transform.localScale = new Vector3(0.5f, 0.5f, 0.5f);
		cube.transform.position = position;
		Rigidbody r = cube.AddComponent<Rigidbody>();
		r.velocity = Vector3.up * spawnSpeed;
		cube.GetComponent<MeshRenderer>().enabled = false;
		Destroy(cube, lifetime);
		
		if(physicMaterial != null) {
			cube.GetComponent<Collider>().material = physicMaterial;
		}
		
		//GUI text
		GameObject text = Object.Instantiate(valueText.transform.gameObject, transform.position, transform.rotation) as GameObject;
		text.transform.parent = GlobalVars.trash;
		text.name = value + "(gui)";
		text.GetComponent<GUIText>().text = value;
		text.GetComponent<GUIText>().color = textColor;
		text.GetComponent<ValueTextGui>().SetCube(cube);
		text.SetActive(true);
		Destroy(text, lifetime);

	}
	
}
