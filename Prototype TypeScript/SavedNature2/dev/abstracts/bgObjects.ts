class bgObjects{
    protected x : number;
    private y : number;

    private speed = 1;
    private speedOffset = 0;

    protected context: CanvasRenderingContext2D;
    protected image: HTMLImageElement;

    private imgSrc : string;

    private timer:          number  = 0;

    private directionX: number = 0;
    private directionY: number = 0;

    private currentFrame:   number  = 0;
    private maxFrame:       number  = 0;

    protected frameWidth:     number  = 0;
    protected frameHeight:    number  = 0;

    private animationY:     number  = 0;
    private animationSpeed: number  = 0;

    private game : Game;

    constructor(source, speed, game: Game) {
        // extending from GameObjects
        this.init(source);

        if(speed){
            this.speedOffset = speed;
        }

        this.game = game;

        this.createCanvasElement();
    }

    private init(source : Object) : void{
        utility.CopyProperties(source, this);
    }

    private createCanvasElement() : void {
        // Selecteren van canvas, waar getekend wordt
        var canvas = document.getElementsByTagName("canvas")[0];

        // Soort context aan het canvasElement meegeven
        this.context = canvas.getContext('2d');

        this.image = new Image();   // Create new img element

        this.image.src = this.imgSrc;
    }

    public changeSpeed(int) : void{
        this.speed = int;
    }

    public newImage(img): void{
        this.image.src = img;
    }

    public update(){
        this.x = this.x + (this.game.WorldSpeed * -(this.speed * this.speedOffset));
    }

    public getX() : number{
        return this.x;
    }

    public setX(int) : void{
        this.x = int;
    }
    
    // public draw(){
    //     this.context.drawImage(this.image, this.x, this.y);
    // }

    public draw() : void
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
}