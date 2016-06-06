/// <reference path="../game.ts"/>

class polarBear extends GameObjects implements ICollidable {
    private _isJumping: number = 0;
    private _jumpTimer: number = 2.39645;
    public  hasCollision:boolean = true;
    public  myY:number = 0;
    private _game:Game;
    
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

    onCollision(gameObject:ICollidable) {
        // functie van ICollidable
        // Doe iets wanneer er een collision is.
        
        //this._ui.updateScore(10);
        
        //this.x = 0;

    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39: // RIGHT
                super.changeY(0);
                // super.changeX(1);
                super.changeAnimationY(0);
                // Update the Score from the UI in game
                this.updateUIScore(10);
                // Update all movements that exist in the gameObject list in the game
                this.changeAllObjectsMovementX(-10);
                
                break;
            case 88: // UP
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(1);
                break;
            case 32: // SPACEBAR
                if(this._isJumping === 1){
                    console.log('already jumping');
                } else {
                    this._isJumping = 1;
                    this.myY = super.getY();
                    console.log("Y before jump =" + super.getY());
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
                super.changeX(0);
                super.changeAnimationY(0);
                break;
            case 39: // RIGHT
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
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
        var self = this;

        // y = -((x-2.25)^2) + 5
        // (‑((x-​2.25)^​2))+​5

        this._jumpTimer += 0.1;
        var posY = 0;

        posY = -((this._jumpTimer - 2.25) * this._jumpTimer) + 5;
        posY = -posY * 2;

        super.updateY(posY);

        if(this._jumpTimer >= 4.5){
            this._isJumping = 0;
            this._jumpTimer = 2.39645;
            super.setY(this.myY);
            console.log("y after jump =" + super.getY());
        }
    }
    public wait() : void{

    }

    public update() : void{
        if(this._isJumping === 1){
            this.jump();
        }

        super.move();
    }
    
    private updateUIScore(points):void{
        this._game._ui.updateScore(points);
    }
    
    private changeAllObjectsMovementX(speedX) : void {
        for(var obj of this._game.objectList) {
            if(obj != this){
                // console.log("obj not equal to current so we move other objects");
                obj.changeMovementX(speedX);
            }
        }
    }
}
