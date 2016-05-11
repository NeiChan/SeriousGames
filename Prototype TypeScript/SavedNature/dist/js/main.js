window.addEventListener("load", function () {
    new Main();
});
var Main = (function () {
    function Main() {
        this.createPlayer();
    }
    Main.prototype.createPlayer = function () {
        var player = new Player();
        window.onkeydown = player.playerInput;
    };
    return Main;
}());
var Player = (function () {
    function Player() {
        this.getPositionY = function () {
            var playerPosY = document.getElementById("Player1").style.top;
            console.log(playerPosY);
            return playerPosY;
        };
        this.player = document.createElement("player");
        this.player.setAttribute("id", "Player1");
        this.posX = 100;
        this.posY = 100;
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        console.log(this.posX);
        document.body.appendChild(this.player);
        console.log("Player class should have been made");
    }
    Player.prototype.playerInput = function (e) {
        var curPosY = this.getPositionY;
        if (e.keyCode === 32) {
            console.log("Space has been pressed!");
            var jumpForce = 15;
        }
    };
    return Player;
}());
//# sourceMappingURL=main.js.map