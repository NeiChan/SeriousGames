class level{
    private game : Game;
    private level : number;
    private _coins: number;

    private _background  : Background;

    constructor(game: Game, level: number, coins: number){
        this.game = game;
        this.level = level;
        this._coins = coins;

        this.setGame();
    }

    private setGame(){

        switch (this.level){
            case 1:{
                let backgroundImg   = this.game.assets.greenBG;

                this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this.level);

                this.game.BGList.push(this._background);
            }
            break;
            case 2:{

                switch (this._coins) {
                    case 5:
                        var backgroundImg = this.game.assets.winterBG.BG3;
                        break;
                    case 10:
                        var backgroundImg = this.game.assets.winterBG.BG2;
                        break;
                    case 15:
                        var backgroundImg = this.game.assets.winterBG.BG1;
                        break;
                    default:
                        var backgroundImg = this.game.assets.winterBG.BG4;
                }
                // let backgroundImg   = this.game.assets.winterBG.BG4;
                this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game, this.level);

                this.game.BGList.push(this._background);
            }
            break;
        }
    }
}
