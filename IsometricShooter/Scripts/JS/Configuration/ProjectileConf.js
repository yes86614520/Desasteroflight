#pragma strict

var muzzlePosition : Transform; //Projectile trajectory starts here
var muzzleFlash : ParticleEmitter; //muzzle flash reference
var muzzleSteam : ParticleEmitter; //muzzle steam reference
var speed : float = 10.0; //Speed of projectile
var lifetime : float = 2.0; //Lifetime of projectile
var damage : int = 5; //Damage of projectile
var arealDamage : int = 0; //Areal damage in case of impact radius > 0
var impactRadius : float = 0.0; //Damage radius
var isBallistic : boolean = false; //has ballistic trajectory
var ballisticStrength : float = 0.0; //use if ballistic = true and please set rigidbody constraint without freezed position
var amount : int = 1; //amount of projectiles to be spawned, 0 = no projectile
var onHitDestroy : boolean = true; //true = destroyed at first hit, false = bounce within lifetime
var onHitEffect : GameObject; //Effect on hit any collider
var onHitCameraAnimation : AnimationClip;
//SFX
var sfxImpact : AudioClip;