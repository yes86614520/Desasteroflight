#pragma strict

var legacyParticleEmitter : ParticleEmitter;

function OnCollisionEnter(collision : Collision) {

	if(legacyParticleEmitter != null) {
		for (var contact : ContactPoint in collision.contacts) {
			if(contact.otherCollider.gameObject.layer == 9) { //9 = Ground
				legacyParticleEmitter.transform.position = contact.point;
				legacyParticleEmitter.transform.position.y += 0.1; //correction to avoid flickering
				legacyParticleEmitter.Emit();
			}
		}
	}

}