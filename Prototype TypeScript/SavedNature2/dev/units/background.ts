class Background extends bgObjects
{
    protected Level : level;
    public assets: AssetsManager = new AssetsManager();
    public text : any;
    private _font = "14px Arial";
    

    // private bgObjects : bgObjects;

    constructor(source, speed, game : Game, lvl : level)
    {
        super(source, speed, game);
        this.context.font = this._font;


        // Set variable level to lvl value
        this.Level = lvl;
        //window.addEventListener("click", this.changeBackground.bind(this));
    }

    public draw() : void {
        // console.log("I have been drawn");
        super.draw();
        super.draw2();
    }

    public update() : void{
        super.update();
        // console.log(this.game.Level.getLevel());

        // console.log("The current level is: " + this.Level.getLevel());
        
        // See what the level is in order to properly adjust the x value for a more fluid background motion
        this.context.fillText("LEVEL 2 MADAFAKKA", 250, 100);
        // this.text.x = this.text.x + 5;
        if(this.game._collectCounter < 10){
            if (super.getX() + this.image.x < -1350) {
                this.image.srcset = this.game.assets.greenBG;
                
                super.setX(0);
            }
            
        } else{
            if (super.getX() + this.image.x < -1350) {
                // this.image = new Image();
                // this.image.src = this.imgSrc;
                super.setX(0);
                

                // if(this.Level.getLevel() === 1){
                //     this.Level.setLevel(2);
                    
                // }

                switch(this.game._ui.getScore()){
                    case 130:
                        this.image.srcset = this.assets.winterBG.BG3;

                        break;
                    case 160:
                        this.image.srcset = this.assets.winterBG.BG2;

                        break;
                    case 200:
                        this.image.srcset = this.assets.winterBG.BG4;

                        break;
                    default:
                        if(this.game._ui.getScore() < 140){
                            this.image.srcset = this.assets.winterBG.BG1;
                        }
                        console.log("CHANGED");
                        break;

                }
            }
        }
        // switch (this.Level.getLevel()) {
        //     case 1:
        //         if (super.getX() + this.image.x < -1350) {
        //             this.image.srcset = this.game.assets.greenBG;
        //             super.setX(0);
        //         }
        //         break;
        //     case 2:
        //         if (super.getX() + this.image.x < -1350) {
        //             // this.image = new Image();
        //             // this.image.src = this.imgSrc;
        //             super.setX(0);

        //             switch(this.game._ui.getScore()){
        //                 case 5:
        //                     this.image.srcset = this.assets.winterBG.BG3;

        //                     break;
        //                 case 10:
        //                     this.image.srcset = this.assets.winterBG.BG2;

        //                     break;
        //                 case 15:
        //                     this.image.srcset = this.assets.winterBG.BG4;

        //                     break;
        //             }

        //         }
        //         break;
        // }
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
