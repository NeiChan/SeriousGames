/// <reference path="interfaces/ICollidable.ts"/>

class Game {
    private assets      : AssetsManager = new AssetsManager();

    static soundmanager      : SoundsManager;

    //public objectList:Array<GameObjects> = new Array<GameObjects>();
    
    public objectList:Array<ICollidable> = new Array<ICollidable>();
    
    //public objectList:any = [];
    
    // array BG items (parallax)
    
    
    // array FG items - toevoegen met unshift
    
    

    // Get class player
    private _background  : Background;
    public  _ui          : UI;
    private _bear        : polarBear;
    private _generator   : JunkGenerator;
    private _dObject     : DestructableObject;
    private _bObject     : BackgroundObject;
    private _cObject     : CollidableObject;
    private _hardobj     : crate;
    private _hardobj2     : crate;
    
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
        let crateImg        = this.assets.desObjects.Crate;

        // Aanmaken van een polarBear
        this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0});
        this._ui            = new UI({x: 50, y: 50});
        this._generator     = new JunkGenerator(this, this.objectList);
        
        this._hardobj       = new crate(this, { imgSrc: crateImg, x: 150, y: 215, frameHeight: 101, frameWidth: 101 });
        this._hardobj2       = new crate(this, { imgSrc: crateImg, x: 450, y: 215, frameHeight: 101, frameWidth: 101 });
        this._dObject       = new DestructableObject({ imgSrc: bushImg, x: 150, y: 530, frameHeight: 145, frameWidth: 80 });
        this._bObject       = new BackgroundObject({ imgSrc: bushImg, x: 250, y: 530, frameHeight: 145, frameWidth: 80 });
        this._cObject       = new CollidableObject({ imgSrc: bushImg, x: 450, y: 530, frameHeight: 145, frameWidth: 80 });

        this._bear          = new polarBear(this, { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 260, speed: 3 });
        this._bush          = new testSubject({ imgSrc: bushImg, x: 350, y: 215, frameHeight: 145, frameWidth: 80 });
        this._goldCoin      = new Coin(this, {imgSrc: goldCoinImg,  x: 325, y: 270, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10});

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
        
        // Game.soundmanager.play('background');

        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        
        this._background.draw();
        
        for(var obj of this.objectList) {
            obj.draw();
        }
        
        this._ui.draw();

        // this._bear.draw();
        
        requestAnimationFrame(() => this.update());
    }


    private update() : void {
        // Aanroepen van update function
        this._background.update();
        
        for(var obj of this.objectList) {
            obj.update();
        }
        
        this._generator.generateJunk();
        
        this._ui.update();
        
        // this._bear.update();

        this.checkCollisions();
        this.moveWorld();
        
        if(this._ui.getScore() > 250){
            this._background.changeBackground(this.assets.desBG);
        }
        
        this.draw();
    }
    
    private moveWorld(): void {
        if(this._bear.getMoving()){
            for(var obj of this.objectList) {
                obj.changeMovementX(-5);
            }
            
            this._ui.updateScore(1);
        }
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

        // for(var obj1 of GO_collidables){
            //let hit:boolean = false;

            for(var obj2 of GO_collidables){
                if(this._bear != obj2){
                    let obj1Bounds = this._bear.getBounds();
                    let obj2Bounds = obj2.getBounds();

                    if(obj1Bounds.hitsOtherRectangle(obj2Bounds)){
                        this._bear.onCollision(obj2);
                        //obj2.onCollision(obj1);
                        // if obj2 gelijk is aan objectList

                        // check on hasDestructable
                        this.checkDestructable(this._bear, this.objectList);
                        //this.checkDestructable(obj2, this.objectList);
                       // hit = true;
                    }
                }
            // }

           // if(hit){
             //   break;
           // }
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
