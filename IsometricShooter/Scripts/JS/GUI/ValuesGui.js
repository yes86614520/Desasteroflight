#pragma strict

var valueText : GUIText;
var spawnSpeed : float = 10.0;
var lifetime : float = 2.0;
var physicMaterial : PhysicMaterial;

function SpawnValue (value : String, position : Vector3, textColor : Color) {

	//Physical object popping out as position reference for GUI text
	var cube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	cube.layer = 17; //layer 17 = values
	cube.name = value + "(cube)";
	cube.transform.parent = GlobalVars.trash;
	cube.transform.localScale = Vector3(0.5, 0.5, 0.5);
	cube.transform.position = position;
	var r : Rigidbody = cube.AddComponent(Rigidbody);
	r.velocity = Vector3.up * spawnSpeed;
	cube.GetComponent(MeshRenderer).enabled = false;
	Destroy(cube, lifetime);
	
	if(physicMaterial != null) {
		cube.GetComponent.<Collider>().material = physicMaterial;
	}
	
	//GUI text
	var text = Instantiate(valueText.transform.gameObject, transform.position, transform.rotation);
	text.transform.parent = GlobalVars.trash;
	text.name = value + "(gui)";
	text.GetComponent(GUIText).text = value;
	text.GetComponent(GUIText).color = textColor;
	text.GetComponent(ValueTextGui).SetCube(cube);
	text.SetActive(true);
	Destroy(text, lifetime);

}