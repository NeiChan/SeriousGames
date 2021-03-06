var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        this.assets = new AssetsManager();
        this.objectList = [];
        Game.soundmanager = new SoundsManager("soundfile");
        this.createGame();
        var content = document.getElementById('content');
        var div = utility.createDiv('divver');
        div = test.addSoundEvent(div, 'game_over');
        content.appendChild(div);
    }
    Game.prototype.createGame = function () {
        var Engine = Matter.Engine, World = Matter.World, Body = Matter.Body, Common = Matter.Common, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Composites = Matter.Composites, Composite = Matter.Composite, MouseConstraint = Matter.MouseConstraint, Events = Matter.Events, Mouse = Matter.Mouse;
        var _sceneEvents = [], _mouseConstraint;
        var engine = Engine.create(document.body, {
            render: {
                options: {
                    wireframes: false,
                    background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-bk2.jpg'
                }
            }
        });
        var offset = 10, options = {
            isStatic: true,
            render: {
                visible: false
            }
        };
        engine.world.bodies = [];
        _mouseConstraint = MouseConstraint.create(engine);
        World.add(engine.world, _mouseConstraint);
        World.add(engine.world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        ]);
        var stack = Composites.stack(20, 20, 10, 4, 0, 0, function (x, y) {
            if (Common.random() > 0.35) {
                var body = Bodies.rectangle(x, y, 64, 64, {
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                            texture: 'http://brm.io/matter-js-demo-master/img/box.png'
                        }
                    }
                });
                return body;
            }
            else {
                return Bodies.circle(x, y, 46, {
                    density: 0.0005,
                    frictionAir: 0.06,
                    restitution: 0.3,
                    friction: 0.01,
                    render: {
                        sprite: {
                            texture: 'http://brm.io/matter-js-demo-master/img/ball.png'
                        }
                    }
                });
            }
        });
        World.add(engine.world, stack);
        Events.on(engine, 'tick', function () {
            var allBodies = Composite.allBodies(engine.world);
            Matter.MouseConstraint.update(_mouseConstraint, allBodies);
            _triggerEvents(_mouseConstraint);
            console.log(_mouseConstraint.mouse.position);
        });
        var renderOptions = engine.render.options;
        renderOptions.background = 'http://brm.io/matter-js-demo-master/img/wall-bg.jpg';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;
        Engine.run(engine);
        Events.on(engine, 'mousedown', function (event) {
            var mousePosition = event.mouse.position;
            console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
        });
        var _triggerEvents = function (mouseConstraint) {
            var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
            console.log(mouseEvents);
            if (mouseEvents.mousemove) {
                Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });
                console.log("ya");
            }
            if (mouseEvents.mousedown) {
                Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });
                console.log("ya");
            }
            if (mouseEvents.mouseup) {
                Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });
            }
            Mouse.clearSourceEvents(mouse);
        };
        console.log(_mouseConstraint.mouse.sourceEvents);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Menu();
});
var Menu = (function () {
    function Menu() {
        this.gameTitle = document.createElement("DIV");
        this.btnStart = document.createElement("button");
        this.btnMatter = document.createElement("button");
        this.btnClose = document.createElement("button");
        this.btnHighscores = document.createElement("button");
        this.gameTitle.setAttribute("id", "gameTitle");
        this.btnStart.setAttribute("id", "btnStart");
        this.btnMatter.setAttribute("id", "btnMatter");
        this.btnClose.setAttribute("id", "btnClose");
        this.btnHighscores.setAttribute("id", "btnHighscores");
        this.gameTitle.style.backgroundImage = "url('images/interface/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnMatter.innerHTML = "Show Matter";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("click", this.removeMenu);
        var content = document.getElementById('content');
        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnMatter);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);
    }
    Menu.prototype.showLeaderboards = function () {
        window.location.href = "leaderboard.php";
    };
    Menu.prototype.removeMenu = function () {
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        document.body.style.backgroundImage = "";
        this.main = new Game();
    };
    Menu.prototype.startMatter = function () {
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        document.body.style.backgroundImage = "none";
    };
    return Menu;
}());
var test = (function () {
    function test() {
    }
    test.addSoundEvent = function (el, soundName) {
        el.addEventListener('click', function () { return Game.soundmanager.play(soundName); });
        return el;
    };
    return test;
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
    return Background;
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
    function polarBear(source) {
        var _this = this;
        _super.call(this, source);
        this._isJumping = 0;
        this._jumpUpTimer = 0;
        this._jumpDownTimer = 0;
        this.hasCollision = true;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    polarBear.prototype.getBounds = function () {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    };
    polarBear.prototype.onCollision = function (gameObject) {
        this.x = 0;
    };
    polarBear.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 1);
                _super.prototype.changeAnimationY.call(this, 0);
                break;
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 1);
                break;
            case 32:
                this._isJumping = 1;
                this.jump();
                break;
        }
    };
    polarBear.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 88:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 0);
                break;
            case 39:
                _super.prototype.changeY.call(this, 0);
                _super.prototype.changeX.call(this, 0);
                _super.prototype.changeAnimationY.call(this, 0);
                break;
            case 32:
                break;
        }
    };
    polarBear.prototype.draw = function () {
        _super.prototype.Draw.call(this);
    };
    polarBear.prototype.jump = function () {
        var self = this;
        if (this._isJumping === 1) {
            var posY = 0;
            this._jumpUpTimer += 0.01;
            if (this._jumpUpTimer < 0.32) {
                var velocity = 0 + 3.136 * this._jumpUpTimer;
                var posY = ((-9.81 * 2) * (this._jumpUpTimer * this._jumpUpTimer) + (velocity * this._jumpUpTimer)) * 2;
                console.log("up" + posY);
                _super.prototype.updateY.call(this, posY);
            }
            else if (this._jumpDownTimer < 0.32) {
                this._jumpDownTimer += 0.01;
                var velocity = 0 + 3.136 * this._jumpDownTimer;
                var posY = (-((-9.81 * 2) * (this._jumpDownTimer * this._jumpDownTimer) + (velocity * this._jumpDownTimer))) * 2;
                posY = posY - 0.1;
                _super.prototype.updateY.call(this, posY);
            }
            else {
                this._isJumping = 0;
                this._jumpUpTimer = 0;
                this._jumpDownTimer = 0;
            }
        }
        else {
        }
    };
    polarBear.prototype.wait = function () {
    };
    polarBear.prototype.update = function () {
        this.jump();
        _super.prototype.move.call(this);
    };
    return polarBear;
}(GameObjects));
var testSubject = (function (_super) {
    __extends(testSubject, _super);
    function testSubject(source) {
        _super.call(this, source);
        this.hasCollision = true;
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
var AssetsManager = (function () {
    function AssetsManager() {
        this.polarbear = "images/polarbear/spritesheet.png";
        this.desertBase = "images/levels/desert/";
        this.greenBase = "images/levels/green/";
        this.winterBase = "images/levels/winter/";
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
        this.greenBG = this.greenBase + "BG.png";
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
    }
    return AssetsManager;
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
        console.log(marker);
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
        console.log("LOAD MARKERS");
        var marker_xhr = new XMLHttpRequest();
        console.log("ga dit laden: " + jsonfile);
        marker_xhr.onreadystatechange = function () {
            if (marker_xhr.readyState === XMLHttpRequest.DONE && marker_xhr.status === 200) {
                console.log("laden gelukt! ");
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
        var self = this;
        for (var i = 0; i < data.markers.length; i++) {
            var obj = data.markers[i];
            console.log("marker name is " + obj.name);
            var markers = obj;
            self.addMarker(new soundMarker(obj.name, obj.start, obj.duration, obj.volume, obj.loop));
            console.log("sound/" + obj.name + ".ogg");
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
    }
    return soundMarker;
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
    return utility;
}());
//# sourceMappingURL=main.js.map