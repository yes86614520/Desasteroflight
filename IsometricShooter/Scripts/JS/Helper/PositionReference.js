#pragma strict

var target : Transform;
var scaleOffset : Vector3;
var positionOffset : Vector3;
var rotationOffset : Vector3;

function Start () {

	transform.parent = target;
	transform.localScale = new Vector3(1,1,1) + scaleOffset;
	
	transform.localPosition.x = positionOffset.x;
	transform.localPosition.y = positionOffset.y;
	transform.localPosition.z = positionOffset.z;
	
	transform.localRotation = Quaternion.Euler(rotationOffset);

}