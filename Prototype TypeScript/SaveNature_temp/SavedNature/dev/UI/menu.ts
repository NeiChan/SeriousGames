class Menu {
    private btnStart: HTMLElement;
    private btnHighscores: HTMLElement;
    private btnClose: HTMLElement;
    private gameTitle: HTMLElement;
    private main: Main;

    constructor() {
        // Create the HTML elements.
        this.gameTitle = document.createElement("DIV");
        this.btnStart = document.createElement("button");
        this.btnClose = document.createElement("button");
        this.btnHighscores = document.createElement("button");

        // Set the ID's to the created HTML elements.
        this.gameTitle.setAttribute("id", "gameTitle");
        this.btnStart.setAttribute("id", "btnStart");
        this.btnClose.setAttribute("id", "btnClose");
        this.btnHighscores.setAttribute("id", "btnHighscores");

        // Insert text and images into HTML elements.
        // this.gameTitle.innerHTML = "Save Nature!";
        this.gameTitle.style.backgroundImage = "url('images/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";

        // Add click events.
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("click", this.removeMenu);

        // Append to the body
        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        document.body.appendChild(this.gameTitle);
        document.body.appendChild(this.btnStart);
        document.body.appendChild(this.btnHighscores);
        document.body.appendChild(this.btnClose);
    }

    showLeaderboards(): void {
        window.location.href = "leaderboards.php";
    }

    removeMenu(): void {
        // Remove the menu items.
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        document.body.style.backgroundImage = "url('images/backgrounds/snowBackground.jpg')";

        // Call function to create Player character.
        this.main = new Main();
    }
}
