#pragma strict

import System.Collections.Generic; //enable lists

var globalTrash : Transform; //global trash container for runtime generated objects
var globalValues : ValuesGui; //global values handler for -/+ values spawning out of objects on certain events
var globalCamera : Camera; //global camera
var globalAudioSource : AudioSource; //global audio source to generate unlimited instances if necessary
var globalRankings : List.<Rank>; //global list of Ranks

static var trash : Transform;
static var values : ValuesGui; 
static var cam : Camera; 
static var audioSource : AudioSource;
static var xp : int;
static var rankingList : List.<Rank>; //list of Ranks
static var rankingIndex : int = -1;
static var killCount : int;
static var gameOver : boolean = false;
static var gameMode : GameMode = GameMode.Campaign;
static var campaignMapIndex : int = 0;

//Assign global variables
function Start () {

	trash = globalTrash;
	values = globalValues;
	cam = globalCamera;
	audioSource = globalAudioSource;
	rankingList = globalRankings;

}

function Update() {

	//Exit application
	if (Input.GetKey ("escape")) {
		Application.Quit();
	}
	
}

//Global audio play
static function AudioPlay (audioClip : AudioClip) {

	if(audioSource != null
	&& audioClip != null) {
		var a = Instantiate(audioSource, Vector3.zero, Quaternion.identity);
		a.transform.parent = GlobalVars.trash;
		a.GetComponent.<AudioSource>().clip = audioClip;
		a.Play();
		Destroy(a.gameObject, audioClip.length);
	}

}

//Global camera animation
static function CameraAnimationPlay (anim : AnimationClip) {

	if(cam.GetComponent(Animator)
	&& anim != null) {
		cam.GetComponent(Animator).Play(anim.name);
	}

}

//Global XP add
static function AddXp (value : int) {

	xp += value;
	SetRank(xp);

}

//Global XP reset
static function ResetXp () {

	xp = 0;

}

//Global XP get
static function GetXpValue () {

	return xp;

}

static function SetRank (xp : int) {

	if(rankingIndex < rankingList.Count-1) {
		for(var i : int = rankingIndex+1; i < rankingList.Count; i++) {
			if(xp >= rankingList[i].xp) {
				rankingIndex = i;
					//Show Rank
				values.SpawnValue(rankingList[rankingIndex].xp + " XP " + rankingList[rankingIndex].rank, cam.ViewportToWorldPoint(Vector3(0.5, 0.5, cam.nearClipPlane)), rankingList[rankingIndex].color);				
				//Shout Rank
				AudioPlay(rankingList[rankingIndex].sfxAchieved);
			}
		}
	}

}

//Global kill count add
static function AddKillCount () {

	killCount++;

}

//Global kill count reset
static function ResetKillCount () {

	killCount = 0;

}

//Global kill count get
static function GetKillCount () {

	return killCount;

}

//Global set game over
static function SetGameOver (end : boolean) {

	gameOver = end;

}

//Global get game over
static function GetGameOver () {

	return gameOver;

}

//Global set game mode
static function SetGameMode (gMode : GameMode) {

	gameMode = gMode;

}

//Global get game mode
static function GetGameMode () {

	return gameMode;

}

//Global set campaign map index
static function SetCampaignMapIndex (index : int) {

	campaignMapIndex = index;

}

//Global get campaign map index
static function GetCampaignMapIndex () {

	return campaignMapIndex;

}

static function GetRandomVector () {

	var randomVec = Vector3(Random.Range(-1.5F, 1.5F), Random.Range(5.0F, 10.0F), Random.Range(-1.5F, 1.5F));
	
	return randomVec;

}