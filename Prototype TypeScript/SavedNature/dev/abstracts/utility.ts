class utils {
    public static CopyProperties(source:any, target:any):void {
        for(var prop in source){
            // console.log(prop);
            if(prop !== undefined){
                target[prop] = source[prop];
            }
            else {
                console.error("Cannot set undefined property: " + prop);
            }
        }
    }
}
