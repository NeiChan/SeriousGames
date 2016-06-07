class polarBear extends GameObjects implements ICollidable {
    private _isJumping: number = 0;
    private _jumpUpTimer: any = 0;
    private _jumpDownTimer: any = 0;
    public  hasCollision:boolean = true;
    
    constructor(source) {
        // extending from GameObjects
        super(source);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
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
        
        this.x = 0;
    }
    
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 39: //UP
                super.changeY(0);
                super.changeX(1);
                super.changeAnimationY(0);
                break;
            case 88:
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(1);
                break;
            case 32:
                this._isJumping = 1;
                this.jump();
                break;
        }
    }
    
    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 88: //UP
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
                break;
            case 39:
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
                break;
            case 32:
                break;
        }
    }
    
    public draw() : void {
        // console.log("I have been drawn"); 
        super.Draw();  
    }
    
    // weird partly physical jump function
    public jump() : void{ 
        var self = this;
        // Vertical Speed
        // D (distance) = (.5) * a (acceleration) * t (time)2 + V0 (initial velocity) * t time
        // (My distance, d = (.5) * (-9.81) * (.32)2 + 3.136 * (.32) = 0.5023 meters).
        
        // Horizontal Speed
        // V (velocity) = V0 (initial velocity) + a (acceleration) * t (time)

        if(this._isJumping === 1){
            var posY = 0;
            this._jumpUpTimer += 0.01;
                       
            if(this._jumpUpTimer < 0.32){
                var velocity = 0 + 3.136 * this._jumpUpTimer;
                var posY = ((-9.81 * 2) * (this._jumpUpTimer * this._jumpUpTimer) + (velocity * this._jumpUpTimer)) * 2;
                console.log("up" + posY);
                super.updateY(posY);        
            } else if(this._jumpDownTimer < 0.32){
                this._jumpDownTimer += 0.01;
                
                var velocity = 0 + 3.136 * this._jumpDownTimer;
                
                var posY = (-((-9.81 * 2) * (this._jumpDownTimer * this._jumpDownTimer) + (velocity * this._jumpDownTimer))) * 2;
                posY = posY - 0.1;
                // console.log("down" + posY);
                super.updateY(posY);
            } else {
                this._isJumping = 0;
                this._jumpUpTimer = 0;
                this._jumpDownTimer = 0;
            }
        } else {
            
        // }
    }
    }
    public wait() : void{
        
    }
    
    public update() : void{
        this.jump();
        
        super.move();
    }
}