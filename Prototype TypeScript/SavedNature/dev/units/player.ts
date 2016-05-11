class Player {

    private posX: number;
    private posY: number;
    private runForce: number = 0;
    private jumpForce: number = 0;
    private frame: number = 0;
    private player: HTMLElement;

    constructor() {
        // Constructor for player...
        this.player = document.createElement("player");
        this.player.setAttribute("id", "Player1");

        // Position
        this.posX = 100;
        this.posY = 500;

        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        // End Position

        document.body.appendChild(this.player);

        window.addEventListener("keydown", this.playerInput.bind(this));
        window.addEventListener("keyup", this.stopMoving.bind(this));
        // window.addEventListener("keydown", (e) => this.playerInput(e));
        // window.onkeydown = this.playerInput.bind(this);
        console.log("Player class has been made");
    }

    public playerInput(e): void {
        switch (e.keyCode) {
            case 32:
                // keyCode 32 is Spacebar
                console.log("space has been pressed!");

                this.jumpForce = -5;
                break;
            case 65:
                // keyCode 65 is A
                console.log("A has been pressed!");

                this.runForce = -5;
                break;
            case 68:
                // keyCode 68 is D
                console.log("D has been pressed!");

                this.runForce = 5;
                break;
            case 83:
                // keyCode 83 is S
                console.log("S has been pressed!");

                // Subject to change to a duck animation instead of going down
                this.jumpForce = 5;
                break;
            case 87:
                console.log("W has been pressed!");

                this.jumpForce = -5;
                break;
            default:
                break;
        }
    }

    public getPositionY(): number {
        let playerPosY = this.posY;

        return playerPosY;
    }

    public moveplayer() {
        this.posX = this.posX + this.runForce;
        this.posY = this.posY + this.jumpForce;

        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
    }

    public stopMoving(e) {

        if (e.keyCode === 65 || e.keyCode === 68) {
            this.runForce = 0;
        }
        else {
            this.jumpForce = 0;
        }
    }
}
