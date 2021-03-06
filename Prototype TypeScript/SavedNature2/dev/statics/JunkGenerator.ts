class JunkGenerator {

    private assets      : AssetsManager = new AssetsManager();

    private minNumber       = 1;
    private maxNumber       = 9;
    private counter         = 0;
    private updateTimout    = 60;

    private minPositionY    = 185;
    private maxPositionY    = 215;

    private minPositionX    = 1100;
    private maxPositionX    = 1150;

    private objectList:Array<ICollidable>;
    private BGList:Array<bgObjects>;
    private _game:Game;

    public level : number;

    constructor(game:Game, objList:Array<ICollidable>, bglist:Array<bgObjects>, lvl: number) {
        this.objectList = objList;
        this.BGList = bglist;
        this._game = game;

        this.level = lvl;
        console.log("JunkGenerator is activated...");
    }

    private getRandomNumber(min, max) : number {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    }

    private getRandomFloat(range:number) : number {
        let random = (Math.random() * range) + 0.2;
        return random;
    }

    public generateJunk(): void {

        switch(this.level){
            case 1:{
                this.generateLevel1();
                break;
            }
            case 2:{
                this.generateLevel2();
                break;
            }
        }
    }

    private generateLevel1() : void{
        this.counter++;



        if(this.counter > this.updateTimout){
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            let crateImg        = this.assets.desObjects.Crate;


            // console.log("randomX junk =" + randomX);
            // console.log("randomY junk =" + randomY);
            let bush = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 145 }, 1, this._game);
            let coin = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 5});
            let Crate = new crate(this._game, { imgSrc: this.assets.desObjects.Crate, x: randomX, y: randomY, frameHeight: 101, frameWidth: 101, speed: 5 });

            switch(random){
                case 1:
                    // console.log("Case 1 - Background Object");
                    this.objectList.push(coin);
                break;

                case 2:
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(coin);
                    // console.log("Case 2 - Background Object");
                    // this.objectList.push(new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                break;

                case 3:
                    // console.log("Case 3 - Destructable Object");
                    this.BGList.push(bush);
                break;

                case 4:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(coin);
                break;

                case 5:
                    // console.log("Case 3 - Destructable Object");
                    this.objectList.push(Crate);
                break;

                case 6:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(coin);
                break;

                case 7:
                    // console.log("Case 4 - Coin Object");
                    this.BGList.push(bush);
                break;

                case 8:
                    // console.log("Case 3 - Destructable Object");
                    this.BGList.push(bush);
                break;

                case 9:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(Crate);
                break;
            }

            // console.log("JunkGenerator Updater....");
            this.counter = 0;
        }


    }

    private generateLevel2() : void{
        this.counter++;

        var minPositionY    = 0;
        var maxPositionY    = 15;

        if(this.counter > this.updateTimout){
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            let randomYTree = this.getRandomNumber(minPositionY, maxPositionY);
            let crateImg        = this.assets.desObjects.Crate;


            // console.log("randomX junk =" + randomX);
            // console.log("randomY junk =" + randomY);
            let bush = new BackgroundObject({ imgSrc: this.assets.winterObjects.Tree2_1, x: randomX, y: 30, frameHeight: 280, frameWidth: 228 }, 1, this._game);
            let coin = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 5, speed: 5});
            let Crate = new crate(this._game, { imgSrc: this.assets.winterObjects.IceBoxSmall, x: randomX, y: 225, frameHeight: 50, frameWidth: 50, speed: 5 });

            switch (random) {
                case 1:
                    // console.log("Case 1 - Background Object");
                    this.objectList.push(coin);
                break;

                case 2:
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(coin);
                    // console.log("Case 2 - Background Object");
                    // this.objectList.push(new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                break;

                case 3:
                    // console.log("Case 3 - Destructable Object");
                    this.BGList.push(bush);
                break;

                case 4:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(coin);
                break;

                case 5:
                    // console.log("Case 3 - Destructable Object");
                    this.objectList.push(Crate);
                break;

                case 6:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(coin);
                break;

                case 7:
                    // console.log("Case 4 - Coin Object");
                    this.BGList.push(bush);
                break;

                case 8:
                    // console.log("Case 3 - Destructable Object");
                    this.BGList.push(bush);
                break;

                case 9:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(Crate);
                break;
            }

            // console.log("JunkGenerator Updater....");
            this.counter = 0;
        }


    }
}
