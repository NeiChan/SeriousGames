class level{
    private game : Game;
    private level : number;

    private _background  : Background;

    constructor(game: Game, level: number){
        this.game = game;
        this.level = level;

        this.setGame();
    }

    private setGame(){

        switch(this.level){
            case 1:{
                let backgroundImg   = this.game.assets.greenBG4;

                this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game);

                this.game.BGList.push(this._background);   
            }
            case 2:{
                let backgroundImg   = this.game.assets.greenBG4;

                this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0, frameHeight: 640, frameWidth: 2559}, 1, this.game);

                this.game.BGList.push(this._background);   
            }

        }





    }
}