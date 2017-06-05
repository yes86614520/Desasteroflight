#pragma strict

var speed : float = 5.0; //Speed at move movement
var attackDistance : float = 10.0; //Distance within the NPC attacks the player
var sightDistance : float = 15.0; //Distance within the NPC sees the player
var holdDistance : float = 2.0; //Distance within the NPC holds position while attacking the target
var onHitEffect : GameObject; //Effect on hit by projectile
var onHitEffectType : Effect; //Type of effect on hit by projectile
var onDieEffect : GameObject; //Effect on die by projectile
var onDieEffectType : Effect; //Type of effect on die by projectile
var sfxHit : AudioClip; //Audio to be played in case of bullet hit
var sfxDie : AudioClip; //Audio to be played in case of death
var sfxScream : AudioClip; //Audio to be played in case of scream
var sfxCall : AudioClip; //Audio to be played in case of call
var getXpOnKill : int = 10; //XP the player gains on kill of this NPC
var getXpColor : Color = Color.yellow; //Color of spawned XP points
var killLoot : GameObject; //Object spawned as kill loot ("None" = nothing will spawn)
var target : Transform; //target reference (player)
var action : AiAction; //Current action of NPC
var patrolPointList : List.<Transform>; //list of patrol points
var unitSpawnList : List.<UnitSpawn>; //list of spawn points for units