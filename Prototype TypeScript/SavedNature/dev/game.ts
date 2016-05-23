class Game {
    private assets      : AssetsManager = new AssetsManager(); 
    
    // Get class player
    // private player      : Player;
    private bear        : polarBear;
    
//     - Maken van bearObject
// -- Lopen
// -- Springen
// -- Slaan
// - Een sloopbaar object
// -- Moet geslagen kunnen worden door de bear
    
    
    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        
        var bearImg = this.assets.polarbear;
        this.bear = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10 });
        // this.player = new Player();
        
        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(() => this.update());
    }

    private update() : void {
        this.bear.move();
        this.draw();    
    }
    
    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        // this.player.draw();
        
        this.bear.draw();
        
        requestAnimationFrame(() => this.update());
    }
}