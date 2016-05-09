using UnityEngine;
using System.Collections;

public class spawnScript : MonoBehaviour {

	public GameObject[] obj;

	public float spawnMin = 1f;
	public float spawnMax = 2f;

	void Start()
	{
		Spawn ();
	}

	void Spawn()
	{
		Instantiate(obj[Random.Range(0, obj.Length)], transform.position, Quaternion.identity);
		Invoke ("Spawn", Random.Range (spawnMax, spawnMax));
	}

}
