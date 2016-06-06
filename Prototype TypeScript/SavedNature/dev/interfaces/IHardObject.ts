interface IHardObject {
    startCollisionPos:number;
    endCollisionPos:number;
        
    onCollisionEnter(gameObject: IHardObject);
    onCollisionExit();
    getY():number;
    getX():number;
    getObjectWidth():number;
}