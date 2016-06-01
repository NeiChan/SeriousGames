class JunkGenerator {
    
    private assets      : AssetsManager = new AssetsManager();
    
    private minNumber       = 1;
    private maxNumber       = 4;
    private counter         = 0;
    private updateTimout    = 60;
    
    private minPositionY    = 200;
    private maxPositionY    = 500;
    
    private minPositionX    = 1100;
    private maxPositionX    = 1150;
    
    private objectList:any;
    
    
    constructor(objList:Array<GameObjects>) {
        this.objectList = objList;
        console.log("JunkGenerator is activated...");
    }
    
    private getRandomNumber(min, max) {
        let random = Math.floor(Math.random() * max) + min;
        return random;
    }
    
    public generateJunk(): void {
        this.counter++;
        
        if(this.counter > this.updateTimout){
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            let randomX = this.getRandomNumber(this.minPositionX, this.maxPositionX);
            let randomY = this.getRandomNumber(this.minPositionY, this.maxPositionY);
            
            // console.log("randomX junk =" + randomX);
            // console.log("randomY junk =" + randomY);
            
            switch(random){
                case 1:
                    console.log("Case 1 - Destructable Object");
                    this.objectList.push(new DestructableObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                break;
                
                case 2:
                    console.log("Case 2 - Destructable Object");
                    this.objectList.push(new DestructableObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                    // console.log("Case 2 - Background Object");
                    // this.objectList.push(new BackgroundObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                break;
                
                case 3:
                    console.log("Case 3 - Destructable Object");
                    this.objectList.push(new DestructableObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                    console.log("Case 3");
                break;
                
                case 4:
                    console.log("Case 4 - Destructable Object");
                    this.objectList.push(new DestructableObject({ imgSrc: this.assets.desObjects.Bush1, x: randomX, y: randomY, frameHeight: 145, frameWidth: 80 }));
                    console.log("Case 4");
                break;
            }
            
            // console.log("JunkGenerator Updater....");
            this.counter = 0;
        }
    }   
}