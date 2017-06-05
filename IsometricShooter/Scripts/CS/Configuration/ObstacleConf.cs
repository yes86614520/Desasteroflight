using UnityEngine;
using System.Collections;

public class ObstacleConf : MonoBehaviour {

	public GameObject onHitEffect; //Effect on hit by projectile
	public Effect onHitEffectType; //Type of effect on hit by projectile
	public GameObject onDieEffect; //Effect on die by projectile
	public Effect onDieEffectType; //Type of effect on die by projectile
	public AnimationClip onDieCameraAnimation;
	public int onDieArealDamage = 0; //Areal damage in case of impact radius > 0
	public float onDieImpactRadius = 0.0f; //Damage radius
	public float onDieEffectWaitSeconds = 0.0f;
	public AudioClip sfxHit;
	public AudioClip sfxDie;
	public int getXpOnKill = 10; //XP the player gains on kill of this NPC
	public Color getXpColor = Color.yellow;
	public GameObject killLoot; //Object spawned as kill loot ("None" = nothing will spawn)
	
}
