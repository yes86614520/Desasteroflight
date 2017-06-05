using UnityEngine;
using System.Collections;

public class OnCollisionLegacyParticleEffect : MonoBehaviour {

	public ParticleEmitter legacyParticleEmitter;

	public void OnCollisionEnter(Collision collision) {

		if(legacyParticleEmitter != null) {
			foreach (ContactPoint contact in collision.contacts) {
				if(contact.otherCollider.gameObject.layer == 9) { //9 = Ground
					legacyParticleEmitter.transform.position = contact.point;
					float newY = legacyParticleEmitter.transform.position.y + 0.1f; //correction to avoid flickering
					legacyParticleEmitter.transform.position = new Vector3(legacyParticleEmitter.transform.position.x, newY, legacyParticleEmitter.transform.position.z);
					legacyParticleEmitter.Emit();
				}
			}
		}

	}
	
}
