/// <reference path="../typings/howler.d.ts"/>
class Menu {
    private btnStart: HTMLElement;
    private btnHighscores: HTMLElement;
    private btnClose: HTMLElement;
    private gameTitle: HTMLElement;
    private nameField: HTMLInputElement;
    private explanation : HTMLElement;
    private main: any;

    constructor() {
        // Create the HTML elements.
        this.gameTitle = document.createElement("DIV");
        this.btnStart = document.createElement("button");
        this.btnClose = document.createElement("button");
        this.btnHighscores = document.createElement("button");

        this.explanation = document.createElement("DIV");
        this.explanation.setAttribute("id", "explanation");
        this.explanation.innerHTML = "Vul hieronder uw naam in om uw score bij te houden.";

        this.nameField = document.createElement("input");
        this.nameField.setAttribute("id", "playerName");
        this.nameField.setAttribute("placeholder", "Jouw naam");

        // Set the ID's to the created HTML elements.
        this.gameTitle.setAttribute("id", "gameTitle");
        this.btnStart.setAttribute("id", "btnStart");
        this.btnClose.setAttribute("id", "btnClose");
        this.btnHighscores.setAttribute("id", "btnHighscores");

        // Insert text and images into HTML elements.
        // this.gameTitle.innerHTML = "Save Nature!";
        this.gameTitle.style.backgroundImage = "url('images/interface/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";

        // Add click events.
        // this.btnHighscores.addEventListener("click", this.showLeaderboards);
        // this.soundmanager.play("game_over")

        this.btnHighscores.addEventListener("click", () => this.showLeaderboards());
        // utility.addSoundEvent(this.btnHighscores,"game_over.ogg", "mouseover");
        this.btnStart.addEventListener("click", this.removeMenu);

        this.btnClose.addEventListener("click", () => this.showUitleg());

        // Append to the body
        var content = document.getElementById('content');

        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.explanation);
        content.appendChild(this.nameField);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);


        // Make sound when clicking on button start
        // this.btnStart.addEventListener('click', () => this.soundmanager.play('go'));
    }

    showLeaderboards(): void {
        window.location.href = "leaderboard.php";
    }

    showUitleg(): void {
        window.location.href = "explanation.html";
    }

    removeMenu(): void {
        // Remove the menu items.
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        document.getElementById("explanation").remove();
        var name = (<HTMLInputElement>document.getElementById("playerName")).value;
        document.getElementById("playerName").remove();

        //document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";

        document.body.style.backgroundImage = "";

        // Call function to create Game.

        this.main = new Game(1, name);

    }
}
