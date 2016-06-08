/// <reference path="interfaces/ICollidable.ts"/>

class Game {
    private assets      : AssetsManager = new AssetsManager();
    public WorldSpeed : number = 5;

    //public objectList:Array<GameObjects> = new Array<GameObjects>();
    
    public objectList:Array<ICollidable> = new Array<ICollidable>();
    
    // array BG items (parallax)
    public BGList:Array<bgObjects> = new Array<bgObjects>();
    
    // array FG items - toevoegen met unshift
    private _pause : boolean;

    // Get class player
    private _background  : Background;
    public  _ui          : UI;
    private _bear        : polarBear;
    private _generator   : JunkGenerator;
    
    private _goldCoin    : Coin;

    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function        
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        this.context.save();
        // Enlarge screen by 1.8x
        this.context.scale(1.8, 1.8);

        // this.canvas.addEventListener("click", this.getClickPos, false);

        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        let backgroundImg   = this.assets.greenBG4;
        let bearImg         = this.assets.polarbear2;
        let goldCoinImg     = this.assets.collectables.goldCoin;
        let crateImg        = this.assets.desObjects.Crate;

        // Aanmaken van een polarBear
        this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this);
        this._ui            = new UI(this, {x: 50, y: 50});
        this._generator     = new JunkGenerator(this, this.objectList, this.BGList);

        
        // Aanmaken van een polarBear
        this._bear          = new polarBear(this, { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 240, speed: 3 });

        this._goldCoin      = new Coin(this, {imgSrc: goldCoinImg,  x: 325, y: 225, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 3});

        this.BGList.push(this._background);        
        // this.objectList.push(this._goldCoin);
        // this.objectList.push(this._bush);
        
        // this.objectList.push(this._bear);
        

        var content = document.getElementById('content');
        var div = utility.createDiv('divver');
        div = utility.addSoundEvent(div, 'game_over');
        content.appendChild(div);

        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    // public getClickPos(e:Event):void{
    //     var xpos = e.clientX;
    //     var ypos = e.clientY;
    //     console.log(xpos, ypos);
    // }

    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        
        // this._background.draw();
        
        for(var obj2 of this.BGList){
            obj2.draw();
        }

        for(var obj of this.objectList) {
            obj.Draw();
        }
        
        this._ui.draw();

        this._bear.draw();
        
        requestAnimationFrame(() => this.update());
    }

    public pause() : void {
        this._pause = true;
    }


    private update() : void {
        // Aanroepen van update function
        // this._background.update();
        if(this._pause){

        }else{
            this._generator.generateJunk();
            
            for(var obj of this.objectList) {
                obj.Update();
            }
            
            for(var obj2 of this.BGList) {
                obj2.update();
                // console.log(obj2);
            }

            this._bear.update();

            this.checkCollisions();
            
            if(this._ui.getScore() > 250){
                this._background.changeBackground(this.assets.desBG);
            }
        }
        this._ui.update();
        
        this.draw();
    }
    
    // private moveWorld(): void {
    //     if(this._bear.getMoving()){
    //         for(var obj of this.objectList) {
    //             obj.changeMovementX(-5);
    //         }
            
    //         this._ui.updateScore(1);
    //     }
    // }

    private checkCollisions() : void {
        // var collidables = new Array<ICollidable>();
        //**
        //* Loop through GO_collidables to do a function and check for collisions

        // for(var obj1 of GO_collidables){
            //let hit:boolean = false;

        // for(var obj of this.objectList) {
        //     if(obj.hasCollision){
        //         collidables.push(obj);
        //     }
        // }
        for(var obj2 of this.objectList){
            for(var obj of this.objectList){
                
                    if(obj instanceof bullet || obj2 instanceof bullet){
                        let obj1Bounds = obj2.getBounds();
                        let obj2Bounds = obj.getBounds();   

                        if(obj1Bounds.hitsOtherRectangle(obj2Bounds)){
                            obj2.onCollision(obj);
                            obj.onCollision(obj2);
                        }
                    

                    
                        // if obj2 gelijk is aan objectList

                        // check on hasDestructable
                        // this.checkDestructable(obj, this.objectList);
                        //this.checkDestructable(obj2, this.objectList);
                        // hit = true;
                    
                }
            }
        }


        for(var obj of this.objectList){
            // if(this._bear != obj){
                let obj1Bounds = this._bear.getBounds();
                let obj2Bounds = obj.getBounds();

                if(obj1Bounds.hitsOtherRectangle(obj2Bounds)){
                    this._bear.onCollision(obj);
                    obj.onCollision(this._bear);

                    // console.log("polar x = " + this._bear.getX());
                    // console.log("polar y = " + this._bear.getY());

                    // console.log("crate x = " + obj.getBounds().x);
                    // console.log("crate y = " + obj.getBounds().y);
                    // if obj2 gelijk is aan objectList

                    // check on hasDestructable
                    // this.checkDestructable(obj, this.objectList);
                    //this.checkDestructable(obj2, this.objectList);
                    // hit = true;
                }
            // }
        }
    }

    public deleteGO(obj?: ICollidable, obj2?: bgObjects) : void {
        if(obj){
            var index = this.objectList.indexOf(obj);
            this.objectList.splice(index, 1);
        } else if(obj2){
            var index = this.BGList.indexOf(obj2);
            this.BGList.splice(index, 1);
        } else {
            console.log("not true shit")
        }
        // console.log("BG list" + this.BGList);
        // console.log("object list" + this.objectList);
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

    public getWorldSpeed() : number {
        return this.WorldSpeed;
    }

    public setWorldSpeed(int) : void {
        this.WorldSpeed = int;
    }
}
