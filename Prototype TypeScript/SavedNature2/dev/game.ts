/// <reference path="interfaces/ICollidable.ts"/>

class Game {
    public assets      : AssetsManager = new AssetsManager();
    public WorldSpeed : number = 5;
    private Level : level;
    private main: any;
    private _bg: Background;
    public curLvl: number;

    private _collectCounter = 0;
    // public objectList:Array<GameObjects> = new Array<GameObjects>();

    public objectList:Array<ICollidable> = new Array<ICollidable>();

    // array BG items (parallax)
    public BGList:Array<bgObjects> = new Array<bgObjects>();

    // array FG items - toevoegen met unshift
    private _pause : boolean;

    // Get class player

    public  _ui          : UI;
    private _bear        : polarBear;
    public _generator   : JunkGenerator;

    private _goldCoin    : Coin;

    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor(lvl: number) {
        // call createPlayer() function
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        this.context.save();

        // Enlarge screen by 1.8x
        this.context.scale(1.8, 1.8);

        this.curLvl = lvl;
        this.Level = new level(this, this.curLvl, 0);
        // this.canvas.addEventListener("click", this.getClickPos, false);

        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        let bearImg         = this.assets.polarbear2;
        // Aanmaken van een polarBear
        this._ui            = new UI(this, {x: 50, y: 50});
        this._generator     = new JunkGenerator(this, this.objectList, this.BGList, lvl);

        // Aanmaken van een polarBear
        this._bear          = new polarBear(this, { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 25, y: 240, speed: 3 });

        // let igloo           = new BackgroundObject({ imgSrc: this.assets.winterObjects.Igloo2, x: 25, y: 240, frameHeight: 39, framewidth: 100}, 1, this);
        // this.BGList.push(igloo);

        // console.log(lvl);

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
        if (this._pause) {

        }else {
            if (this._ui.getScore() >= 200) {
                this._generator.stopGenerating();
            }
            else {
                this._generator.generateJunk();
            }


            for(var obj of this.objectList) {
                obj.Update();
            }

            for(var obj2 of this.BGList) {
                obj2.update();
                // console.log(obj2);
            }

            this._bear.update();

            this.checkCollisions();

            // if(this._ui.getScore() > 50){
            //     // this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
            //
            //     switch (this._generator.level) {
            //         case 1:
            //             this._generator.level = 2;
            //             break;
            //         case 2:
            //             this._generator.level = 1;
            //             break;
            //         default:
            //             this._generator.level = 1;
            //             break;
            //     }
            //     this._ui.addScore(-60);
            //     console.log("calle");
            // }
            this._ui.update();

            this.draw();
        }
    }

    private checkCollisions(): void {
        // var collidables = new Array<ICollidable>();
        // **
        // * Loop through GO_collidables to do a function and check for collisions

        // for(var obj1 of GO_collidables){
            // let hit:boolean = false;

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
                        // this.checkDestructable(obj2, this.objectList);
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
                    // this.checkDestructable(obj2, this.objectList);
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

    // Add a count to the amount of collected coins.
    public updateCollectedCoins(lvl: number): void {
        let amount: number = 1;
        this._collectCounter += amount;

        console.log(this._collectCounter);

        // Change background (level)
        if (this._collectCounter === 5 || this._collectCounter === 10 || this._collectCounter === 15) {
            // this._bg.changeBackground(;)
            this.Level = new level(this, lvl, this._collectCounter);
            // this._bg.findBackground(this._collectCounter);
        }
    }
}
