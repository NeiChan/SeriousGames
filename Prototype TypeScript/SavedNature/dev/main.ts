// <reference path="phaser.d.ts"/>

window.addEventListener("load", function(){
    new Main();
});

class Main {
    constructor() {
        this.createPlayer();
    }

    createPlayer(): void {
        let player = new Player();
        window.onkeydown = player.playerInput;
    }
}
