class Bacteria extends GameObjects implements ICollidable,IDestructable{
    public hasCollision:boolean     = true;
    public hasDestructable:boolean  = true;
    private _game:Game;
    private collectCounter: number;

    constructor(game:Game, source) {
        super(source);
        this._game = game;
    }

    /**
     * getBounds
     *
     * Create a rectangle over the image itself for collision
     */
    getBounds():Rectangle {
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }

    onCollision(gameObject:ICollidable) {
            // functie van ICollidable
            // Doe iets wanneer er een collision is.
            // console.log("VBAIJO");
            // this.x = 0;
            // this._game._ui.updateScore(-10);

            var sound = new Howl({
                    urls: ["sound/kill3.mp3"],
                    volume: 0.4,
                    sprite: {
                        blast: [0, 2000],
                    }
                });

            sound.play('blast');

            if(gameObject instanceof polarBear){
                this._game._ui.loseLife();
            } else if(gameObject instanceof bullet){
                this._game._ui.addScore(5);
            }

            this._game.deleteGO(this, null);

        }

        public draw(): void {
            super.Draw();
        }

        public Update(): void {
            // Update function...
            this.x = this.x - this._game.getWorldSpeed();

            if(this.x <= 0){
                this._game.deleteGO(this);
            }
            // super.changeMovementX(-2);
        }

}