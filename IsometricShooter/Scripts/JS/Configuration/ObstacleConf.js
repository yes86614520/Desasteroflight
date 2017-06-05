#pragma strict

var onHitEffect : GameObject; //Effect on hit by projectile
var onHitEffectType : Effect; //Type of effect on hit by projectile
var onDieEffect : GameObject; //Effect on die by projectile
var onDieEffectType : Effect; //Type of effect on die by projectile
var onDieCameraAnimation : AnimationClip;
var onDieArealDamage : int = 0; //Areal damage in case of impact radius > 0
var onDieImpactRadius : float = 0.0; //Damage radius
var onDieEffectWaitSeconds : float = 0.0;
var sfxHit : AudioClip;
var sfxDie : AudioClip;
var getXpOnKill : int = 10; //XP the player gains on kill of this NPC
var getXpColor : Color = Color.yellow;
var killLoot : GameObject; //Object spawned as kill loot ("None" = nothing will spawn)