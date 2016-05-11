var game = new Phaser.Game(
            800, 
            600, 
            Phaser.AUTO, 
            'content', 
            { 
                preload: this.preload, 
                create: this.create, 
                update: this.update,
                render: this.render
            });

var polarbear;
var polarbear_sprite; 
var cursors;

function preload() {
    //  57x50 is the size of each frame
    //  There are 12 frames in the PNG
    polarbear_sprite = game.load.spritesheet('polarbear', 'assets/sprites/polarbear.png', 57, 50, 12, 0, 10);
}

function create() {
    //polarbear = new Polarbear(this, 300, 200, 'polarbear', 0.5, 0);
    cursors = game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // polarbear.Animation();
    
    createPolarBear();
    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
     polarbear.animations.play('fight', 15, true);
     polarbear.animations.play('walk', 15, true);
     polarbear.animations.play('run', 9, true);
}
    
function update() {
    
    //polarbear.Move();
    polarbearMove();
}

function createPolarBear(){
    // polarbear setup
    polarbear = game.add.sprite(300, 200, 'polarbear');
    polarbear.anchor.set(0.5);
    
    game.physics.arcade.enable(polarbear);
    polarbear.body.collideWorldBounds = true;
    polarbear.body.bounce.setTo(1, 1);

    //polarbear.body.gravity.y = 500;
    polarbear.body.checkCollision.up = false;
    polarbear.body.checkCollision.left = false;
    polarbear.body.checkCollision.right = false;
    
    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    polarbear.animations.add('fight', [0,1,2,3], 12);
    polarbear.animations.add('run', [4,5,6,7], 12);
    polarbear.animations.add('walk', [8,9,10,11], 12);
    
    polarbear.animations.play('run');
    
	polarbear.body.velocity.x = 200;    
}

function polarbearMove() {
    // handle hero jumping
    // if( cursors.up.isDown && polarbear.body.touching.down ) {
    //   polarbear.body.velocity.y = -350;
    // } 
    if( cursors.up.isDown) {
      polarbear.body.velocity.y = -50;
    } 
}

function render() {

	// Debug info here

	// game.debug.body(sprite);
	// game.debug.body(sprite2);

}