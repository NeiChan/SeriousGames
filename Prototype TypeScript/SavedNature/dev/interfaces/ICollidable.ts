interface ICollidable {
    hasCollision:boolean;
    
    onCollision(gameObject: ICollidable | IHardObject);
    getBounds():Rectangle;
    // getY():number;
}