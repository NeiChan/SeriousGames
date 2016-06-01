/// <reference path="interfaces/ICollidable.ts"/>

class Game {
    private assets      : AssetsManager = new AssetsManager();

    static soundmanager      : SoundsManager;

    public objectList:any = [];

    // Get class player
    private _background  : Background;
    private _ui          : UI;
    private _bear        : polarBear;
    private _bush        : testSubject;
    private _goldCoin    : Coin;
    // private _score       : Score;

    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        Game.soundmanager = new SoundsManager('soundfile');
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        this.context.save();
        // Enlarge screen by 1.8x
        this.context.scale(1.8, 1.8);

        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        let backgroundImg   = this.assets.greenBG;
        let bearImg         = this.assets.polarbear;
        let bushImg         = this.assets.desObjects.Bush1;
        let goldCoinImg     = this.assets.collectables.goldCoin;

        // Aanmaken van een polarBear
        this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0});
        this._ui            = new UI({x: 50, y: 50});
        this._bear          = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 260, speed: 3 });
        this._bush          = new testSubject({ imgSrc: bushImg, x: 150, y: 215, frameHeight: 145, frameWidth: 80 });
        this._goldCoin      = new Coin({imgSrc: goldCoinImg,  x: 325, y: 270, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10});

        this.objectList.push(this._background);
        this.objectList.push(this._ui);
        this.objectList.push(this._bush);
        this.objectList.push(this._goldCoin);
        this.objectList.push(this._bear);

        var content = document.getElementById('content');
        var div = utility.createDiv('divver');
        div = utility.addSoundEvent(div, 'game_over');
        content.appendChild(div);

        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);

        for(var obj of this.objectList) {
            obj.draw();
        }

        requestAnimationFrame(() => this.update());
    }


    private update() : void {
        // Aanroepen van update function

        for(var obj of this.objectList) {
            obj.update();
        }

        this.checkCollisions();

        this.draw();
    }

    private checkCollisions() : void {
        let GO_collidables = new Array<ICollidable>();

        //**
        //* Everything that has ICollidable needs to be pushed into GO_collidables
        //* hasCollision :boolean comes from ICollidable and needs to be given in object.

        for(var obj of this.objectList) {
            if(obj.hasCollision){
                GO_collidables.push(obj);
            }
        }

        //**
        //* Loop through GO_collidables to do a function and check for collisions

        for(var obj1 of GO_collidables){
            let hit:boolean = false;

            for(var obj2 of GO_collidables){
                if(obj1 != obj2){
                    let obj1Bounds = obj1.getBounds();
                    let obj2Bounds = obj2.getBounds();

                    if(obj1Bounds.hitsOtherRectangle(obj2Bounds)){
                        obj1.onCollision(obj2);
                        obj2.onCollision(obj1);
                        // if obj2 gelijk is aan objectList

                        // check on hasDestructable
                        var index = this.objectList.indexOf(obj1);
                        if(index > -1) {
                            this.objectList.splice(index, 1);
                        }
                        // if hasDestructable
                        // objectList.remove

                        this._ui.updateScore(10);
                        hit = true;
                    }
                }
            }

            if(hit){
                break;
            }
        }
    }
}
