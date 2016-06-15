class Background extends bgObjects
{
    protected level : number;
    public assets: AssetsManager = new AssetsManager();

    // private bgObjects : bgObjects;

    constructor(source, speed, game : Game, lvl : number)
    {
        super(source, speed, game);

        // Set variable level to lvl value
        this.level = lvl;
        //window.addEventListener("click", this.changeBackground.bind(this));
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

    // public findBackground(amount): void {
    //     switch (amount) {
    //         case 5:
    //             var bgImage = this.assets.winterBG.BG3;
    //             break;
    //         case 10:
    //             var bgImage = this.assets.winterBG.BG2;
    //             break;
    //         case 15:
    //             var bgImage = this.assets.winterBG.BG1;
    //             break;
    //     }
    //     this.changeBackground(bgImage);
    // }

    public changeBackground(image) : void {
        super.newImage(image);
    }
}
