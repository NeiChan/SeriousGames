class JunkGenerator {
    
    private assets      : AssetsManager = new AssetsManager();
    
    private minNumber       = 1;
    private maxNumber       = 4;
    private counter         = 0;
    private updateTimout    = 60;
    private objectList:any;
    
    constructor(objList:Array<GameObjects>) {
        this.objectList = objList;
        console.log("JunkGenerator is activated...");
    }
    
    private getRandomNumber(min, max) {
        let random = Math.floor(Math.random() * 6) + 1;
        return random;
    }
    
    public generateJunk(): void {
        this.counter++;
        
        if(this.counter > this.updateTimout){
            let random = this.getRandomNumber(this.minNumber, this.maxNumber);
            
            switch(random){
                case 1:
                    console.log("Case 1 - Destructable Object");
                    this.objectList.push(new DestructableObject({ imgSrc: this.assets.desObjects.Bush1, x: 150, y: 530, frameHeight: 145, frameWidth: 80 }));
                break;
                
                case 2:
                    console.log("Case 2 - Background Object");
                break;
                
                case 3:
                    console.log("Case 3");
                break;
                
                case 4:
                    console.log("Case 4");
                break;
            }
            
            console.log("JunkGenerator Updater....");
            this.counter = 0;
        }
    }   
}