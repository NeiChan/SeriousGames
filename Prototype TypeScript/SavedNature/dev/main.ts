window.addEventListener("load", function(){
    new Game();
});

class Game {
    // Get class player
    private player: Player;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        this.player = new Player();
        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop() {
        // call the function movePlayer in the player class
        this.player.movePlayer();

        // Loop this function 60 times per second (60fps)
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}