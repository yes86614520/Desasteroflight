using UnityEngine;
using System.Collections;

public class SmoothLookAtXZ : MonoBehaviour {

	public Transform target;
	public float damping = 6.0f;
	public bool smooth = true;

	void LateUpdate () {

		if (target) {
			if (smooth)
			{
				// Look at and dampen the rotation
				Quaternion rotation = Quaternion.LookRotation(target.position - transform.position);
				transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
			}
			else
			{
				// Just lookat
				transform.LookAt(target);
			}
			
			transform.rotation = new Quaternion(0, transform.rotation.y, 0, transform.rotation.w) ;
		}
		
	}
	
}
