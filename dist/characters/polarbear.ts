
class Polarbear extends GameObject {
    private game;
    
    constructor(gme, pos_x:number, pos_y:number, spriteName:string, anchor, gravityY:number){
        super(gme, pos_x, pos_y, spriteName, anchor, gravityY);
        this.game = gme;
    }
    
    Animation() {
        console.log("Animation van Polarbear")
        this.game.animations.add('fight', [0,1,2,3], 12);
        // this.game.animations.add('run', [4,5,6,7], 12);
        // this.world.animations.add('walk', [8,9,10,11], 12);
        // this.world.animations.play('fight', 15, true);     
    }
    
    Move() {
        if( this.cursors.up.isDown) {
            this.obj.body.velocity.y = -50;
        } 
        if( this.cursors.down.isDown) {
            this.obj.body.velocity.y = 50;
        }
    }
}

