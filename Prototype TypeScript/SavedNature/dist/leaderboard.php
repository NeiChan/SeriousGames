<?php
    include_once "php/conn.php";
    $position = 1;

    $query = "SELECT * FROM highscore ORDER BY score DESC";
    $result = mysqli_query($db, $query);
    $leaderb = [];

    while($row = mysqli_fetch_assoc($result)) {
        $leaderb[] = $row;
    }
    mysqli_close($db);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Save Nature Prototype 2.0</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div class="wrapper">
            <div class="wrapperLeaderboard">
                <img src="images/interface/leaderboard/savedNatureLeaderboard.png" alt="" />
                <div class = "wrapperTable">
                <table class = "leaderboard">
                    <tr>
                        <th>Rank</th>
                        <th>Naam</th>
                        <th>Score</th>
                        <!-- <th>Datum</th> -->
                    </tr>
                    <?php foreach ($leaderb as $leader) {
                        if($position <= 10) { ?>
                            <tr>
                                <?php if($position == 1) {
                                    ?><td><div class = "wrapperMedal">
                                        <?php echo "<img class = 'leaderboardMedals' src = 'images/interface/leaderboard/goldMedal.png'></img>" ?>
                                    </div></td>
                                <?php }else if($position == 2) {
                                    ?><td><div class = "wrapperMedal">
                                        <?php echo "<img class = 'leaderboardMedals' src = 'images/interface/leaderboard/silverMedal.png'></img>" ?>
                                    </div></td>
                                <?php }else if($position == 3) {
                                    ?><td><div class = "wrapperMedal">
                                        <?php echo "<img class = 'leaderboardMedalsBronze' src = 'images/interface/leaderboard/bronzeMedal.png'></img>" ?>
                                    </div></td>
                                <?php }else{
                                    ?><td><?= $position ?></td>
                                    <?php
                                } ?>
                                <td><?= $leader['name'] ?></td>
                                <td><?= $leader['score'] ?></td>
                                <!-- <td><?= $leader['date'] ?></td> -->
                            </tr>
                            <?php $position++;}} ?>
                </table>
            </div>
            </div>
        </div>

        <!-- <script src='js/main.js'></script> -->
    </body>
</html>
