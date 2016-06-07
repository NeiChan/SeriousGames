/// <reference path="../game.ts"/>

class polarBear extends GameObjects implements ICollidable {
    private asset      : AssetsManager = new AssetsManager();

    public _isJumping: boolean = false;
    private _jumpTimer: number = 2.39645;
    public  hasCollision:boolean = true;
    public startCollisionPos : number = 0;
    public endCollisionPos : number = 0;
    public  myY:number = 0;
    private isMoving:boolean = false;
    private _game:Game;

    private currentCollision : crate;
    // private collidesWith:IHardObject;
    
    // private _ui : UI;
    
    constructor(game:Game, source) {
        // extending from GameObjects
        super(source);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
        this._game = game;
    }

    /**
     * getBounds
     *
     * Create a rectangle over the image itself for collision
     */
    getBounds():Rectangle {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }
    
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39: // RIGHT
                super.changeY(0);
                super.changeX(1);
                super.changeAnimationY(0);
                this.isMoving = true;
                this._game.setWorldSpeed(5);
                // Update the Score from the UI in game
                // this.updateUIScore(10);
                // // // Update all movements that exist in the gameObject list in the game
                // this.changeAllObjectsMovementX(-10);
                
                break;
            case 37: // LEFT
                super.changeY(0);
                super.changeX(-1);
                super.changeAnimationY(2);
                this.isMoving = true;
                this._game.setWorldSpeed(2);
                // Update the Score from the UI in game
                // this.updateUIScore(10);
                // // // Update all movements that exist in the gameObject list in the game
                // this.changeAllObjectsMovementX(-10);
                
                break;
            case 70: // LEFT
                this._game.objectList.push(new bullet(this._game, { imgSrc: this.asset.collectables.goldCoin, x: this.getX() + 50, y: this.getY(), frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: -5 }));

                // let coin = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 5});
                // Update the Score from the UI in game
                // this.updateUIScore(10);
                // // // Update all movements that exist in the gameObject list in the game
                // this.changeAllObjectsMovementX(-10);
                
                break;
            case 88: // UP
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(1);
                break;
            case 32: // SPACEBAR
                if(this._isJumping === true){
                    console.log('already jumping');
                } else {
                    this._isJumping = true;
                    
                    this.myY = super.getY();
                    // console.log("Y before jump =" + super.getY());

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
        
        // requestAnimationFrame( () => this.onKeyDown(event));
    }

    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 88: // UP
                super.changeY(0);
                super.changeAnimationY(0);
                this.isMoving = false;
                break;
            case 37: // RIGHT
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(2);
                this.isMoving = false;
                // Update the Score from the UI in game
                // this.updateUIScore(10);
                // // // Update all movements that exist in the gameObject list in the game
                // this.changeAllObjectsMovementX(-10);
                
                break;
            case 39: // RIGHT
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
                this.isMoving = false;
                break;
            case 32: // SPACEBAR
                break;
            default:
                
                break;    
        }
        
        // requestAnimationFrame( () => this.onKeyUp(event));
    }

    public draw() : void {
        // console.log("I have been drawn");
        super.Draw();
    }

    // weird partly physical jump function
    public jump() : void{
        this._game.setWorldSpeed(5);
        var self = this;

        // y = -((x-2.25)^2) + 5
        // (‑((x-​2.25)^​2))+​5

        

        this._jumpTimer += 0.1;
        var posY = 0;

        posY = -((this._jumpTimer - 2.25) * this._jumpTimer) + 5;
        posY = -posY * 5;

        super.updateY(posY);

        if(this._jumpTimer >= 4.5){
            this._isJumping = false;
            this._jumpTimer = 2.39645;
            // super.setY(this.myY);
            console.log("y after jump =" + super.getY());
        }
    }
    
    public wait() : void{

    }

    public update() : void{
        if(this.currentCollision){
            this.currentCollision.bearJumps(this._isJumping);
        }
        
        // for(var obj of this._game.objectList){
        //      if(obj === this){
        //         var l = this._game.objectList[obj];
        //         console.log(l)
        //         // this.objectList.unshift(l);
        //     }
        // }
        
        // super.setX(25);
        super.move();
        if(this._isJumping === true){
            this.jump();
        } else {
            for(var obj of this._game.objectList) {
            
                // console.log("obj not equal to current so we move other objects");
                if(obj instanceof crate){
                    if(obj.getX() <= super.getX()){
                        super.setY(240);    
                    } 
                }    
                
            }
        }
        
        // console.log(super.getX() === this.getX());
        
        // if(super.getX() === this.endCollisionPos){
        //     console.log('called');
        //     this.onCollisionExit();
        //     this.hasCollision = false;
        // }

        
    }
    
    private updateUIScore(points):void{
        this._game._ui.updateScore(points);
    }
    
    public getMoving() {
        return this.isMoving;
    }
    
    onCollision(gameObject:ICollidable) : void {
        this.isMoving;
        
        this.hasCollision = true;
        console.log("AUHFUYADG");

        this.checkobj(gameObject);

        if(gameObject instanceof crate){
            this.currentCollision = gameObject;
        }
        
        // this.collidesWith = gameObject;
        
        // if(this.startCollisionPos === 0){
        //     this.startCollisionPos = gameObject.getX();
        //     this.endCollisionPos = this.startCollisionPos + gameObject.getObjectWidth();
        //     // console.log(this.endCollisionPos);
        // }
        
    }

    checkobj(gameObject:ICollidable) : void{
        if(gameObject instanceof crate){
            var y = gameObject.getY();
            super.setY(y - 45);
        }
    }

    public getY():number{
        return super.getY();
    }
    
    public getX():number{
        return super.getX();
    }
    
    public getObjectWidth() : number{
        return super.getFrameWidth();
    }
}
