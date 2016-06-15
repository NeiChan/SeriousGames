class BackgroundObject extends bgObjects
{
    private _game : Game;
    constructor(source, speed, _game: Game) {
        // extending from GameObjects
        super(source, speed, _game);

        this._game = _game;
    }

    public draw() : void {
        //  console.log("I have been drawn");
        super.draw();
    }

    public wait() : void{

    }

    public update() : void{
        super.update();

        if(super.getX() <= -350){
                this._game.deleteGO(null, this);
            }
        // this.x -= 5;
        // super.changeMovementX(Game.WorldSpeed * this.spd);
        // console.log("called");
    }
}
