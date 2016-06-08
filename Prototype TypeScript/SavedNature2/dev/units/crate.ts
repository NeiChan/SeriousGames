class crate extends GameObjects implements ICollidable{
    public  hasCollision:boolean = true;
    // public startCollisionPos : number = 0;
    // public endCollisionPos : number = 0;
    private game : Game;

    public bearJump : boolean;
    
    constructor(game:Game, source){
        super(source);
        this.game = game;
    }
    public getBounds():Rectangle{
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }
    
    onCollision(gameObject:ICollidable) {
        this.hasCollision = true;
      
        if(this.bearJump === true){
            this.game.setWorldSpeed(5);
        } else if(gameObject instanceof bullet){
            this.game.setWorldSpeed(5);
        } else {
            // this.game.setWorldSpeed(0);
        }

        if(gameObject instanceof bullet){
            this.game.deleteGO(this);

             var sound = new Howl({
                    urls: ["sound/go.ogg"],
                    volume: 0.4,
                    sprite: {
                        blast: [0, 2000],
                    }
                });
                
            sound.play('blast');
        }
        


        
        // gameObject.
        // functie van ICollidable
        // Doe iets wanneer er een collision is.
        
        //this._ui.updateScore(10);
        
        //this.x = 0;
        // console.log("olaaa");

    }
    
    public getY():number{
        return super.getY();
    }
    
    public getObjectWidth():number{
        return super.getFrameWidth();
    }
    
    public onCollisionExit() : void{
        this.hasCollision = false;
    }
    
    public Update():void{
        this.x = this.x - this.game.getWorldSpeed();
    }
    
    public draw() : void {
        super.Draw();
    }

    public bearJumps(bool: boolean) : void{
        this.bearJump = bool;
    }
}