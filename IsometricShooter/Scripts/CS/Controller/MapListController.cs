using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MapListController : MonoBehaviour {

	public int selectedMapIndex = 0; //index of current Map at list of Maps
	public List<MapConf> mapList; //list of Maps
	public Transform playerTransform;

	private MapConf selectedMap;
	private GameObject initialMapState = null;

	//select next Map
	public MapConf SelectNextMap() {

		if(selectedMapIndex >= mapList.Count-1) {
			selectedMapIndex = 0;
		} else {
			selectedMapIndex++;
		}
		
		return GetMap();

	}

	//select previous Map
	public MapConf SelectPreviousMap() {

		if(selectedMapIndex <= 0) {
			selectedMapIndex = mapList.Count-1;
		} else {
			selectedMapIndex--;
		}
		
		return GetMap();

	}

	//get current Map
	public MapConf GetMap() {

		//hide all Maps
		for(int i = 0; i < mapList.Count; i++) {
			mapList[i].gameObject.SetActive(false);
		}
		
		//get selected Map conf
		selectedMap = mapList[selectedMapIndex];
		
		//show selected Map only
		selectedMap.gameObject.SetActive(true);
		
		return selectedMap;

	}

	public void SetPlayerPosition() {

		playerTransform.position = selectedMap.playerPosition;

	}

	public void SaveInitialMapState() {

		Debug.Log("SaveInitialMapState");
	
		initialMapState = Object.Instantiate(selectedMap.gameObject, selectedMap.gameObject.transform.position, selectedMap.gameObject.transform.rotation) as GameObject;
		initialMapState.name = selectedMap.gameObject.name;
		initialMapState.transform.parent = transform;
		initialMapState.SetActive(false);
		Debug.Log("SaveInitialMapState done");

	}

	public void LoadInitialMapState() {

		Debug.Log("LoadInitialMapState");
	
		if(initialMapState != null
		&& initialMapState.GetComponent<MapConf>() != null) {
			mapList[selectedMapIndex] = initialMapState.GetComponent<MapConf>();
			Destroy(selectedMap.gameObject);
			initialMapState.SetActive(true);
			Debug.Log("LoadInitialMapState done");
		}

	}
	
}
