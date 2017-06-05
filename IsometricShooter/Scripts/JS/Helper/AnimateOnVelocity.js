#pragma strict

var animator : Animator;
var animationClip : AnimationClip;
var animationClipZeroVelocity : AnimationClip;
var activateAnimation : boolean = true;
var stopIfRigidBodyZeroVelocity : boolean = true;
var rigidBodyTarget : Rigidbody;

private var isAnimating : boolean;

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
			animator.Play(animationClip.name);
		} else {
			animator.Play(animationClipZeroVelocity.name);
		}
		
	}

}