var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function createDiv(elementName) {
    var el = document.createElement(elementName);
    document.body.appendChild(el);
    return el;
}
window.addEventListener("load", function () {
    new Game();
});
var Game = (function () {
    function Game() {
        this.player = new Player();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.player.movePlayer();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject(pos_x, pos_y, speed_x, speed_y, objectName) {
        this.div = createDiv(objectName);
        this.position_x = pos_x;
        this.position_y = pos_y;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.div.style.transform = "translate(" + this.position_x + "," + this.position_y + ")";
    }
    GameObject.prototype.Draw = function () {
    };
    GameObject.prototype.Update = function () {
    };
    return GameObject;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this, 10, 10, 5, 0, 'background');
    }
    return Background;
}(GameObject));
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
    Player.prototype.movePlayer = function () {
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