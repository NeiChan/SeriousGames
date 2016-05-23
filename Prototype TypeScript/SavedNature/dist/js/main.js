var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        console.log(this.assets.polarbear);
        this.player = new Player();
        msRequestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.update = function () {
        this.player.movePlayer();
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        requestAnimationFrame(function () { return _this.update(); });
    };
    return Game;
}());
function createDiv(elementName) {
    var el = document.createElement(elementName);
    document.body.appendChild(el);
    return el;
}
window.addEventListener("load", function () {
    new Game();
});
var GameObject = (function () {
    function GameObject(pos_x, pos_y, speed_x, speed_y, objectName) {
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
    }
    GameObject.prototype.Draw = function () {
    };
    GameObject.prototype.Update = function () {
    };
    return GameObject;
}());
var GameObject = (function () {
    function GameObject() {
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.createCanvasElement();
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 3;
    }
    GameObject.prototype.createCanvasElement = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = 'images/battleship.png';
    };
    GameObject.prototype.Draw = function () {
    };
    GameObject.prototype.Update = function () {
    };
    return GameObject;
}());
var AssetsManager = (function () {
    function AssetsManager() {
    }
    AssetsManager.polarbear = "test";
    return AssetsManager;
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
    Player.prototype.draw = function () {
    };
    return Player;
}());
//# sourceMappingURL=main.js.map