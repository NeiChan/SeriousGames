class BackgroundObject extends GameObjects {
    
    constructor(source) {
        // extending from GameObjects
        super(source);
    }
    
    public draw() : void {
        //  console.log("I have been drawn"); 
        this.context.drawImage(this.image, this.x, this.y);
    }
    
    public wait() : void{
        
    }
    
    public update() : void{
        
    }
}