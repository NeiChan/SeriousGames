class Game {
    private assets      : AssetsManager; 
    
    // Get class player
    private player      : Player;
    
    
    private context     : CanvasRenderingContext2D;
    private canvas      : HTMLCanvasElement;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.context = this.canvas.getContext('2d');
        
        console.log(this.assets.polarbear);
        
        this.player = new Player();
        
        // Request animation, replaces an update() function so it can run at 60 fps
        msRequestAnimationFrame(() => this.update());
    }

    private update() : void {
        this.player.movePlayer();
        this.draw();    
    }
    
    private draw()  : void {
        this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
        this.player.draw();
        
        requestAnimationFrame(() => this.update());
    }
}