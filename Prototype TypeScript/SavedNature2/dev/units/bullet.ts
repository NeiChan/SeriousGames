class bullet extends GameObjects implements ICollidable{
    hasCollision:boolean;
    private game : Game;
    
    constructor(game: Game, source){
        super(source);
        this.game = game;
    }

    onCollision(gameObject: ICollidable){
        // console.log("deletesd");
        
       

        // this.game.deleteGO(this, null);
    }
    
    getBounds():Rectangle{
        return new Rectangle(this.x, this.y, this.frameWidth, this.frameHeight);
    }

    public Update(): void {
            // Update function...
            this.x = this.x + 10;


            if(this.x >=1500){
                this.game.deleteGO(this);
            }
            // super.changeMovementX(-2);
        }

}