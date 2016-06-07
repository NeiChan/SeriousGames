interface ICollidable {
    hasCollision:boolean;
    
    onCollision(gameObject: ICollidable);
    getBounds():Rectangle;
}