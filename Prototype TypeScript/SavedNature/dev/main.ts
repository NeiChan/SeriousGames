// <reference path="phaser.d.ts"/>

// On load instantiate class Main
window.addEventListener("load", function(){
    new Main();
});

class Main {
    // Get class player
    private player: Player;

    // constructor for Main
    constructor() {
        // call createPlayer() function
        this.createPlayer();
        // Request animation, replaces an update() function so it can run at 60 fps
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    createPlayer(): void {
        // Instantiate a new player
        this.player = new Player();
    }

    private gameLoop() {
        // call the function movePlayer in the player class
        this.player.movePlayer();

        // Loop this function 60 times per second (60fps)
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
