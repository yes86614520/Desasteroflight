#pragma strict

import System.Collections.Generic; //enable lists

var materialTarget : MeshRenderer;
var materialList : List.<Material>; //list of Material
var animationRate : float = 1.0;
var activateAnimation : boolean = true;
var stopIfRigidBodyZeroVelocity : boolean = true;
var rigidBodyTarget : Rigidbody;

private var isAnimating : boolean;
private var originalMaterial : Material;
private var frame : int = 0;
private var nextFrame : float = 0.0; //helper for frame rate

function Start () {

	originalMaterial = materialTarget.material;

}

function Update () {

	if(activateAnimation) {
	
		if(stopIfRigidBodyZeroVelocity) {
			if(rigidBodyTarget.velocity.magnitude <= 0.1) { //small range to avoid animation at "nearly" zero velocity
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