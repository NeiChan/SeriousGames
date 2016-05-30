class polarBear extends GameObjects{
    private isJumping: number = 0;
    private jumpUpTimer: any = 0;
    private jumpDownTimer: any = 0;
    
    
    constructor(source) {
        // extending from GameObjects
        super(source);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
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
                this.isJumping = 1;
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
        
        // Vertical Speed
        // D (distance) = (.5) * a (acceleration) * t (time)2 + V0 (initial velocity) * t time
        // (My distance, d = (.5) * (-9.81) * (.32)2 + 3.136 * (.32) = 0.5023 meters).
        
        // Horizontal Speed
        // V (velocity) = V0 (initial velocity) + a (acceleration) * t (time)
        if(this.isJumping === 1){
            var posY = 0;
            this.jumpUpTimer += 0.01;
                       
            if(this.jumpUpTimer < 0.32){
                
                var velocity = 0 + 3.136 * this.jumpUpTimer;
                var posY = ((-9.81 * 2) * (this.jumpUpTimer * this.jumpUpTimer) + (velocity * this.jumpUpTimer)) * 2;
                // console.log("up" + posY);
                super.updateY(posY);        
            } else if(this.jumpDownTimer < 0.32){
                this.jumpDownTimer += 0.01;
                
                var velocity = 0 + 3.136 * this.jumpDownTimer;
                
                var posY = (-((-9.81 * 2) * (this.jumpDownTimer * this.jumpDownTimer) + (velocity * this.jumpDownTimer))) * 2;
                posY = posY - 0.1;
                // console.log("down" + posY);
                super.updateY(posY);
            } else {
                this.isJumping = 0;
                this.jumpUpTimer = 0;
                this.jumpDownTimer = 0;
            }
        } else {
            
        }
    }
    
    public wait() : void{
        
    }
    
    public update() : void{
        this.jump();
        
        super.move();
        
        if(this.y > 300){
            
        }else{
            this.y += 5;
        }
    }
}