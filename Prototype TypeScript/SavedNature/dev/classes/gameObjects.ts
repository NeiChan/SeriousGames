abstract class GameObject {	
    private directionX: number = 0;
    private directionY: number = 0;

    private x: number = 0;
    private y: number = 0;
	
	private speed: number = 0;
	
	private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
	
	constructor()
	{
		this.createCanvasElement();
        
        this.directionX     = 0;
        this.directionY     = 0;
        this.speed          = 3;
	}
	
	private createCanvasElement() : void {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');

        this.image = new Image();   // Create new img element
        this.image.src = 'images/battleship.png'; // Set source path
    }
	
	public Draw() : void
	{
		
	}
	
	public Update() : void
	{

	}
}