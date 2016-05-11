class Player {

    private posX: number;
    private posY: number;
    private player: HTMLElement;

    constructor() {
        // Constructor for player...
        this.player = document.createElement("player");
        this.player.setAttribute("id", "Player1");

        // Position
        this.posX = 100;
        this.posY = 100;

        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";

        console.log(this.posX);

        document.body.appendChild(this.player);
        console.log("Player class should have been made");
    }

    public playerInput(e): void {
        let curPosY = this.getPositionY;
        // console.log(curPosY);

        if (e.keyCode === 32) {
            // keyCode 32 = spacebar
            console.log("Space has been pressed!");

            let jumpForce: number = 15;

        }
    }

    public getPositionY = () => {
        // console.log("function getPositionY has been called!");
        let playerPosY = document.getElementById("Player1").style.top;
        console.log(playerPosY);
        return playerPosY;
    }
}
