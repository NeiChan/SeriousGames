/// <reference path="../../typings/howler.d.ts"/>
class utility {
    
    /**
     * copyProperties
     * 
     * Public static function to assign variables inside classes
     * @source = { imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10 }
     * @target = 'this'-instace of a Class
     */
    public static CopyProperties(source:Object, target:any):void {
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
    public static createDiv(elementName: string) {
        let el = document.createElement(elementName);
            
        document.body.appendChild(el);
        return el;
    }
    
    public static addSoundEvent(el: HTMLElement, soundName: string, event?: string): HTMLElement{
        if(event){
            el.addEventListener(event, () => utility.playSound(soundName));
        } else{
            el.addEventListener('click', () => utility.playSound(soundName));
        }
        return el;
    }

    public static playSound(soundName: string) : void{
        var sound = new Howl({
            urls: ["sound/" + soundName],
            volume: 0.4,
            sprite: {
                blast: [0, 2000],
            }
        });
                
        sound.play('blast');
    }


    
    // public static BearIsBoss(objectList: Array, old_index, new_index){
    //     objectList = function (old_index, new_index) {
    //     while (old_index < 0) {
    //         old_index += this.length;
    //     }
    //     while (new_index < 0) {
    //         new_index += this.length;
    //     }
    //     if (new_index >= this.length) {
    //         var k = new_index - this.length;
    //         while ((k--) + 1) {
    //             this.push(undefined);
    //         }
    //     }
    //     this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //     return this; // for testing purposes
    //     }
    // }

}
