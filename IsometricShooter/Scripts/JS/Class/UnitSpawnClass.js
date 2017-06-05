#pragma strict

class UnitSpawn {

	var unit : GameObject; //any GameObject
	var spawnPoint : Transform; //position of spawn point
	var spawnRate : float = 2.0; //spawn rate in seconds
	var amount : int = 1; //amount of units to be spawned, 0 = no unit

}