<?php
    include_once "conn.php";

    // Get the information from the Game Over page.
    $name = mysqli_real_escape_string($db, $_POST['playerName']);
    $score = mysqli_real_escape_string($db, $_POST['playerScore']);

    // Insert data into DATABASE
    mysqli_query($db, "INSERT INTO highscore(name, score) VALUES('$name', '$score')");

    // Close DATABASE connection
    mysqli_close($db);
?>
