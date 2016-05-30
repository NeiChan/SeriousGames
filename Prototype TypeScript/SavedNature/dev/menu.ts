class Menu {
    private btnStart: HTMLElement;
    private btnMatter: HTMLElement;
    private btnHighscores: HTMLElement;
    private btnClose: HTMLElement;
    private btnPhysics: HTMLElement;
    private gameTitle: HTMLElement;
    private btnDynamics: HTMLElement;
    private main: any;
    
    constructor() {
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
        this.gameTitle.style.backgroundImage = "url('images/title_screen.png')";
        this.btnStart.innerHTML = "Start";
        this.btnMatter.innerHTML = "Show Matter";
        this.btnPhysics.innerHTML = "Show Physics";
        this.btnDynamics.innerHTML = "Show Dynamics example";
        this.btnClose.innerHTML = "Uitleg";
        this.btnHighscores.innerHTML = "Highscores";

        // Add click events.
        this.btnHighscores.addEventListener("click", this.showLeaderboards);
        this.btnStart.addEventListener("click", this.removeMenu);
        this.btnMatter.addEventListener("click", this.startMatter);
        this.btnPhysics.addEventListener("click", this.startPsysics2D);
        this.btnDynamics.addEventListener("click", this.startDynamics);

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
    }

    showLeaderboards(): void {
        window.location.href = "leaderboards.php";
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
        document.body.style.backgroundImage = "url('images/backgrounds/snowBackground.jpg')";

        // Call function to create Player character.
        this.main = new Game();
    }
    
    private startMatter() : void{
        document.getElementById("gameTitle").remove();
        document.getElementById("btnStart").remove();
        document.getElementById("btnMatter").remove();
        document.getElementById("btnClose").remove();
        document.getElementById("btnDynamics").remove();
        document.getElementById("btnPhysics").remove();
        document.getElementById("btnHighscores").remove();
        // document.body.style.backgroundImage = "url('images/backgrounds/snowBackground.jpg')";
        
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
}
