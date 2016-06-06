class JunkGenerator {
    
    private assets      : AssetsManager = new AssetsManager();
    
    private minNumber       = 1;
    private maxNumber       = 4;
    private counter         = 0;
    private updateTimout    = 60;
    
    private minPositionY    = 185;
    private maxPositionY    = 215;
    
    private minPositionX    = 1100;
    private maxPositionX    = 1150;
    
    private objectList:any;
    private _game:Game;
    
    constructor(game:Game, objList:Array<GameObjects>) {
        this.objectList = objList;
        this._game = game;
        console.log("JunkGenerator is activated...");
    }
    
    private getRandomNumber(min, max) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    }
    
    public generateJunk(): void {
        this.counter++;
        
        if(this.counter > this.updateTimout){
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            
            // console.log(randomY);
            
            // console.log("randomX junk =" + randomX);
            // console.log("randomY junk =" + randomY);
            let bush = new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 });
            let coin = new Coin(this._game, {imgSrc: this.assets.collectables.goldCoin,  x: randomX, y: randomY, frameHeight: 16, frameWidth: 16, maxFrame: 7, animationSpeed: 10});
            
            switch(random){
                case 1:
                    // console.log("Case 1 - Background Object");
                    this.objectList.push(bush);
                break;
                
                case 2:
                    // console.log("Case 2 - Coin Object");
                    this.objectList.push(coin);
                    // console.log("Case 2 - Background Object");
                    // this.objectList.push(new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                break;
                
                case 3:
                    // console.log("Case 3 - Destructable Object");
                    this.objectList.push(bush);
                break;
                
                case 4:
                    // console.log("Case 4 - Coin Object");
                    this.objectList.push(coin);
                break;
            }
            
            // console.log("JunkGenerator Updater....");
            this.counter = 0;
        }
    }   
}