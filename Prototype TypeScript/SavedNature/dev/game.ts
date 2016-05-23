class Game {
    private assets      : AssetsManager = new AssetsManager(); 
    
    // Get class player
    private bear        : polarBear;
        
    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        
        // Ophalen van de polarbear-spritesheet uit de AssetsManager
        var bearImg = this.assets.polarbear;
        
        // Aanmaken van een polarBear
        this.bear = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 50, y: 50, speed: 3 });
        
        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    private update() : void {
        // Aanroepen van update function van het bear-object
        this.bear.update();
        
        this.draw();    
    }
    
    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        
        this.bear.draw();
        
        requestAnimationFrame(() => this.update());
    }
}