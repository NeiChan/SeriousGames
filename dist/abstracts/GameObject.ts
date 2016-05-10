abstract class GameObject {
 
    protected obj;
    protected cursors;
    
    constructor(protected gme, protected pos_x:number, protected pos_y:number, protected spriteName:string, protected anchor, protected gravityY:number) 
    {
        //setup
        this.obj = gme.add.sprite(pos_x, pos_y, spriteName);
        this.obj.anchor.set(anchor);
        
        game.physics.arcade.enable(this.obj);
        this.obj.body.gravity.y = gravityY;
        this.obj.body.checkCollision.up = false;
        this.obj.body.checkCollision.down = false;
        this.obj.body.checkCollision.left = false;
        this.obj.body.checkCollision.right = false;
        
        this.cursors = gme.input.keyboard.createCursorKeys();        
    }
    
    abstract Animation();
    abstract Move();
}