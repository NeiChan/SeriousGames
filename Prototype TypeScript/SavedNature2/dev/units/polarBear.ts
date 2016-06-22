/// <reference path="../game.ts"/>

class polarBear extends GameObjects implements ICollidable {
    private asset      : AssetsManager = new AssetsManager();

    public      _isJumping: boolean = false;
    public      _isGrounded: boolean = true;
    private     _jumpTimer: number = 2.39645;
    public      hasCollision:boolean = true;
    public      startCollisionPos : number = 0;
    public      endCollisionPos : number = 0;
    public      myY:number = 0;
    private     isMoving:boolean = false;
    private     _game:Game;
    private     _friction = 0.8;
    private     _gravity = 0.3

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
                if(this.velX < this.speed ){
                    this.velX++;
                    super.changeX(1);
                }

                super.changeY(0);
                // super.changeX(1);
                super.changeAnimationY(0);
                this.isMoving = true;
                this._game.setWorldSpeed(5);
                break;
            case 37: // LEFT
                if(this.velX > -this.speed ){
                    this.velX--;
                    super.changeX(-1);
                }

                
                super.changeY(0);
                // super.changeX(-1);
                super.changeAnimationY(2);
                this.isMoving = true;
                this._game.setWorldSpeed(2);                
                break;
            case 70: // F

                switch(this._game.Level.getLevel()){
                case 1:
                    this._game.objectList.push(new bullet(this._game, { imgSrc: this.asset.bananabullet, x: this.getX() + 50, y: this.getY(), frameHeight: 34, frameWidth: 17.625, maxFrame: 7, animationSpeed: 10, speed: -2.5 }));
                    // this.image.srcset = this._game.assets.bananabullet;
                    // super.setMaxFrame(7);
                    // this.frameHeight = 34;
                    // this.frameWidth = 17.625;
                    // super.setAnimationSpd(8);
                    break;
                case 2:
                    this._game.objectList.push(new bullet(this._game, { imgSrc: this.asset.fishbullet, x: this.getX() + 50, y: this.getY(), frameHeight: 33, frameWidth: 39, speed: -2.5 }));
                    // this.image.srcset = this._game.assets.turdbullet;
                    // super.setMaxFrame(0);
                    // this.frameHeight = 34;
                    // this.frameWidth = 45;
                    // super.setAnimationSpd(0);
                    break;
            }



                break;
            case 88: // UP
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(1);
                break;
            case 32: // SPACEBAR
                if(!this._isJumping){
                    this._isJumping = true;
                    this._isGrounded = false;
                    this.velY = -this.speed*2.8;

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

    public wait() : void{

    }

    public update() : void{
        if(this.currentCollision){
            this.currentCollision.bearJumps(this._isJumping);
        }

        super.move();

        this.velX *= this._friction;
        this.velY += this._gravity;

        this.x += this.velX;
        this.y += this.velY;

        if(this._isGrounded){
            this.velY = 0;

            // console.log("Im on the ground");
            
        }

        // Check canvas box
        if (this.x >= this._game.canvas.width - this.frameWidth) {
            this.x = this._game.canvas.width-this.frameWidth;
        }else if (this.x <= 0) {         
            this.x = 0;     
        }
        
        // Ground is 240
        if (this.y >= 240) {
            //this.y = this._game.canvas.height - this.frameHeight;
            this.y = 240;
            this._isJumping = false;
        }

        if(this._game.Level.getLevel() === 2){
            this.image.srcset = this.asset.polarbear2;
        }
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
        // console.log("AUHFUYADG");

        if(gameObject instanceof crate){
            let polarBounds = this.getBounds();
            let crateBounds = gameObject.getBounds();

            let dir = polarBounds.hitsSolidObject(this, crateBounds);
            // console.log("Direction = " + dir);

            if (dir === "l" || dir === "r") {
                this.velX = 0;
                this._isJumping = false;
                // this._game.setWorldSpeed(0);
            } else if (dir === "b") {
                this._isGrounded = true;
                this._isJumping = false;
                // this._game.setWorldSpeed(0);
            } else if (dir === "t") {
                this.velY = -this.speed*2.8;
            }
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
