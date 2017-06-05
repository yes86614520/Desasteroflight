using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class NpcConf : MonoBehaviour {

	public float speed = 5.0f; //Speed at move movement
	public float attackDistance = 10.0f; //Distance within the NPC attacks the player
	public float sightDistance = 15.0f; //Distance within the NPC sees the player
	public float holdDistance = 2.0f; //Distance within the NPC holds position while attacking the target
	public GameObject onHitEffect; //Effect on hit by projectile
	public Effect onHitEffectType; //Type of effect on hit by projectile
	public GameObject onDieEffect; //Effect on die by projectile
	public Effect onDieEffectType; //Type of effect on die by projectile
	public AudioClip sfxHit; //Audio to be played in case of bullet hit
	public AudioClip sfxDie; //Audio to be played in case of death
	public AudioClip sfxScream; //Audio to be played in case of scream
	public AudioClip sfxCall; //Audio to be played in case of call
	public int getXpOnKill = 10; //XP the player gains on kill of this NPC
	public Color getXpColor = Color.yellow; //Color of spawned XP points
	public GameObject killLoot; //Object spawned as kill loot ("None" = nothing will spawn)
	public Transform target; //target reference (player)
	public AiAction action; //Current action of NPC
	public List<Transform> patrolPointList; //list of patrol points
	public List<UnitSpawn> unitSpawnList; //list of spawn points for units
	
}
