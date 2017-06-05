using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MaterialAnimation : MonoBehaviour {

	public MeshRenderer materialTarget;
	public List<Material> materialList; //list of Material
	public float animationRate = 1.0f;
	public bool activateAnimation = true;
	public bool stopIfRigidBodyZeroVelocity = true;
	public Rigidbody rigidBodyTarget;
	
	private bool isAnimating;
	private Material originalMaterial;
	private int frame = 0;
	private float nextFrame = 0.0f; //helper for frame rate

	// Use this for initialization
	void Start () {
	
		originalMaterial = materialTarget.material;
	
	}
	
	// Update is called once per frame
	void Update () {
	
		if(activateAnimation) {
		
			if(stopIfRigidBodyZeroVelocity) {
				if(rigidBodyTarget.velocity.magnitude <= 0.1f) { //small range to avoid animation at "nearly" zero velocity
					isAnimating = false;
				} else {
					isAnimating = true;
				}
			}
			
			if(isAnimating) {
				if(Time.time > nextFrame) {
					nextFrame = Time.time + animationRate;
					materialTarget.material = materialList[frame];
					if(frame < materialList.Count-1) {
						frame++;
					} else {
						frame = 0;
					}
				}
			} else {
				materialTarget.material = originalMaterial;
			}
			
		}
	
	}
}
