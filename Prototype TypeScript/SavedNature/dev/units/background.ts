class Background extends GameObjects
{
    
    constructor(source)
    {
        super(source);
    }
    
    public draw() : void {
        // console.log("I have been drawn"); 
        // this.context.drawImage(this.image, this.x, this.y);
        this.context.drawImage(this.image, this.x, this.y);
        // this.context.drawImage(this.image, this.x, this.y);
    }
    
    public update() : void{
        if(this.x + this.image.x < 0){
            this.x = 0;
        }
    }
}