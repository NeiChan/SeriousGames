class Coin extends GameObjects implements ICollidable, IDestructable {
        public hasCollision:boolean     = true;
        public hasDestructable:boolean  = true;
        private _game:Game;
        
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

            // this.x = 0;
            this._game._ui.updateScore(10);
        }

        public draw(): void {
            super.Draw();
        }

        public update(): void {
            // Update function...
        }
}
