interface ICollidable {
    hasCollision:boolean;
    
    onCollision(gameObject: ICollidable);
    onCollisionExit() : void;
    getBounds():Rectangle;
    setY(int: number);
}