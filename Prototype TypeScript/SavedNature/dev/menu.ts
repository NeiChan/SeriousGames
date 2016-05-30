class Menu {
    private btnStart: HTMLElement;
    private btnMatter: HTMLElement;
    private btnHighscores: HTMLElement;
    private btnClose: HTMLElement;
    private btnPhysics: HTMLElement;
    private gameTitle: HTMLElement;
    private btnDynamics: HTMLElement;
    private soundTest: HTMLElement;
    private main: any;
<<<<<<< HEAD
    private soundmanager: SoundsManager;
=======

>>>>>>> 24ccf1be08f3c35e7f52ceb9b0928a0753ce440f
    constructor() {
        this.soundmanager = new SoundsManager("soundfile");
        // Create the HTML elements.
        this.gameTitle = document.createElement("DIV");
        this.btnStart = document.createElement("button");
        this.btnMatter = document.createElement("button");
        this.btnPhysics = document.createElement("button");
        this.btnDynamics = document.createElement("button");
        this.btnClose = document.createElement("button");
        this.btnHighscores = document.createElement("button");

        // Set the ID's to the created HTML elements.
        this.gameTitle.setAttribute("id", "gameTitle");
        this.btnStart.setAttribute("id", "btnStart");
        this.btnMatter.setAttribute("id", "btnMatter");
        this.btnPhysics.setAttribute("id", "btnPhysics");
        this.btnDynamics.setAttribute("id", "btnDynamics");
        this.btnClose.setAttribute("id", "btnClose");
        this.btnHighscores.setAttribute("id", "btnHighscores");

        // Insert text and images into HTML elements.
        // this.gameTitle.innerHTML = "Save Nature!";
        this.gameTitle.style.backgroundImage = "url('images/interface/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnMatter.innerHTML = "Show Matter";
        this.btnPhysics.innerHTML = "Show Physics";
        this.btnDynamics.innerHTML = "Show Dynamics example";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";

        // Add click events.
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("click", this.removeMenu);

        // Append to the body
        var content = document.getElementById('content');

        document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";
        content.appendChild(this.gameTitle);
        content.appendChild(this.btnStart);
        content.appendChild(this.btnMatter);
        content.appendChild(this.btnPhysics);
        content.appendChild(this.btnDynamics);
        content.appendChild(this.btnHighscores);
        content.appendChild(this.btnClose);
        
        this.soundTest = document.createElement("button");
        this.soundTest.addEventListener('click', () => this.soundmanager.play('new_highscore'));
        content.appendChild(this.soundTest);
    }

    showLeaderboards(): void {
        window.location.href = "leaderboard.php";
    }

    removeMenu(): void {
        // Remove the menu items.
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnDynamics").remove();
        document.getElementById("btnPhysics").remove();
        document.getElementById("btnHighscores").remove();
        //document.body.style.backgroundImage = "url('images/backgrounds/menu_background.png')";

        document.body.style.backgroundImage = "";

        // Call function to create Game.
        this.main = new Game();
    }
<<<<<<< HEAD
    
    private startMatter() : void{
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnDynamics").remove();
        document.getElementById("btnPhysics").remove();
        document.getElementById("btnHighscores").remove();
        document.body.style.backgroundImage = "none";
        
        this.main = new matter();
    }
    
    private startPsysics2D() : void{
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnDynamics").remove();
        document.getElementById("btnPhysics").remove();
        document.getElementById("btnHighscores").remove();
        // document.body.style.backgroundImage = "url('images/backgrounds/snowBackground.jpg')";
        
        this.main = new physyics2d();
    }
    
    private startDynamics() : void{
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnDynamics").remove();
        document.getElementById("btnPhysics").remove();
        document.getElementById("btnHighscores").remove();
        // document.body.style.backgroundImage = "url('images/backgrounds/snowBackground.jpg')";
        
        this.main = new dynamic();
    }
=======
>>>>>>> 24ccf1be08f3c35e7f52ceb9b0928a0753ce440f
}
