using UnityEngine;
using System.Collections;
using System.Collections.Generic; //enable lists

public class GlobalVars : MonoBehaviour {

	public Transform globalTrash; //global trash container for runtime generated objects
	public ValuesGui globalValues; //global values handler for -/+ values spawning out of objects on certain events
	public Camera globalCamera; //global camera
	public AudioSource globalAudioSource; //global audio source to generate unlimited instances if necessary
	public List<Rank> globalRankings; //global list of Ranks

	public static Transform trash;
	public static ValuesGui values; 
	public static Camera cam; 
	public static AudioSource audioSource;
	public static int xp;
	public static List<Rank> rankingList; //list of Ranks
	public static int rankingIndex = -1;
	public static int killCount;
	public static bool gameOver = false;
	public static GameMode gameMode = GameMode.Campaign;
	public static int campaignMapIndex = 0;

	// Use this for initialization
	void Start () {
	
		trash = globalTrash;
		values = globalValues;
		cam = globalCamera;
		audioSource = globalAudioSource;
		rankingList = globalRankings;
	
	}
	
	// Update is called once per frame
	void Update () {
	
		//Exit application
		if (Input.GetKey ("escape")) {
			Application.Quit();
		}
	
	}
	
	//Global audio play
	public static void AudioPlay (AudioClip audioClip) {

		if(audioSource != null
		&& audioClip != null) {
			GameObject a = Object.Instantiate(audioSource.gameObject, Vector3.zero, Quaternion.identity) as GameObject;
			a.transform.parent = GlobalVars.trash;
			a.GetComponent<AudioSource>().clip = audioClip;
			a.GetComponent<AudioSource>().Play();
			Destroy(a.gameObject, audioClip.length);
		}

	}

	//Global camera animation
	public static void CameraAnimationPlay (AnimationClip anim) {

		if(cam.GetComponent<Animator>()
		&& anim != null) {
			cam.GetComponent<Animator>().Play(anim.name);
		}

	}

	//Global XP add
	public static void AddXp (int value) {

		xp += value;
		SetRank(xp);

	}

	//Global XP reset
	public static void ResetXp () {

		xp = 0;

	}

	//Global XP get
	public static int GetXpValue () {

		return xp;

	}

	public static void SetRank (int xp) {

		if(rankingIndex < rankingList.Count-1) {
			for(int i = rankingIndex+1; i < rankingList.Count; i++) {
				if(xp >= rankingList[i].xp) {
					rankingIndex = i;
						//Show Rank
					values.SpawnValue(rankingList[rankingIndex].xp + " XP " + rankingList[rankingIndex].rank, cam.ViewportToWorldPoint(new Vector3(0.5f, 0.5f, cam.nearClipPlane)), rankingList[rankingIndex].color);				
					//Shout Rank
					AudioPlay(rankingList[rankingIndex].sfxAchieved);
				}
			}
		}

	}

	//Global kill count add
	public static void AddKillCount () {

		killCount++;

	}

	//Global kill count reset
	public static void ResetKillCount () {

		killCount = 0;

	}

	//Global kill count get
	public static int GetKillCount () {

		return killCount;

	}

	//Global set game over
	public static void SetGameOver (bool end) {

		gameOver = end;

	}

	//Global get game over
	public static bool GetGameOver () {

		return gameOver;

	}

	//Global set game mode
	public static void SetGameMode (GameMode gMode) {

		gameMode = gMode;

	}

	//Global get game mode
	public static GameMode GetGameMode () {

		return gameMode;

	}

	//Global set campaign map index
	public static void SetCampaignMapIndex (int index) {

		campaignMapIndex = index;

	}

	//Global get campaign map index
	public static int GetCampaignMapIndex () {

		return campaignMapIndex;

	}

	public static Vector3 GetRandomVector () {

		Vector3 randomVec = new Vector3(Random.Range(-1.5F, 1.5F), Random.Range(5.0F, 10.0F), Random.Range(-1.5F, 1.5F));
		
		return randomVec;

	}
	
}
