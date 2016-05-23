class utils {
    public static CopyProperties(source:any, target:any):void {
        for(var prop in source){
            if(prop !== undefined){
                // console.log(source[prop]);    
                target[prop] = source[prop];
            }
            else {
                console.error("Cannot set undefined property: " + prop);
            }
        }
    }
}
