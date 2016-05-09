using UnityEngine;
using System.Collections;

public class HUDscript : MonoBehaviour {

	float playerScore = 0;

	// Update is called once per frame
	void Update () {
		playerScore += Time.deltaTime;
	}

	public void increaseScore(int amount)
	{
		playerScore += amount;
	}

	void OnDisable()
	{
		PlayerPrefs.SetInt ("Score", (int)(playerScore * 100));
	}

	void OnGUI()
	{
		GUI.contentColor = Color.black;
		GUI.Label (new Rect (10, 10, 100, 30), "Score: " + (int) (playerScore * 100));
	}
}
