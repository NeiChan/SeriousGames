var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Polarbear = (function (_super) {
    __extends(Polarbear, _super);
    function Polarbear(gme, pos_x, pos_y, spriteName, anchor, gravityY) {
        _super.call(this, gme, pos_x, pos_y, spriteName, anchor, gravityY);
        this.game = gme;
    }
    Polarbear.prototype.Animation = function () {
        console.log("Animation van Polarbear");
        this.game.animations.add('fight', [0, 1, 2, 3], 12);
        // this.game.animations.add('run', [4,5,6,7], 12);
        // this.world.animations.add('walk', [8,9,10,11], 12);
        // this.world.animations.play('fight', 15, true);     
    };
    Polarbear.prototype.Move = function () {
        if (this.cursors.up.isDown) {
            this.obj.body.velocity.y = -50;
        }
        if (this.cursors.down.isDown) {
            this.obj.body.velocity.y = 50;
        }
    };
    return Polarbear;
}(GameObject));
