using UnityEngine;
using System.Collections;

public class AnimateOnVelocity : MonoBehaviour {

	public Animator animator;
	public AnimationClip animationClip;
	public AnimationClip animationClipZeroVelocity;
	public bool activateAnimation = true;
	public bool stopIfRigidBodyZeroVelocity = true;
	public Rigidbody rigidBodyTarget;
	
	private bool isAnimating;
	
	// Update is called once per frame
	void Update () {
	
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
}
