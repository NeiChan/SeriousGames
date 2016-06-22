class JunkGenerator {
    private assets: AssetsManager = new AssetsManager();

    private minNumber = 1;
    private maxNumber = 13;
    private counter = 0;
    private updateTimout = 60;

    private minPositionY = 185;
    private maxPositionY = 215;

    private minPositionX = 1100;
    private maxPositionX = 1150;

    private objectList: Array<ICollidable>;
    private BGList: Array<bgObjects>;
    private _game: Game;

    public Level: level;

    constructor(game: Game, objList: Array<ICollidable>, bglist: Array<bgObjects>, lvl: level) {
        this.objectList = objList;
        this.BGList = bglist;
        this._game = game;

        this.Level = lvl;
        console.log("JunkGenerator is activated...");
    }

    private getRandomNumber(min, max): number {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    }

    private getRandomFloat(range: number): number {
        let random = (Math.random() * range) + 0.2;
        return random;
    }

    public generateJunk(): void {

        switch (this.Level.getLevel()) {
            case 1: {
                this.generateLevel1();
                break;
            }
            case 2: {
                this.generateLevel2();
                break;
            }
        }
    }

    private generateLevel2(): void {
       
 this.counter++;

        let minPositionY = 0;
        let maxPositionY = 15;

        if (this.counter > this.updateTimout) {
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            let randomYTree = this.getRandomNumber(minPositionY, maxPositionY);
            let crateImg = this.assets.desObjects.Crate;

            let randomX2 = this.getRandomNumber(this.minPositionX, this.maxPositionX);

            // BackgroundObjects
            let bush    = new BackgroundObject({ imgSrc: this.assets.winterObjects.Tree2_1, x: randomX, y: 30, frameHeight: 280, frameWidth: 228 }, 1, this._game);
            let snowman = new BackgroundObject({ imgSrc: this.assets.winterObjects.SnowMan, x: randomX, y: 225, frameHeight: 50, frameWidth: 55}, 1, this._game);
            let sign    = new BackgroundObject({ imgSrc: this.assets.winterObjects.Sign2_2, x: randomX, y: 225, frameHeight: 50, frameWidth: 53}, 1, this._game);
            let igloo   = new BackgroundObject({ imgSrc: this.assets.winterObjects.Igloo2, x: randomX, y: 255, frameHeight: 120, framewidth: 120}, 1, this._game);

            // Objects
            let coin    = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 5, speed: 5});
            let Crate   = new crate(this._game, { imgSrc: this.assets.winterObjects.IceBoxSmall, x: randomX2, y: 225, frameHeight: 50, frameWidth: 50, speed: 5 });
            let stone   = new crate(this._game, {imgSrc: this.assets.winterObjects.Stone2, x: randomX, y: 236, frameHeight: 62, frameWidth: 62, speed: 5});
            let bacteria = new Bacteria(this._game, { imgSrc: this.assets.bacteria, x: randomX2, y: 255, maxFrame: 7, frameHeight: 30, frameWidth: 25, speed: 5, animationSpeed: 10 });

            switch (random) {
                case 1:
                    this.objectList.push(coin);
                break;

                case 2:
                    this.objectList.push(bacteria);
                    this.objectList.push(coin);
                break;

                case 3:
                    this.BGList.push(bush);
                break;

                case 4:
                    this.objectList.push(coin);
                    this.objectList.push(Crate);
                break;

                case 5:
                    this.objectList.push(Crate);
                break;

                case 6:
                    this.objectList.push(bacteria);
                    this.objectList.push(coin);
                break;

                case 7:
                    this.BGList.push(bush);
                break;

                case 8:
                    this.BGList.push(bush);
                    this.objectList.push(Crate);
                break;

                case 9:
                    this.objectList.push(Crate);
                break;

                case 10:
                    this.BGList.push(snowman);
                    break;
                case 11:
                    this.BGList.push(sign);
                    break;
                case 12:
                    this.objectList.push(stone);
                    break;
                case 13:
                    this.objectList.push(stone);
                    break;
            }
            // console.log("The random number is: " + random);
            this.counter = 0;
        }
    

    }

    private generateLevel1(): void {

 this.counter++;

        if (this.counter > this.updateTimout) {
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            let randomX2 = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY2 = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            let crateImg = this.assets.desObjects.Crate;

            let bush = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 145 }, 1, this._game);
            let bush2 = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX2 + 200, y: randomY2, frameHeight: 145, frameWidth: 145 }, 1, this._game);
            
            
            let coin = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10, speed: 5});
            let Crate = new crate(this._game, { imgSrc: this.assets.desObjects.Crate, x: randomX, y: randomY, frameHeight: 101, frameWidth: 101, speed: 5 });

            let tree = new BackgroundObject({ imgSrc: this.assets.greenObjects.Tree3, x: randomX, y: 130, frameHeight: 146, frameWidth: 150}, 1, this._game);
            let treeLarge = new BackgroundObject({ imgSrc: this.assets.greenObjects.Tree2, x: randomX, y: -22, frameHeight: 301, frameWidth: 282}, 1, this._game);
            let bushJungle = new BackgroundObject({ imgSrc: this.assets.greenObjects.Bush4, x: randomX, y: 235, frameHeight: 42, frameWidth: 73}, 1, this._game);
            let trunk = new BackgroundObject({imgSrc: this.assets.greenObjects.Tree1, x: randomX, y: 240, frameHeight: 44, frameWidth: 116}, 1, this._game);            
            let bacteria = new Bacteria(this._game, { imgSrc: this.assets.bacteria, x: randomX2, y: 240, maxFrame: 7, frameHeight: 30, frameWidth: 25, speed: 5, animationSpeed: 10 });
 
            if (this._game._collectCounter > 25) {
            console.log("geen bomen yo");
            
            switch (random) {
                 case 1:
                    this.objectList.push(coin);
                break;

                case 2:
                    this.BGList.push(tree);
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(bacteria);
                break;

                case 3:
                    this.objectList.push(coin);
                    this.BGList.push(trunk);
                break;

                case 4:
                    this.BGList.push(trunk);
                break;

                case 5:
                    this.BGList.push(trunk);
                break;

                case 6:
                    // this.BGList.push(treeLarge);
                    this.objectList.push(bacteria);
                    this.BGList.push(trunk);

                break;

                case 7:
                    this.objectList.push(Crate);
                    
                break;

                case 8:
                    this.objectList.push(Crate);
                break;

                case 9:

                    // this.BGList.push(treeLarge);
                    this.BGList.push(trunk);
                break;

                case 10:
                    this.objectList.push(bacteria);
                    this.objectList.push(coin);
                break;

            }
            } else if(this._game._collectCounter < 25 && this._game._collectCounter > 9) {
                console.log("weinig bomen yo");
                
             switch (random) {
                 case 1:
                    this.objectList.push(coin);
                break;

                case 2:
                    this.BGList.push(tree);
                    console.log("Case 2 - Coin Object");
                    this.objectList.push(bacteria);
                break;

                case 3:
                    this.objectList.push(coin);
                break;

                case 4:
                    this.BGList.push(tree);
                break;

                case 5:
                    this.BGList.push(bushJungle);
                break;

                case 6:
                    this.BGList.push(treeLarge);
                    this.objectList.push(bacteria);

                break;

                case 7:
                    this.BGList.push(tree);
                    
                break;

                case 8:
                    this.BGList.push(tree);
                break;

                case 9:

                    this.BGList.push(treeLarge);
                    this.objectList.push(Crate);
                break;

                case 10:
                    this.objectList.push(bacteria);
                break;

            }
            } else {
            console.log("wel bomen yo");
            
             switch (random) {
                 case 1:
                    this.objectList.push(coin);
                break;

                case 2:
                    this.BGList.push(tree);
                    console.log("Case 2 - Coin Object");
                    // this.objectList.push(bacteria);
                break;

                case 3:
                    this.objectList.push(coin);
                break;

                case 4:
                    this.BGList.push(tree);
                    this.objectList.push(bacteria);
                break;

                case 5:
                    this.BGList.push(bushJungle);
                break;

                case 6:
                    this.BGList.push(treeLarge);
                    // this.objectList.push(bacteria);

                break;

                case 7:
                    this.BGList.push(tree);
                    
                break;

                case 8:
                    this.BGList.push(tree);
                    this.objectList.push(coin);
                break;

                case 9:

                    this.BGList.push(treeLarge);
                    this.objectList.push(coin);
                    // this.objectList.push(Crate);
                break;

                case 10:
                    // this.objectList.push(bacteria);
                    this.BGList.push(bushJungle);
                    this.objectList.push(coin);
                break;

            }
            }


            this.counter = 0;
        }
        
    }

    public stopGenerating() {

    }
}
