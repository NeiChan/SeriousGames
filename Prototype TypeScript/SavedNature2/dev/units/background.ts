class Background extends bgObjects
{
    protected level : number;

    // private bgObjects : bgObjects;

    constructor(source, speed, game : Game, lvl : number)
    {
        super(source, speed, game);

        // Set variable level to lvl value
        this.level = lvl;
    }

    public draw() : void {
        // console.log("I have been drawn");
        super.draw();
        super.draw2();
    }

    public update() : void{
        super.update();

        console.log("The current level is: " + this.level);

        // See what the level is in order to properly adjust the x value for a more fluid background motion
        switch (this.level) {
            case 1:
                if (super.getX() + this.image.x < -1350) {
                    super.setX(0);
                }
                break;
            case 2:
                if (super.getX() + this.image.x < -1350) {
                    // this.image = new Image();
                    // this.image.src = this.imgSrc;
                    super.setX(0);
                }
                break;
        }
    }

    public changeBackground(image) : void {
        super.newImage(image);
    }
}
