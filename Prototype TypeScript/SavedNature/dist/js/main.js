var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        var _this = this;
        this.assets = new AssetsManager();
        this.objectList = [];
        Game.soundmanager = new SoundsManager('soundfile');
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        this.context.save();
        this.context.scale(1.8, 1.8);
        var backgroundImg = this.assets.greenBG;
        var bearImg = this.assets.polarbear;
        var bushImg = this.assets.desObjects.Bush1;
        var goldCoinImg = this.assets.collectables.goldCoin;
        var crateImg = this.assets.desObjects.Crate;
        this._background = new Background({ imgSrc: backgroundImg, x: 0, y: 0 });
        this._ui = new UI({ x: 50, y: 50 });
        this._generator = new JunkGenerator(this, this.objectList);
        this._hardobj = new crate(this, { imgSrc: crateImg, x: 150, y: 215, frameHeight: 101, frameWidth: 101 });
        this._hardobj2 = new crate(this, { imgSrc: crateImg, x: 450, y: 215, frameHeight: 101, frameWidth: 101 });
        this._dObject = new DestructableObject({ imgSrc: bushImg, x: 150, y: 530, frameHeight: 145, frameWidth: 80 });
        this._bObject = new BackgroundObject({ imgSrc: bushImg, x: 250, y: 530, frameHeight: 145, frameWidth: 80 });
        this._cObject = new CollidableObject({ imgSrc: bushImg, x: 450, y: 530, frameHeight: 145, frameWidth: 80 });
        this._bear = new polarBear(this, { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 260, speed: 3 });
        this._bush = new testSubject({ imgSrc: bushImg, x: 350, y: 215, frameHeight: 145, frameWidth: 80 });
        this._goldCoin = new Coin(this, { imgSrc: goldCoinImg, x: 325, y: 270, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10 });
        this.objectList.push(this._background);
        this.objectList.push(this._goldCoin);
        this.objectList.push(this._bush);
        this.objectList.push(this._hardobj);
        this.objectList.push(this._hardobj2);
        this.objectList.push(this._bear);
        var content = document.getElementById('content');
        var div = utility.createDiv('divver');
        div = utility.addSoundEvent(div, 'game_over');
        content.appendChild(div);
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._background.draw();
        for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.draw();
        }
        this._ui.draw();
        this._bear.draw();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.update = function () {
        this._background.update();
        for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update();
        }
        this._generator.generateJunk();
        this._ui.update();
        this._bear.draw();
        this.checkCollisions();
        this.moveWorld();
        if (this._ui.getScore() > 250) {
            this._background.changeBackground(this.assets.desBG);
        }
        this.draw();
    };
    Game.prototype.moveWorld = function () {
        if (this._bear.getMoving()) {
            for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
                var obj = _a[_i];
                obj.changeMovementX(-5);
            }
            this._ui.updateScore(1);
        }
    };
    Game.prototype.checkCollisions = function () {
        var GO_collidables = new Array();
        for (var _i = 0, _a = this.objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.hasCollision) {
                GO_collidables.push(obj);
            }
        }
        for (var _b = 0, GO_collidables_1 = GO_collidables; _b < GO_collidables_1.length; _b++) {
            var obj1 = GO_collidables_1[_b];
            var hit = false;
            for (var _c = 0, GO_collidables_2 = GO_collidables; _c < GO_collidables_2.length; _c++) {
                var obj2 = GO_collidables_2[_c];
                if (obj1 != obj2) {
                    var obj1Bounds = obj1.getBounds();
                    var obj2Bounds = obj2.getBounds();
                    if (obj1Bounds.hitsOtherRectangle(obj2Bounds)) {
                        obj1.onCollision(obj2);
                        obj2.onCollision(obj1);
                        this.checkDestructable(obj1, this.objectList);
                        this.checkDestructable(obj2, this.objectList);
                        hit = true;
                    }
                }
            }
            if (hit) {
                break;
            }
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
    return Game;
}());
window.addEventListener("load", function () {
    new Menu();
});
var Menu = (function () {
    function Menu() {
        var _this = this;
        this.soundmanager = new SoundsManager("soundfile");
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
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("mouseover", function () { return _this.soundmanager.play('hover'); });
        this.btnHighscores.addEventListener("mouseover", function () { return _this.soundmanager.play('hover'); });
        this.btnClose.addEventListener("mouseover", function () { return _this.soundmanager.play('hover'); });
        this.btnStart.addEventListener("click", this.startEvent.bind(this));
        var content = document.getElementById('content');
        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);
    }
    Menu.prototype.startEvent = function () {
        this.soundmanager.play('start');
        this.removeMenu.bind(this)();
        this.main = new Game();
    };
    Menu.prototype.showLeaderboards = function () {
        window.location.href = "leaderboard.php";
    };
    Menu.prototype.removeMenu = function () {
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        this.soundmanager.play("background");
        console.log(this.soundmanager);
        document.body.style.backgroundImage = "";
    };
    return Menu;
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
    GameObjects.prototype.changeMovementX = function (int) {
        this.x = this.x + this.speed * this.directionX + int;
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
    utility.addSoundEvent = function (el, soundName) {
        el.addEventListener('click', function () { return Game.soundmanager.play(soundName); });
        return el;
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
var soundFile = (function () {
    function soundFile(soundURL) {
        var _this = this;
        this.loadComplete = false;
        this.onloadComplete = function (ev) {
            _this.xhr = ev.currentTarget;
            _this.context.decodeAudioData(_this.xhr.response, _this.decodeData);
        };
        this.decodeData = function (buffer) {
            _this.buffer = buffer;
            _this.loadComplete = true;
        };
        this.play = function (start_time, duration) {
            if (_this.context == undefined) {
                return;
            }
            if (_this.loadComplete == false) {
                return;
            }
            _this.source = _this.context.createBufferSource();
            _this.source.buffer = _this.buffer;
            _this.source.connect(_this.context.destination);
            _this.source.start(_this.context.currentTime, start_time, duration);
        };
        try {
            this.context = new AudioContext();
            this.loadFile(soundURL);
        }
        catch (e) {
            console.log("no audio detected");
        }
    }
    soundFile.prototype.loadFile = function (file_name) {
        if (this.context == undefined) {
            return;
        }
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', file_name, true);
        this.xhr.responseType = 'arraybuffer';
        this.xhr.onload = this.onloadComplete;
        this.xhr.send();
    };
    return soundFile;
}());
var soundMarker = (function () {
    function soundMarker(name, start, duration, volume, loop) {
        this.name = "";
        this.start = 0;
        this.duration = 0;
        this.volume = 1;
        this.loop = false;
        this.name = name;
        this.start = start;
        this.duration = duration;
        this.volume = volume;
        this.loop = loop;
        console.log(this.duration);
    }
    return soundMarker;
}());
var AssetsManager = (function () {
    function AssetsManager() {
        this.polarbear = "images/polarbear/spritesheet.png";
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
    function JunkGenerator(game, objList) {
        this.assets = new AssetsManager();
        this.minNumber = 1;
        this.maxNumber = 4;
        this.counter = 0;
        this.updateTimout = 60;
        this.minPositionY = 185;
        this.maxPositionY = 215;
        this.minPositionX = 1100;
        this.maxPositionX = 1150;
        this.objectList = objList;
        this._game = game;
        console.log("JunkGenerator is activated...");
    }
    JunkGenerator.prototype.getRandomNumber = function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    };
    JunkGenerator.prototype.generateJunk = function () {
        this.counter++;
        if (this.counter > this.updateTimout) {
            var random = this.getRandomNumber(this.minNumber, this.maxNumber);
            var randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            var randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            var bush = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 });
            var coin = new Coin(this._game, { imgSrc: this.assets.collectables.goldCoin, x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10 });
            switch (random) {
                case 1:
                    this.objectList.push(bush);
                    break;
                case 2:
                    this.objectList.push(coin);
                    break;
                case 3:
                    this.objectList.push(bush);
                    break;
                case 4:
                    this.objectList.push(coin);
                    break;
            }
            this.counter = 0;
        }
    };
    return JunkGenerator;
}());
var SoundsManager = (function () {
    function SoundsManager(sound_file) {
        this.mute = false;
        this.soundsLoaded = false;
        this._jsonFileLoaded = false;
        this._soundFileString = "";
        this.soundMarkers = {};
        this._soundFileString = sound_file;
        this._loadMarkers(sound_file + '.json');
    }
    SoundsManager.prototype.mp3Enabled = function () {
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio\ogg;').replace(/no/, ""));
    };
    SoundsManager.prototype.play = function (sound_name) {
        if (this.mute) {
            return;
        }
        var marker = this.soundMarkers[sound_name];
        var sf = new soundFile("sound/" + marker.name + ".ogg");
        if (marker != null && marker != undefined) {
            sf.play(marker.start, marker.duration);
            var sound = new Howl({
                urls: ["sound/" + marker.name + ".ogg"],
                sprite: {
                    blast: [0, 2000],
                }
            });
            sound.play('blast');
        }
    };
    SoundsManager.prototype._loadMarkers = function (jsonfile) {
        var _this = this;
        var marker_xhr = new XMLHttpRequest();
        marker_xhr.onreadystatechange = function () {
            if (marker_xhr.readyState === XMLHttpRequest.DONE && marker_xhr.status === 200) {
                var obj = JSON.parse(marker_xhr.responseText);
                _this.parseJsonSounds(obj);
            }
            else {
            }
        };
        marker_xhr.open("GET", jsonfile, true);
        marker_xhr.send();
    };
    SoundsManager.prototype.parseJsonSounds = function (data) {
        console.log("onread aangeroepen");
        console.log(data.markers.length);
        for (var i = 0; i < data.markers.length; i++) {
            var obj = data.markers[i];
            var markers = obj;
            this.addMarker(new soundMarker(obj.name, obj.start, obj.duration, obj.volume, obj.loop));
        }
        this._jsonFileLoaded = true;
        this.soundsLoaded = true;
    };
    SoundsManager.prototype.soundFileLoaded = function () {
        if (this._jsonFileLoaded == true) {
            this.soundsLoaded = true;
        }
    };
    SoundsManager.prototype._onError = function (xhr) {
        console.log("COULD NOT LOAD SOUND MARKER FILE: " + this._soundFileString + ".json status=" + xhr.readyState);
    };
    SoundsManager.prototype.addMarker = function (sound_marker) {
        this.soundMarkers[sound_marker.name] = sound_marker;
    };
    SoundsManager.prototype.removeMarker = function (marker_name) {
        delete this.soundMarkers[marker_name];
    };
    return SoundsManager;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(source) {
        _super.call(this, source);
    }
    Background.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y);
    };
    Background.prototype.update = function () {
        if (this.x + this.image.x < 0) {
            this.x = 0;
        }
    };
    Background.prototype.changeBackground = function (image) {
        _super.prototype.newImage.call(this, image);
    };
    return Background;
}(GameObjects));
var BackgroundObject = (function (_super) {
    __extends(BackgroundObject, _super);
    function BackgroundObject(source) {
        _super.call(this, source);
    }
    BackgroundObject.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y);
    };
    BackgroundObject.prototype.wait = function () {
    };
    BackgroundObject.prototype.update = function () {
    };
    return BackgroundObject;
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
    };
    Coin.prototype.draw = function () {
        _super.prototype.Draw.call(this);
    };
    Coin.prototype.update = function () {
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
        this.startCollisionPos = 0;
        this.endCollisionPos = 0;
    }
    crate.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    crate.prototype.onCollision = function (gameObject) {
        this.hasCollision = true;
        this.onCollisionEnter(gameObject);
    };
    crate.prototype.getY = function () {
        return _super.prototype.getY.call(this);
    };
    crate.prototype.getObjectWidth = function () {
        return _super.prototype.getFrameWidth.call(this);
    };
    crate.prototype.onCollisionEnter = function (gameObject) {
    };
    crate.prototype.onCollisionExit = function () {
        this.hasCollision = false;
    };
    crate.prototype.update = function () {
        _super.prototype.Update.call(this);
    };
    crate.prototype.draw = function () {
        _super.prototype.Draw.call(this);
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
        this._isJumping = 0;
        this._jumpTimer = 2.39645;
        this.hasCollision = true;
        this.startCollisionPos = 0;
        this.endCollisionPos = 0;
        this.myY = 0;
        this.isMoving = false;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this._game = game;
        console.log(game.objectList);
    }
    polarBear.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    polarBear.prototype.onCollision = function (gameObject) {
        this.hasCollision = true;
        if (this.startCollisionPos === 0) {
            this.startCollisionPos = gameObject.getX();
            this.endCollisionPos = this.startCollisionPos + gameObject.getObjectWidth();
        }
        if (gameObject instanceof crate) {
            this.onCollisionEnter(gameObject);
        }
    };
    polarBear.prototype.onCollisionEnter = function (gameObject) {
        var y = gameObject.getY();
        var newY = y - 45;
        _super.prototype.setY.call(this, newY);
    };
    polarBear.prototype.onCollisionExit = function () {
        _super.prototype.setY.call(this, 260);
        this.hasCollision = false;
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
    polarBear.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 1);
                _super.prototype.changeAnimationY.call(this, 0);
                this.isMoving = true;
                break;
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 1);
                break;
            case 32:
                if (this._isJumping === 1) {
                    console.log('already jumping');
                }
                else {
                    this._isJumping = 1;
                    this.myY = _super.prototype.getY.call(this);
                    console.log("Y before jump =" + _super.prototype.getY.call(this));
                }
                break;
        }
    };
    polarBear.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 0);
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
        var self = this;
        this._jumpTimer += 0.1;
        var posY = 0;
        posY = -((this._jumpTimer - 2.25) * this._jumpTimer) + 5;
        posY = -posY * 2;
        _super.prototype.updateY.call(this, posY);
        if (this._jumpTimer >= 4.5) {
            this._isJumping = 0;
            this._jumpTimer = 2.39645;
            _super.prototype.setY.call(this, this.myY);
            console.log("y after jump =" + _super.prototype.getY.call(this));
        }
    };
    polarBear.prototype.wait = function () {
    };
    polarBear.prototype.update = function () {
        if (this._isJumping === 1) {
            this.jump();
        }
        else {
            for (var _i = 0, _a = this._game.objectList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj != this) {
                    if (obj instanceof crate) {
                        if (obj.getX() <= -75) {
                            _super.prototype.setY.call(this, 260);
                        }
                    }
                }
            }
        }
        _super.prototype.move.call(this);
    };
    polarBear.prototype.updateUIScore = function (points) {
        this._game._ui.updateScore(points);
    };
    polarBear.prototype.getMoving = function () {
        return this.isMoving;
    };
    polarBear.prototype.changeAllObjectsMovementX = function (speedX) {
        for (var _i = 0, _a = this._game.objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj != this) {
                obj.changeMovementX(speedX);
            }
        }
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