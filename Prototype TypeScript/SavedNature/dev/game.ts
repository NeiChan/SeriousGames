/// <reference path="interfaces/ICollidable.ts"/>
/// <reference path="interfaces/IDestructable.ts"/>

class Game {
    private assets      : AssetsManager = new AssetsManager();

    static soundmanager      : SoundsManager; 
    
    public objectList:any = [];

    // Get class player
    private _background  : Background;
    private _ui          : UI;
    private _bear        : polarBear;
    private _platform    : platform;
    // private _score       : Score;

    private _generator   : JunkGenerator;
    
    private _dObject        : DestructableObject;
    private _cObject        : CollidableObject;
    private _bObject        : BackgroundObject;

    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        Game.soundmanager = new SoundsManager('soundfile');
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');

        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        var backgroundImg   = this.assets.greenBG;
        var bearImg         = this.assets.polarbear;
        var bushImg         = this.assets.desObjects.Bush1;
        var platformImg     = this.assets.desObjects.Crate;

        // Aanmaken van een polarBear
        this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0});
        this._ui            = new UI({x: 50, y: 50});
        this._bear          = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 80, y: 500, speed: 3 });

        this._generator     = new JunkGenerator(this.objectList);
        
        this._dObject       = new DestructableObject({ imgSrc: bushImg, x: 150, y: 530, frameHeight: 145, frameWidth: 80 });
        this._bObject       = new BackgroundObject({ imgSrc: bushImg, x: 250, y: 530, frameHeight: 145, frameWidth: 80 });
        this._cObject       = new CollidableObject({ imgSrc: bushImg, x: 450, y: 530, frameHeight: 145, frameWidth: 80 });

        this.objectList.push(this._background);
        this.objectList.push(this._ui);
        this.objectList.push(this._dObject);
        this.objectList.push(this._bObject);
        this.objectList.push(this._cObject);

        this.objectList.push(this._bear);
        
        // this._platform      = new platform({ imgSrc: platformImg, x: 550, y: 530, frameHeight: 101, frameWidth: 101 })
        // this.objectList.push(this._platform);
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

        this._generator.generateJunk();
        
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
                        
                        // check on hasDestructable
                        this.checkDestructable(obj1, this.objectList);
                        
                        
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
    
    private checkDestructable(currentObj, listObjects) : void {
        let index = listObjects.indexOf(currentObj);
        let hasDestructable = listObjects[index].hasDestructable;
        
        if(hasDestructable){
            if(index > -1) {
                return listObjects.splice(index, 1);
            } 
        }
    }
}
