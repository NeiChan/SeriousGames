<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Save Nature Prototype 2.0</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div class="formWrapper">
            <div class="gameOverBearWrapper">
                <img src="images/interface/gameOver/polarBearSign.png" alt="Je score" />
            </div>
            <form class="" action="php/uploadScore.php" method="post">
                <div class="scoreWrapper">
                    <input class = "playerScore" type="text" name="playerScore" value="150000" readonly>
                </div>
                <input type="text" name="playerName" value="" placeholder="Jouw naam" maxlength="10">
                <input type="submit" name="submit" value="Opslaan">
            </form>
        </div>
    </body>
</html>
