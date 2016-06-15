var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game(lvl) {
        var _this = this;
        this.assets = new AssetsManager();
        this.WorldSpeed = 5;
        this.objectList = new Array();
        this.BGList = new Array();
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        this.context.save();
        this.context.scale(1.8, 1.8);
        this.Level = new level(this, lvl);
        var bearImg = this.assets.polarbear2;
        this._ui = new UI({ x: 50, y: 50 });
        this._generator = new JunkGenerator(this, this.objectList, this.BGList, lvl);
        this._bear = new polarBear(this, { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 240, speed: 3 });
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var _i = 0, _a = this.BGList; _i < _a.length; _i++) {
            var obj2 = _a[_i];
            obj2.draw();
        }
        for (var _b = 0, _c = this.objectList; _b < _c.length; _b++) {
            var obj = _c[_b];
            obj.Draw();
        }
        this._ui.draw();
        this._bear.draw();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.update = function () {
        this._generator.generateJunk();
        for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.Update();
        }
        for (var _b = 0, _c = this.BGList; _b < _c.length; _b++) {
            var obj2 = _c[_b];
            obj2.update();
        }
        this._ui.update();
        this._bear.update();
        this.checkCollisions();
        if (this._ui.getScore() > 50) {
            this._ui.addScore(-60);
            this._generator.level = 2;
            console.log("calle");
        }
        this.draw();
    };
    Game.prototype.checkCollisions = function () {
        for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
            var obj2 = _a[_i];
            for (var _b = 0, _c = this.objectList; _b < _c.length; _b++) {
                var obj = _c[_b];
                if (obj instanceof bullet || obj2 instanceof bullet) {
                    var obj1Bounds = obj2.getBounds();
                    var obj2Bounds = obj.getBounds();
                    if (obj1Bounds.hitsOtherRectangle(obj2Bounds)) {
                        obj2.onCollision(obj);
                        obj.onCollision(obj2);
                    }
                }
            }
        }
        for (var _d = 0, _e = this.objectList; _d < _e.length; _d++) {
            var obj = _e[_d];
            var obj1Bounds = this._bear.getBounds();
            var obj2Bounds = obj.getBounds();
            if (obj1Bounds.hitsOtherRectangle(obj2Bounds)) {
                this._bear.onCollision(obj);
                obj.onCollision(this._bear);
            }
        }
    };
    Game.prototype.deleteGO = function (obj, obj2) {
        if (obj) {
            var index = this.objectList.indexOf(obj);
            this.objectList.splice(index, 1);
        }
        else if (obj2) {
            var index = this.BGList.indexOf(obj2);
            this.BGList.splice(index, 1);
        }
        else {
            console.log("not true shit");
        }
    };
    Game.prototype.checkDestructable = function (currentObj, listObjects) {
        var index = listObjects.indexOf(currentObj);
        var hasDestructable = listObjects[index].hasDestructable;
        if (hasDestructable) {
            if (index > -1) {
                return listObjects.splice(index, 1);
            }
        }
    };
    Game.prototype.getWorldSpeed = function () {
        return this.WorldSpeed;
    };
    Game.prototype.setWorldSpeed = function (int) {
        this.WorldSpeed = int;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Menu();
});
var Menu = (function () {
    function Menu() {
        var _this = this;
        this.gameTitle = document.createElement("DIV");
        this.btnStart = document.createElement("button");
        this.btnClose = document.createElement("button");
        this.btnHighscores = document.createElement("button");
        this.gameTitle.setAttribute("id", "gameTitle");
        this.btnStart.setAttribute("id", "btnStart");
        this.btnClose.setAttribute("id", "btnClose");
        this.btnHighscores.setAttribute("id", "btnHighscores");
        this.gameTitle.style.backgroundImage = "url('images/interface/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";
        this.btnHighscores.addEventListener("click", function () { return _this.showLeaderboards(); });
        this.btnStart.addEventListener("click", this.removeMenu);
        var content = document.getElementById('content');
        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);
    }
    Menu.prototype.showLeaderboards = function () {
        window.location.href = "leaderboard.php";
    };
    Menu.prototype.removeMenu = function () {
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        document.body.style.backgroundImage = "";
        this.main = new Game(1);
    };
    return Menu;
}());
var bgObjects = (function () {
    function bgObjects(source, speed, game) {
        this.speed = 1;
        this.speedOffset = 0;
        this.timer = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.currentFrame = 0;
        this.maxFrame = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationY = 0;
        this.animationSpeed = 0;
        this.init(source);
        if (speed) {
            this.speedOffset = speed;
        }
        this.game = game;
        this.createCanvasElement();
    }
    bgObjects.prototype.init = function (source) {
        utility.CopyProperties(source, this);
    };
    bgObjects.prototype.createCanvasElement = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = this.imgSrc;
    };
    bgObjects.prototype.changeSpeed = function (int) {
        this.speed = int;
    };
    bgObjects.prototype.update = function () {
        this.x = this.x + (this.game.WorldSpeed * -(this.speed * this.speedOffset));
    };
    bgObjects.prototype.getX = function () {
        return this.x;
    };
    bgObjects.prototype.setX = function (int) {
        this.x = int;
    };
    bgObjects.prototype.draw = function () {
        this.timer++;
        if (this.timer % this.animationSpeed == 0) {
            this.currentFrame++;
        }
        if (this.currentFrame > this.maxFrame) {
            this.currentFrame = 0;
        }
        this.context.drawImage(this.image, this.currentFrame * this.frameWidth, this.animationY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
    };
    return bgObjects;
}());
var GameObjects = (function () {
    function GameObjects(source) {
        this.assets = new AssetsManager();
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.currentFrame = 0;
        this.maxFrame = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationY = 0;
        this.animationSpeed = 0;
        this.timer = 0;
        this.init(source);
        this.createCanvasElement();
    }
    GameObjects.prototype.init = function (source) {
        utility.CopyProperties(source, this);
    };
    GameObjects.prototype.createCanvasElement = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = this.imgSrc;
    };
    GameObjects.prototype.newImage = function (img) {
        this.image.src = img;
    };
    GameObjects.prototype.changeY = function (int) {
        this.directionY = int;
    };
    GameObjects.prototype.changeAnimationY = function (int) {
        this.animationY = int;
    };
    GameObjects.prototype.changeX = function (int) {
        this.directionX = int;
    };
    GameObjects.prototype.updateY = function (int) {
        this.y = this.y + int;
    };
    GameObjects.prototype.getY = function () {
        return this.y;
    };
    GameObjects.prototype.getX = function () {
        return this.x;
    };
    GameObjects.prototype.setY = function (int) {
        this.y = int;
    };
    GameObjects.prototype.setX = function (int) {
        this.x = int;
    };
    GameObjects.prototype.changeMovementX = function (int) {
        this.x = this.x + this.speed * this.directionX + int;
    };
    GameObjects.prototype.getFrameHeight = function () {
        return this.frameHeight;
    };
    GameObjects.prototype.getFrameWidth = function () {
        return this.frameWidth;
    };
    GameObjects.prototype.move = function () {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    };
    GameObjects.prototype.Draw = function () {
        this.timer++;
        if (this.timer % this.animationSpeed == 0) {
            this.currentFrame++;
        }
        if (this.currentFrame > this.maxFrame) {
            this.currentFrame = 0;
        }
        this.context.drawImage(this.image, this.currentFrame * this.frameWidth, this.animationY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
    };
    GameObjects.prototype.Update = function () {
    };
    return GameObjects;
}());
var level = (function () {
    function level(game, level) {
        this.game = game;
        this.level = level;
        this.setGame();
    }
    level.prototype.setGame = function () {
        switch (this.level) {
            case 1: {
                var backgroundImg = this.game.assets.greenBG4;
                this._background = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559 }, 1, this.game);
                this.game.BGList.push(this._background);
            }
            case 2: {
                var backgroundImg = this.game.assets.greenBG4;
                this._background = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559 }, 1, this.game);
                this.game.BGList.push(this._background);
            }
        }
    };
    return level;
}());
var utility = (function () {
    function utility() {
    }
    utility.CopyProperties = function (source, target) {
        for (var prop in source) {
            if (prop !== undefined) {
                target[prop] = source[prop];
            }
            else {
                console.error("Cannot set undefined property: " + prop);
            }
        }
    };
    utility.createDiv = function (elementName) {
        var el = document.createElement(elementName);
        document.body.appendChild(el);
        return el;
    };
    utility.addSoundEvent = function (el, soundName, event) {
        if (event) {
            el.addEventListener(event, function () { return utility.playSound(soundName); });
        }
        else {
            el.addEventListener('click', function () { return utility.playSound(soundName); });
        }
        return el;
    };
    utility.playSound = function (soundName) {
        var sound = new Howl({
            urls: ["sound/" + soundName],
            volume: 0.4,
            sprite: {
                blast: [0, 2000],
            }
        });
        sound.play('blast');
    };
    return utility;
}());
var Rectangle = (function () {
    function Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Rectangle.prototype.leftCollision = function (rec) {
        return (this.x < rec.x);
    };
    Rectangle.prototype.topCollision = function (rec) {
        return (this.y > rec.y);
    };
    Rectangle.prototype.hitsOtherRectangle = function (rec) {
        return (this.x < rec.x + rec.width && this.x + this.width > rec.x && this.y < rec.y + rec.height && this.height + this.y > rec.y);
    };
    Rectangle.prototype.isInside = function (posx, posy) {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    };
    Rectangle.prototype.hasOverlap = function (rec) {
        var differencex = this.x - rec.x;
        var differencey = this.y - rec.y;
        return Math.abs(differencex) < this.width / 2 + rec.width / 2 && Math.abs(differencey) < this.height / 2 + rec.height / 2;
    };
    return Rectangle;
}());
var AssetsManager = (function () {
    function AssetsManager() {
        this.polarbear = "images/polarbear/spritesheet.png";
        this.polarbear2 = "images/polarbear/spritesheet3.png";
        this.desertBase = "images/levels/desert/";
        this.greenBase = "images/levels/green/";
        this.winterBase = "images/levels/winter/";
        this.collectBase = "images/collectables/";
        this.collectCoins = this.collectBase + "coins/";
        this.desBG = this.desertBase + "BG.png";
        this.desTiles = [
            this.desertBase + "Tiles/1.png",
            this.desertBase + "Tiles/2.png",
            this.desertBase + "Tiles/3.png",
            this.desertBase + "Tiles/4.png",
            this.desertBase + "Tiles/5.png",
            this.desertBase + "Tiles/6.png",
            this.desertBase + "Tiles/7.png",
            this.desertBase + "Tiles/8.png",
            this.desertBase + "Tiles/9.png",
            this.desertBase + "Tiles/10.png",
            this.desertBase + "Tiles/11.png",
            this.desertBase + "Tiles/12.png",
            this.desertBase + "Tiles/13.png",
            this.desertBase + "Tiles/14.png",
            this.desertBase + "Tiles/15.png",
            this.desertBase + "Tiles/16.png",
        ];
        this.desObjects = {
            Bush1: this.desertBase + "Objects/Bush1.png",
            Bush2: this.desertBase + "Objects/Bush2.png",
            Cactus1: this.desertBase + "Objects/Cactus1.png",
            Cactus2: this.desertBase + "Objects/Cactus2.png",
            Cactus3: this.desertBase + "Objects/Cactus3.png",
            Crate: this.desertBase + "Objects/Crate.png",
            Grass1: this.desertBase + "Objects/Grass1.png",
            Grass2: this.desertBase + "Objects/Grass2.png",
            Sign: this.desertBase + "Objects/Sign.png",
            SignArrow: this.desertBase + "Objects/SignArrow.png",
            Skeleton: this.desertBase + "Objects/Skeleton.png",
            Stone: this.desertBase + "Objects/Stone.png",
            StoneBlock: this.desertBase + "Objects/StoneBlock.png",
        };
        this.greenBG = this.greenBase + "BG2.png";
        this.greenBG2 = this.greenBase + "menu_background2.png";
        this.greenBG3 = this.greenBase + "BG3.png";
        this.greenBG4 = this.greenBase + "BG4.png";
        this.greenTiles = [
            this.greenBase + "Tiles/1.png",
            this.greenBase + "Tiles/2.png",
            this.greenBase + "Tiles/3.png",
            this.greenBase + "Tiles/4.png",
            this.greenBase + "Tiles/5.png",
            this.greenBase + "Tiles/6.png",
            this.greenBase + "Tiles/7.png",
            this.greenBase + "Tiles/8.png",
            this.greenBase + "Tiles/9.png",
            this.greenBase + "Tiles/10.png",
            this.greenBase + "Tiles/11.png",
            this.greenBase + "Tiles/12.png",
            this.greenBase + "Tiles/13.png",
            this.greenBase + "Tiles/14.png",
            this.greenBase + "Tiles/15.png",
            this.greenBase + "Tiles/16.png",
            this.greenBase + "Tiles/17.png",
            this.greenBase + "Tiles/18.png",
        ];
        this.greenObjects = {
            Bush1: this.greenBase + "Objects/Bush1.png",
            Bush2: this.greenBase + "Objects/Bush2.png",
            Bush3: this.greenBase + "Objects/Bush3.png",
            Bush4: this.greenBase + "Objects/Bush4.png",
            Crate: this.greenBase + "Objects/Crate.png",
            Tree1: this.greenBase + "Objects/Tree_1.png",
            Tree2: this.greenBase + "Objects/Tree_2.png",
            Tree3: this.greenBase + "Objects/Tree_3.png",
            Sign1: this.greenBase + "Objects/Sign_1.png",
            Sign2: this.greenBase + "Objects/Sign_2.png",
            Stone: this.greenBase + "Objects/Stone.png",
        };
        this.winterBG = this.winterBase + "BG.png";
        this.winterTiles = [
            this.winterBase + "Tiles/1.png",
            this.winterBase + "Tiles/2.png",
            this.winterBase + "Tiles/3.png",
            this.winterBase + "Tiles/4.png",
            this.winterBase + "Tiles/5.png",
            this.winterBase + "Tiles/6.png",
            this.winterBase + "Tiles/7.png",
            this.winterBase + "Tiles/8.png",
            this.winterBase + "Tiles/9.png",
            this.winterBase + "Tiles/10.png",
            this.winterBase + "Tiles/11.png",
            this.winterBase + "Tiles/12.png",
            this.winterBase + "Tiles/13.png",
            this.winterBase + "Tiles/14.png",
            this.winterBase + "Tiles/15.png",
            this.winterBase + "Tiles/16.png",
            this.winterBase + "Tiles/17.png",
            this.winterBase + "Tiles/18.png",
        ];
        this.winterObjects = {
            Crystal: this.winterBase + "Objects/Crystal.png",
            Crate: this.winterBase + "Objects/Crate.png",
            Tree1: this.winterBase + "Objects/Tree_1.png",
            Tree2: this.winterBase + "Objects/Tree_2.png",
            IceBox: this.winterBase + "Objects/IceBox.png",
            SnowMan: this.winterBase + "Objects/SnowMan.png",
            Igloo: this.winterBase + "Objects/Igloo.png",
            Stone: this.winterBase + "Objects/Stone.png",
            Sign1: this.winterBase + "Objects/Sign_1.png",
            Sign2: this.winterBase + "Objects/Sign_2.png",
        };
        this.collectables = {
            goldCoin: this.collectCoins + "goldCoin.png"
        };
    }
    return AssetsManager;
}());
var JunkGenerator = (function () {
    function JunkGenerator(game, objList, bglist, lvl) {
        this.assets = new AssetsManager();
        this.minNumber = 1;
        this.maxNumber = 9;
        this.counter = 0;
        this.updateTimout = 60;
        this.minPositionY = 185;
        this.maxPositionY = 215;
        this.minPositionX = 1100;
        this.maxPositionX = 1150;
        this.objectList = objList;
        this.BGList = bglist;
        this._game = game;
        this.level = lvl;
        console.log("JunkGenerator is activated...");
    }
    JunkGenerator.prototype.getRandomNumber = function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    };
    JunkGenerator.prototype.getRandomFloat = function (range) {
        var random = (Math.random() * range) + 0.2;
        return random;
    };
    JunkGenerator.prototype.generateJunk = function () {
        switch (this.level) {
            case 1: {
                this.generateLevel1();
                break;
            }
            case 2: {
                this.generateLevel2();
                break;
            }
        }
    };
    JunkGenerator.prototype.generateLevel1 = function () {
        this.counter++;
        if (this.counter > this.updateTimout) {
            var random = this.getRandomNumber(this.minNumber, this.maxNumber);
            var randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            var randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            var crateImg = this.assets.desObjects.Crate;
            var bush = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 145 }, this.getRandomFloat(1.05), this._game);
            var coin = new Coin(this._game, { imgSrc: this.assets.collectables.goldCoin, x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 5 });
            var Crate = new crate(this._game, { imgSrc: this.assets.desObjects.Crate, x: randomX, y: randomY, frameHeight: 101, frameWidth: 101, speed: 5 });
            switch (random) {
                case 1:
                    this.objectList.push(coin);
                    break;
                case 2:
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(coin);
                    break;
                case 3:
                    this.BGList.push(bush);
                    break;
                case 4:
                    this.objectList.push(coin);
                    break;
                case 5:
                    this.objectList.push(Crate);
                    break;
                case 6:
                    this.objectList.push(coin);
                    break;
                case 7:
                    this.BGList.push(bush);
                    break;
                case 8:
                    this.BGList.push(bush);
                    break;
                case 9:
                    this.objectList.push(Crate);
                    break;
            }
            this.counter = 0;
        }
    };
    JunkGenerator.prototype.generateLevel2 = function () {
        this.counter++;
        var minPositionY = 0;
        var maxPositionY = 15;
        if (this.counter > this.updateTimout) {
            var random = this.getRandomNumber(this.minNumber, this.maxNumber);
            var randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            var randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            var randomYTree = this.getRandomNumber(minPositionY, maxPositionY);
            var crateImg = this.assets.desObjects.Crate;
            var bush = new BackgroundObject({ imgSrc: this.assets.winterObjects.Tree2, x: randomX, y: randomYTree, frameHeight: 280, frameWidth: 228 }, this.getRandomFloat(1.05), this._game);
            var coin = new Coin(this._game, { imgSrc: this.assets.collectables.goldCoin, x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 5 });
            var Crate = new crate(this._game, { imgSrc: this.assets.winterObjects.IceBox, x: randomX, y: randomY, frameHeight: 101, frameWidth: 101, speed: 5 });
            switch (random) {
                case 1:
                    this.objectList.push(coin);
                    break;
                case 2:
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(coin);
                    break;
                case 3:
                    this.BGList.push(bush);
                    break;
                case 4:
                    this.objectList.push(coin);
                    break;
                case 5:
                    this.objectList.push(Crate);
                    break;
                case 6:
                    this.objectList.push(coin);
                    break;
                case 7:
                    this.BGList.push(bush);
                    break;
                case 8:
                    this.BGList.push(bush);
                    break;
                case 9:
                    this.objectList.push(Crate);
                    break;
            }
            this.counter = 0;
        }
    };
    return JunkGenerator;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(source, speed, game) {
        _super.call(this, source, speed, game);
    }
    Background.prototype.draw = function () {
        _super.prototype.draw.call(this);
    };
    Background.prototype.update = function () {
        _super.prototype.update.call(this);
        if (_super.prototype.getX.call(this) + this.image.x < -623) {
            _super.prototype.setX.call(this, 0);
        }
    };
    Background.prototype.changeBackground = function (image) {
    };
    return Background;
}(bgObjects));
var BackgroundObject = (function (_super) {
    __extends(BackgroundObject, _super);
    function BackgroundObject(source, speed, _game) {
        _super.call(this, source, speed, _game);
        this._game = _game;
    }
    BackgroundObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
    };
    BackgroundObject.prototype.wait = function () {
    };
    BackgroundObject.prototype.update = function () {
        _super.prototype.update.call(this);
        if (_super.prototype.getX.call(this) <= -100) {
            this._game.deleteGO(null, this);
        }
    };
    return BackgroundObject;
}(bgObjects));
var bullet = (function (_super) {
    __extends(bullet, _super);
    function bullet(game, source) {
        _super.call(this, source);
        this.game = game;
    }
    bullet.prototype.onCollision = function (gameObject) {
    };
    bullet.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    bullet.prototype.Update = function () {
        this.x = this.x + 10;
        if (this.x >= 1500) {
            this.game.deleteGO(this);
        }
    };
    return bullet;
}(GameObjects));
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(game, source) {
        _super.call(this, source);
        this.hasCollision = true;
        this.hasDestructable = true;
        this._game = game;
    }
    Coin.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    Coin.prototype.onCollision = function (gameObject) {
        this._game._ui.updateScore(10);
        var sound = new Howl({
            urls: ["sound/mario1up.mp3"],
            volume: 0.4,
            sprite: {
                blast: [0, 2000],
            }
        });
        sound.play('blast');
        this._game.deleteGO(this, null);
    };
    Coin.prototype.draw = function () {
        _super.prototype.Draw.call(this);
    };
    Coin.prototype.Update = function () {
        this.x = this.x - this._game.getWorldSpeed();
        if (this.x <= 0) {
            this._game.deleteGO(this);
        }
    };
    return Coin;
}(GameObjects));
var CollidableObject = (function (_super) {
    __extends(CollidableObject, _super);
    function CollidableObject(source) {
        _super.call(this, source);
        this.hasCollision = true;
    }
    CollidableObject.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    CollidableObject.prototype.onCollision = function (gameObject) {
    };
    CollidableObject.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y);
    };
    CollidableObject.prototype.wait = function () {
    };
    CollidableObject.prototype.update = function () {
    };
    return CollidableObject;
}(GameObjects));
var crate = (function (_super) {
    __extends(crate, _super);
    function crate(game, source) {
        _super.call(this, source);
        this.hasCollision = true;
        this.game = game;
    }
    crate.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    crate.prototype.onCollision = function (gameObject) {
        this.hasCollision = true;
        if (this.bearJump === true) {
            this.game.setWorldSpeed(5);
        }
        else if (gameObject instanceof bullet) {
            this.game.setWorldSpeed(5);
        }
        else {
        }
        if (gameObject instanceof bullet) {
            this.game.deleteGO(this);
            var sound = new Howl({
                urls: ["sound/go.ogg"],
                volume: 0.4,
                sprite: {
                    blast: [0, 2000],
                }
            });
            sound.play('blast');
        }
    };
    crate.prototype.getY = function () {
        return _super.prototype.getY.call(this);
    };
    crate.prototype.getObjectWidth = function () {
        return _super.prototype.getFrameWidth.call(this);
    };
    crate.prototype.onCollisionExit = function () {
        this.hasCollision = false;
    };
    crate.prototype.Update = function () {
        this.x = this.x - this.game.getWorldSpeed();
    };
    crate.prototype.draw = function () {
        _super.prototype.Draw.call(this);
    };
    crate.prototype.bearJumps = function (bool) {
        this.bearJump = bool;
    };
    return crate;
}(GameObjects));
var DestructableObject = (function (_super) {
    __extends(DestructableObject, _super);
    function DestructableObject(source) {
        _super.call(this, source);
        this.hasCollision = true;
        this.hasDestructable = true;
    }
    DestructableObject.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    DestructableObject.prototype.onCollision = function (gameObject) {
    };
    DestructableObject.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y);
    };
    DestructableObject.prototype.wait = function () {
    };
    DestructableObject.prototype.update = function () {
    };
    return DestructableObject;
}(GameObjects));
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
var polarBear = (function (_super) {
    __extends(polarBear, _super);
    function polarBear(game, source) {
        var _this = this;
        _super.call(this, source);
        this.asset = new AssetsManager();
        this._isJumping = false;
        this._jumpTimer = 2.39645;
        this.hasCollision = true;
        this.startCollisionPos = 0;
        this.endCollisionPos = 0;
        this.myY = 0;
        this.isMoving = false;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this._game = game;
    }
    polarBear.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    polarBear.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 1);
                _super.prototype.changeAnimationY.call(this, 0);
                this.isMoving = true;
                this._game.setWorldSpeed(5);
                break;
            case 37:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, -1);
                _super.prototype.changeAnimationY.call(this, 2);
                this.isMoving = true;
                this._game.setWorldSpeed(2);
                break;
            case 70:
                this._game.objectList.push(new bullet(this._game, { imgSrc: this.asset.collectables.goldCoin, x: this.getX() + 50, y: this.getY(), frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: -5 }));
                break;
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 1);
                break;
            case 32:
                if (this._isJumping === true) {
                    console.log('already jumping');
                }
                else {
                    this._isJumping = true;
                    this.myY = _super.prototype.getY.call(this);
                    var sound = new Howl({
                        urls: ["sound/jumpsound.mp3"],
                        volume: 0.2,
                        sprite: {
                            blast: [0, 2000],
                        }
                    });
                    sound.play('blast');
                }
                break;
        }
    };
    polarBear.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 0);
                this.isMoving = false;
                break;
            case 37:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 2);
                this.isMoving = false;
                break;
            case 39:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 0);
                this.isMoving = false;
                break;
            case 32:
                break;
            default:
                break;
        }
    };
    polarBear.prototype.draw = function () {
        _super.prototype.Draw.call(this);
    };
    polarBear.prototype.jump = function () {
        this._game.setWorldSpeed(5);
        var self = this;
        this._jumpTimer += 0.1;
        var posY = 0;
        posY = -((this._jumpTimer - 2.25) * this._jumpTimer) + 5;
        posY = -posY * 5;
        _super.prototype.updateY.call(this, posY);
        if (this._jumpTimer >= 4.5) {
            this._isJumping = false;
            this._jumpTimer = 2.39645;
            console.log("y after jump =" + _super.prototype.getY.call(this));
        }
    };
    polarBear.prototype.wait = function () {
    };
    polarBear.prototype.update = function () {
        if (this.currentCollision) {
            this.currentCollision.bearJumps(this._isJumping);
        }
        if (this.hasCollision) {
        }
        else {
            _super.prototype.setY.call(this, 240);
        }
        _super.prototype.move.call(this);
        if (this._isJumping === true) {
            this.jump();
        }
        else {
            for (var _i = 0, _a = this._game.objectList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj instanceof crate) {
                    if (obj.getX() <= _super.prototype.getX.call(this)) {
                        _super.prototype.setY.call(this, 240);
                    }
                }
            }
        }
    };
    polarBear.prototype.updateUIScore = function (points) {
        this._game._ui.updateScore(points);
    };
    polarBear.prototype.getMoving = function () {
        return this.isMoving;
    };
    polarBear.prototype.onCollision = function (gameObject) {
        this.isMoving;
        this.hasCollision = true;
        this.checkObj(gameObject);
    };
    polarBear.prototype.checkObj = function (gameObject) {
        if (gameObject instanceof crate) {
            var y = gameObject.getY();
            this.currentCollision = gameObject;
            var crateWidth = gameObject.getFrameWidth();
            var crateHeight = gameObject.getFrameHeight();
            var polarBounds = this.getBounds();
            var crateBounds = gameObject.getBounds();
            var count = 0;
            var onTop = 0;
            if (polarBounds.leftCollision(crateBounds)) {
                console.log("left collision");
                this._game.setWorldSpeed(0);
            }
            else if (polarBounds.topCollision(crateBounds)) {
                console.log("top collision");
                var onTop_1 = crateBounds.y - (crateBounds.height / 2.8);
                this.y = onTop_1;
                this._game.setWorldSpeed(2);
            }
            else {
                this.hasCollision = false;
            }
        }
    };
    polarBear.prototype.getY = function () {
        return _super.prototype.getY.call(this);
    };
    polarBear.prototype.getX = function () {
        return _super.prototype.getX.call(this);
    };
    polarBear.prototype.getObjectWidth = function () {
        return _super.prototype.getFrameWidth.call(this);
    };
    return polarBear;
}(GameObjects));
var testSubject = (function (_super) {
    __extends(testSubject, _super);
    function testSubject(source) {
        _super.call(this, source);
        this.hasCollision = true;
        this.hasDestructable = true;
    }
    testSubject.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    testSubject.prototype.onCollision = function (gameObject) {
        console.log("Doe iets onCollision voor testSubject");
    };
    testSubject.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y);
    };
    testSubject.prototype.wait = function () {
    };
    testSubject.prototype.update = function () {
    };
    return testSubject;
}(GameObjects));
var UI = (function (_super) {
    __extends(UI, _super);
    function UI(source) {
        _super.call(this, source);
        this._font = "14px Arial";
        this._counter = 0;
        this.context.font = this._font;
    }
    UI.prototype.generateScore = function () {
        this.context.fillText("Score :  ", this.x, this.y);
        this.context.fillText(this._counter.toString(), this.x + 50, this.y);
    };
    UI.prototype.getScore = function () {
        return this._counter;
    };
    UI.prototype.addScore = function (int) {
        this._counter = this._counter + int;
    };
    UI.prototype.updateScore = function (score) {
        this._counter += score;
    };
    UI.prototype.draw = function () {
        this.generateScore();
    };
    UI.prototype.update = function () {
    };
    return UI;
}(GameObjects));
//# sourceMappingURL=main.js.map