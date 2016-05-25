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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Save Nature Prototype 1.0</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <table class="leaderboards">
            <tr>
                <th>Positie</th>
                <th>Naam</th>
                <th>Score</th>
                <th>Datum</th>
            </tr>
            <?php foreach ($leaderb as $leader) { ?>
                <tr>
                    <td><?= $position ?></td>
                    <td><?= $leader['name'] ?></td>
                    <td><?= $leader['score'] ?></td>
                    <td><?= $leader['date'] ?></td>
                </tr>
            <?php $position++;} ?>
        </table>

        <a href = "index.html"><button>Home</button></a>

        <!-- <script src='js/main.js'></script> -->
    </body>
</html>
