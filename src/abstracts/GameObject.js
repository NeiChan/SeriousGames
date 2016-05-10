var GameObject = (function () {
    function GameObject(gme, pos_x, pos_y, spriteName, anchor, gravityY) {
        this.gme = gme;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.spriteName = spriteName;
        this.anchor = anchor;
        this.gravityY = gravityY;
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
    return GameObject;
}());
