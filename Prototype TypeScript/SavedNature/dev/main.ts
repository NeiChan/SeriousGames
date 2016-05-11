// <reference path="phaser.d.ts"/>

window.addEventListener("load", function(){
    new Main();
});

class Main {
    private player: Player;

    constructor() {
        this.createPlayer();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    createPlayer(): void {
        this.player = new Player();
    }

    private gameLoop() {
        this.player.moveplayer();

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
