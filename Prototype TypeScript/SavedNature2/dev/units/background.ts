class Background extends bgObjects
{
    constructor(source, speed, game : Game)
    {
        super(source, speed, game);
    }
    
    public draw() : void {
        // console.log("I have been drawn"); 
        super.draw();
        
    }
    
    public update() : void{
        super.update();

        if(super.getX() + this.image.x < -623){
            super.setX(0);
        }
        // console.log("called");
    }
    
    public changeBackground(image) : void {
        // super.newImage(image);
    }
}