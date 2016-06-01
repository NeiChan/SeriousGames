class CollidableObject extends GameObjects implements ICollidable{
    public hasCollision:boolean = true;
    
    constructor(source) {
        // extending from GameObjects
        super(source);
    }
    
    /**
     * getBounds
     * 
     * Create a rectangle over the image itself for collision
     */
    getBounds():Rectangle {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }
    
    setY(number){
        
    }
    
    onCollision(gameObject:ICollidable) {
        // functie van ICollidable
        // Doe iets wanneer er een collision is.
        
        console.log("Doe iets onCollision voor testSubject");
        
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