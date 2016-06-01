class UI extends GameObjects
{
    private _font = "14px Arial";
    private _counter = 0;
     
    constructor(source)
    {
        super(source);
        this.context.font = this._font;
    }
    
    private generateScore() : void {
        this.context.fillText("Score :  ", this.x, this.y);
        this.context.fillText(this._counter.toString(), this.x + 50, this.y);
    }
    
    public updateScore(score) : void {
        this._counter += score;
    } 
    
    public draw() : void {
        this.generateScore();
    }
    
    public update() : void{
        
    }
}