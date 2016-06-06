/// <reference path="../typings/howler.d.ts"/>
class Menu {
    private btnStart: HTMLElement;
    private btnHighscores: HTMLElement;
    private btnClose: HTMLElement;
    private gameTitle: HTMLElement;
    private main: any;
    private soundmanager: SoundsManager;
    
    constructor() {
        this.soundmanager = new SoundsManager("soundfile");
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
        this.gameTitle.style.backgroundImage = "url('images/interface/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";

        // Add click events.
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("mouseover", () => this.soundmanager.play('hover'));
        this.btnHighscores.addEventListener("mouseover", () => this.soundmanager.play('hover'));
        this.btnClose.addEventListener("mouseover", () => this.soundmanager.play('hover'));
        this.btnStart.addEventListener("click", this.startEvent.bind(this));
        
        
        // Append to the body
        var content = document.getElementById('content');

        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);

        // Make sound when clicking on button start
        // this.btnStart.addEventListener('click', () => this.soundmanager.play('go'));
    }
    
    startEvent(): void {
        this.soundmanager.play('start');
        this.removeMenu.bind(this)();
       
        // Call function to create Game.
        this.main = new Game();        
    }

    showLeaderboards(): void {
        window.location.href = "leaderboard.php";
    }
    
    removeMenu(): void {
        // Remove the menu items.
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnHighscores").remove();
        this.soundmanager.play("background");
        console.log(this.soundmanager);
        
        
        //document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";

        document.body.style.backgroundImage = "";
    }
}
