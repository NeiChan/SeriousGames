class UI extends GameObjects
{
    private _font = "14px Arial";
    private _counter = 0;
    private _lives:any = 3;
    private _liveImage : HTMLImageElement;
    private _game:Game;

    constructor(game:Game, source)
    {
        super(source);
        this.context.font = this._font;
        this._game = game;

        this._liveImage = new Image();
        this._liveImage.src = new AssetsManager().lives;
    }

    private generateScore(): void {
        this.context.fillText("Score :  ", this.x, this.y);
        this.context.fillText(this._counter.toString(), this.x + 50, this.y);
    }

    private generateLives(): void {
        let x = 450;

        for(var i = 1; i <= this._lives; i++){
            this.context.drawImage(this._liveImage, this.x + x, this.y - 20);
            x += 30;
        }
    }

    public loseLive(): number {
        return this._lives--;
    }

    public getScore(): number {
        return this._counter;
    }

    public addScore(int: number): void {
        this._counter = this._counter + int;
    }

    public updateScore(score): void {
        this._counter += score;
    }

    public gameOverScreen(): void {
        if(this._lives == 0){
            this.context.fillText("Game Over!", this.x + 300, this.y + 100);
            this._game.pause();
        }
    }

    public draw(): void {
        this.generateScore();
        this.generateLives();
        this.gameOverScreen();
    }

    public update(): void{

    }
}
