class Player {

    // Variables
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

        // Set Start Position
        this.posX = 100;
        this.posY = 500;

        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        // End Position

        document.body.appendChild(this.player);

        // Incase player presses on a key, go to function playerInput()
        window.addEventListener("keydown", this.playerInput.bind(this));

        // Incase player lets go, go to function stopMoving()
        window.addEventListener("keyup", this.stopMoving.bind(this));
        // window.addEventListener("keydown", (e) => this.playerInput(e));
        // window.onkeydown = this.playerInput.bind(this);
        console.log("Player class has been made");
    }

    public playerInput(e): void {
        // Check what key has been pressed
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

                // Subject to change to a duck or crouch animation instead of going down
                this.jumpForce = 5;
                break;
            case 87:
                // keyCode 87 is W
                console.log("W has been pressed!");

                this.jumpForce = -5;
                break;
            default:
                break;
        }
    }

    public movePlayer() {
        // Constantly moves player, even if run- and jumpForce are at 0.
        // This makes sure it can run at 60 fps thanks to getAnimation in main.ts
        this.posX = this.posX + this.runForce;
        this.posY = this.posY + this.jumpForce;

        // Edit Position to new values
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
    }

    public stopMoving(e) {
        // Stops moving on key up
        if (e.keyCode === 65 || e.keyCode === 68) {
            this.runForce = 0;
        }
        else {
            this.jumpForce = 0;
        }
    }
}
