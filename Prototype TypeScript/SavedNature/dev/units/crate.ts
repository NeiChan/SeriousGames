class crate extends GameObjects implements ICollidable, IHardObject{
    public  hasCollision:boolean = true;
    public startCollisionPos : number = 0;
    public endCollisionPos : number = 0;
    
    constructor(game:Game, source){
        super(source);
    }
    public getBounds():Rectangle{
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }
    
    onCollision(gameObject:IHardObject) {
        this.hasCollision = true;
        this.onCollisionEnter(gameObject);
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
    
    public onCollisionEnter(gameObject: IHardObject) :void{
        // gameObject.getY();
        // if(gameObject.)
        
    }
    
    public onCollisionExit() : void{
        this.hasCollision = false;
    }
    
    public update():void{
        super.Update();
    }
    
    public draw() : void {
        super.Draw();
    }
}