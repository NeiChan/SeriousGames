class utils {
    
    /**
     * copyProperties
     * 
     * Public static function to assign variables inside classes
     * @source = { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10 }
     * @target = 'this'-instace of a Class
     */
    public static CopyProperties(source:any, target:any):void {
        for(var prop in source){
            if(prop !== undefined){ 
                target[prop] = source[prop];
            }
            else {
                console.error("Cannot set undefined property: " + prop);
            }
        }
    }
    
     /**
     * CreateDiv
     * 
     * Build a div and append it into the container(parent)
     */
    public createDiv(elementName: string) {
        let el = document.createElement(elementName);
            
        document.body.appendChild(el);
        return el;
    }
}
