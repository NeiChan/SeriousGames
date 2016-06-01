abstract class GameObjects {	
    private assets : AssetsManager = new AssetsManager();
    private directionX: number = 0;
    private directionY: number = 0;

    protected x: number = 0;
    protected y: number = 0;
	
	private speed: number = 0;
	
	protected context: CanvasRenderingContext2D;
    protected image: HTMLImageElement;
    
    private currentFrame:   number  = 0;
    private maxFrame:       number  = 0;
    
    protected frameWidth:     number  = 0;
    protected frameHeight:    number  = 0;
    
    private animationY:     number  = 0;
    private animationSpeed: number  = 0;
    
    private timer:          number  = 0;
    
    private imgSrc: string;
	
	constructor(source:Object)
	{
        this.init(source);
        
        // Omdat er getekend moet worden op het scherm
		this.createCanvasElement();
    }
    
     /**
     * init
     * 
     * Assign all given variables inside the source variable to the Objects' private variables
     */
    private init(source) : void {
        utility.CopyProperties(source,this);
    }
    
    // /**
    //  * getBounds
    //  * 
    //  * Create a rectangle over the image itself for collision
    //  */
    // public getBounds():Rectangle {
    //     return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    // }
	
    /**
     * CreateCanvasElement
     * 
     * Select canvasElement and create the image
     */
    private createCanvasElement() : void {
        // Selecteren van canvas, waar getekend wordt
        var canvas = document.getElementsByTagName("canvas")[0];
        
        // Soort context aan het canvasElement meegeven
        this.context = canvas.getContext('2d');
        
        this.image = new Image();   // Create new img element
       
        this.image.src = this.imgSrc; 
    }
    
    /**
     * changeY
     * 
     * Public function to change the Y-direction
     */    
    public changeY(int) : void{
        this.directionY = int; 
    }
    
    /**
     * changeAnimationY
     * 
     * Public function to change the spritesheet row
     */
    public changeAnimationY(int) : void{
        this.animationY = int; 
    }
    
    /**
     * changeY
     * 
     * Public function to change the x-directionSpeed
     */
    public changeX(int) : void{
        this.directionX = int; 
    }
    
    /**
     * updateY
     * 
     * Public function for custom movement
     */
    public updateY(int) : void{
        this.y = this.y + int; 
    }
    
    /**
     * move
     * 
     * Public function to perform the move operation
     */   
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
        
        // Defining the currentFrame during GameTime
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
	
    /**
     * Update
     * 
     * Public function to do shit during every update when called
     */
	public Update() : void
	{
        
	}
}