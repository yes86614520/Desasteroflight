using UnityEngine;
using System;
using System.Collections;

[Serializable]
public class UnitSpawn {

	public GameObject unit; //any GameObject
	public Transform spawnPoint; //position of spawn point
	public float spawnRate = 2.0f; //spawn rate in seconds
	public int amount = 1; //amount of units to be spawned, 0 = no unit

}
