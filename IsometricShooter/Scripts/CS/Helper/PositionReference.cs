using UnityEngine;
using System.Collections;

public class PositionReference : MonoBehaviour {

	public Transform target;
	public Vector3 scaleOffset;
	public Vector3 positionOffset;
	public Vector3 rotationOffset;

	// Use this for initialization
	void Start () {
	
		transform.parent = target;
		transform.localScale = new Vector3(1,1,1) + scaleOffset;
		
		transform.localPosition = new Vector3(positionOffset.x, positionOffset.y, positionOffset.z);
		
		transform.localRotation = Quaternion.Euler(rotationOffset);
	
	}
}
