class level{
    private game : Game;
    private lvl : number = 1;
    private _coins: number;

    private _background  : Background;

    constructor(game: Game, level: number, coins: number){
        this.game = game;
        this.lvl = level;
        this._coins = coins;

        this.setGame();
    }

    public setLevel() : void{
        this.lvl++;
        // this.game._collectCounter = 0;
    }

    public getLevel() : number{
        return this.lvl;
    }

    private setGame(){
        var currentBG : bgObjects;
        var temp;
        if(this.game.BGList[0] != null){
            temp = this.game.BGList.shift();
            if(temp instanceof bgObjects){
                currentBG = temp;
            }
        } else {

        }

        switch (this.lvl){
            case 1:{
                let backgroundImg   = this.game.assets.greenBG;

                if(currentBG){
                    currentBG.setImgSrc(backgroundImg);
                } else {
                    this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this);
                }

            }
            break;
            // case 2:{
            //     switch (this._coins) {
            //         case 5:
            //             var backgroundImg = this.game.assets.winterBG.BG3;

            //             if(currentBG){
            //                 currentBG.setImgSrc(backgroundImg);
            //             } else {
            //                 this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this);
            //             }
            //             break;
            //         case 10:
            //             var backgroundImg = this.game.assets.winterBG.BG2;
            //             if(currentBG){
            //                 currentBG.setImgSrc(backgroundImg);
            //             } else {
            //                 this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this);
            //             }
            //             break;
            //         case 15:
            //             var backgroundImg = this.game.assets.winterBG.BG1;
            //             if(currentBG){
            //                 currentBG.setImgSrc(backgroundImg);
            //             } else {
            //                 this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this);
            //             }
            //             break;
            //         default:
            //             var backgroundImg = this.game.assets.winterBG.BG4;
            //             if(currentBG){
            //                 currentBG.setImgSrc(backgroundImg);
            //             } else {
            //                 this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this);
            //             }
            //     }
            //     // let backgroundImg   = this.game.assets.winterBG.BG4;

            //     // this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this.level);


            // }
            // break;
        }

        if(currentBG){
            this.game.BGList.unshift(currentBG);
        } else {
            this.game.BGList.push(this._background);
        }

    }
}
