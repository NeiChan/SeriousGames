abstract class GameObjects {	
    private assets : AssetsManager = new AssetsManager();
    private directionX: number = 0;
    private directionY: number = 0;

    private x: number = 0;
    private y: number = 0;
	
	private speed: number = 0;
	
	private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    
    private currentFrame:   number  = 0;
    private maxFrame:       number  = 0;
    
    private frameWidth:     number  = 0;
    private frameHeight:    number  = 0;
    
    private animationY:     number  = 0;
    private animationSpeed: number  = 0;
    
    private timer:          number  = 0;
    
    private imgSrc: string;
	
	constructor(source)
	{
        this.init(source);
        
		this.createCanvasElement();
        
        this.directionX     = 0;
        this.directionY     = 0;
        this.speed          = 3;
    }
  
    private init(source) : void {
        utils.CopyProperties(source,this);
    }
	
    private createCanvasElement() : void {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        
        this.image = new Image();   // Create new img element
        // this.image.src = 'images/battleship.png'; // Set source path
        this.image.src = this.imgSrc;
        
    }
    
    public changeY(int) : void{
        this.directionY = int; 
    }
    
    public changeAnimationY(int) : void{
        this.animationY = int; 
    }
    
    public changeX(int) : void{
        this.directionX = int; 
    }
    
    public move() : void {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    }
	
	public Draw() : void
	{
        /**
         * img	Source image object	Sprite sheet
            sx	Source x	Frame index times frame width
            sy	Source y	0
            sw	Source width	Frame width
            sh	Source height	Frame height
            dx	Destination x	0
            dy	Destination y	0
            dw	Destination width	Frame width
            dh	Destination height	Frame height
         */
        
        this.timer ++;
        if(this.timer % this.animationSpeed == 0) {
            this.currentFrame++;
        }
        
        if(this.currentFrame > this.maxFrame) {
            this.currentFrame = 0;
        }
        
        this.context.drawImage(
            this.image,
            this.currentFrame * this.frameWidth,
            this.animationY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
	}
	
	public Update() : void
	{

	}
}