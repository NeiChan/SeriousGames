window.addEventListener("load", function () {
    new Main();
});
var Main = (function () {
    function Main() {
        this.createPlayer();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Main.prototype.createPlayer = function () {
        this.player = new Player();
    };
    Main.prototype.gameLoop = function () {
        this.player.moveplayer();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Main;
}());
var Player = (function () {
    function Player() {
        this.runForce = 0;
        this.jumpForce = 0;
        this.frame = 0;
        this.player = document.createElement("player");
        this.player.setAttribute("id", "Player1");
        this.posX = 100;
        this.posY = 500;
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        document.body.appendChild(this.player);
        window.addEventListener("keydown", this.playerInput.bind(this));
        window.addEventListener("keyup", this.stopMoving.bind(this));
        console.log("Player class has been made");
    }
    Player.prototype.playerInput = function (e) {
        switch (e.keyCode) {
            case 32:
                console.log("space has been pressed!");
                this.jumpForce = -5;
                break;
            case 65:
                console.log("A has been pressed!");
                this.runForce = -5;
                break;
            case 68:
                console.log("D has been pressed!");
                this.runForce = 5;
                break;
            case 83:
                console.log("S has been pressed!");
                this.jumpForce = 5;
                break;
            case 87:
                console.log("W has been pressed!");
                this.jumpForce = -5;
                break;
            default:
                break;
        }
    };
    Player.prototype.getPositionY = function () {
        var playerPosY = this.posY;
        return playerPosY;
    };
    Player.prototype.moveplayer = function () {
        this.posX = this.posX + this.runForce;
        this.posY = this.posY + this.jumpForce;
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
    };
    Player.prototype.stopMoving = function (e) {
        if (e.keyCode === 65 || e.keyCode === 68) {
            this.runForce = 0;
        }
        else {
            this.jumpForce = 0;
        }
    };
    return Player;
}());
//# sourceMappingURL=main.js.map