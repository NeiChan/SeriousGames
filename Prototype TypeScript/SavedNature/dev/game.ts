/// <reference path="../typings/matter-js.d.ts"/>
/// <reference path="interfaces/ICollidable.ts"/>

class Game {
    private assets      : AssetsManager = new AssetsManager();

    // private sounds      : SoundsManager = new SoundsManager(); 
    
    public objectList:any = [];

    // Get class player
    private _background  : Background;
    private _bear        : polarBear;
    private _bush        : testSubject;
    private _score       : Score;

    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function

        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');

        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        var backgroundImg   = this.assets.greenBG;
        var bearImg         = this.assets.polarbear;
        var bushImg         = this.assets.desObjects.Bush1;

        // Aanmaken van een polarBear
        this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0});
        this._bear          = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 80, y: 500, speed: 3 });
        this._bush          = new testSubject({ imgSrc: bushImg, x: 150, y: 530, frameHeight: 145, frameWidth: 80 });
        this._score          = new Score({ imgSrc: bushImg, x: 350, y: 530, frameHeight: 145, frameWidth: 80 });

        this.objectList.push(this._background);
        this.objectList.push(this._bush);
        this.objectList.push(this._score);
        this.objectList.push(this._bear);

        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
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
                        hit = true;
                    }
                }
            }

            if(hit){
                break;
            }
        }
    }

    private update() : void {
        // Aanroepen van update function

        for(var obj of this.objectList) {
            obj.update();
        }

        // let polarBearBounds = this.bear.getBounds();
        // let bushBounds = this.bush.getBounds();

        // let hit = polarBearBounds.hitsOtherRectangle(bushBounds);
        // //console.log(hit);

        // if(hit){
        //     console.log('Polarbear hit the bush');
        // }

        this.checkCollisions();

        this.draw();
    }

    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);

        for(var obj of this.objectList) {
            obj.draw();
        }

        requestAnimationFrame(() => this.update());
    }
}
