/// <reference path="../Definitions/matter-js.d.ts" />
class Game {
    private assets      : AssetsManager = new AssetsManager(); 
    
    public objectList:any = [];
    // Get class player
    private bear        : polarBear;
    private bush        : testSubject;
        
    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
       
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        
        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        var bearImg = this.assets.polarbear;
        var bushImg = this.assets.desObjects.Bush1;
        
        // Aanmaken van een polarBear
        this.bear = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 80, y: 50, speed: 3 });
        this.bush = new testSubject({ imgSrc: bushImg, x: 50, y: 250, frameHeight: 145, frameWidth: 88 });
        
        this.objectList.push(this.bear);
        this.objectList.push(this.bush);
        
        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    private update() : void {
        // Aanroepen van update function
        
        for(var obj of this.objectList) {
            obj.update();
        }
        
        // hier checken of de ball een paddle raakt
        let polarBearBounds = this.bear.getBounds();
        let bushBounds = this.bush.getBounds();
        
        
        
        let hit = polarBearBounds.hitsOtherRectangle(bushBounds);
        console.log(hit);
        
        if(hit){
            console.log('Polarbear hit the bush');
        }
        
        this.draw();    
    }
    
    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        
        for(var obj of this.objectList) {
            obj.draw();
        }
        
        requestAnimationFrame(() => this.update());
    }
}