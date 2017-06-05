#pragma strict

var nickname : String = "Player";  //Nickname of player
var speedHorizontal : float = 5.0; //Speed at horizontal movement
var speedVertical : float = 5.0; //Speed at vertical movement
var speedJump : float = 5.0; //Speed at jump movement
var onHitEffect : GameObject; //Effect on hit by projectile
var onHitEffectType : Effect; //Type of effect on hit by projectile
var onDieEffect : GameObject; //Effect on die by projectile
var onDieEffectType : Effect; //Type of effect on die by projectile
var sfxHit : AudioClip; //Audio to be played in case of bullet hit
var sfxDie : AudioClip; //Audio to be played in case of death
var sfxScream : AudioClip; //Audio to be played in case of scream