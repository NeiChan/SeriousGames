class polarBear extends GameObjects{
    
    constructor(source) {
        // extending from GameObjects
        super(source);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
    }
    
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 32: //UP
                super.changeY(0);
                super.changeX(1);
                super.changeAnimationY(0);
                break;
            case 88:
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(1);
                break;
        }
    }
    
    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
            case 88: //UP
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
                break;
            case 32:
                super.changeY(0);
                super.changeX(0);
                super.changeAnimationY(0);
                break;
        }
    }
    
    public draw() : void {
        // console.log("I have been drawn"); 
        super.Draw();  
    }
    
    public jump() : void{
        
    }
    
    public wait() : void{
        
    }
}