// On load instantiate class Main
window.addEventListener("load", function(){
    new Menu();
});

class Main {
    private menu: Menu;
    private player: Player;

    constructor() {
        this.createPlayer();
    }

    private createPlayer() {
        // Instantiate the player class.
        this.player = new Player();

        // Loop this function 60 times per second (60fps).
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop() {
        // Call movePlayer function in class Player.
        this.player.movePlayer();

        // Loop this function 60 times per second (60fps).
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
