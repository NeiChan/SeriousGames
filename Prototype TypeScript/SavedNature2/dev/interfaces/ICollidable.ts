interface ICollidable {
    hasCollision:boolean;
    
    onCollision(gameObject: ICollidable);
    getBounds():Rectangle;

    Draw():void;
    Update():void;
    // getY():number;
}