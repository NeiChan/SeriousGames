/**
 * Rectangle
 */
class Rectangle {
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    
    constructor(x:number, y:number, w:number, h:number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    
    leftCollision(rec: Rectangle) : boolean {
        return (this.x < rec.x); 
    }

    topCollision(rec: Rectangle) : boolean {
        return (this.y > rec.y);
    }

    // kijk of twee rectangles elkaar raken
    hitsOtherRectangle(rec: Rectangle): boolean {
         return (this.x < rec.x + rec.width && this.x + this.width > rec.x && this.y < rec.y + rec.height && this.height + this.y > rec.y);
    }

    hitsSolidObject(polar: polarBear, rec: Rectangle): string {
         // get the vectors to check against
        var vX = (this.x + (this.width / 2)) - (rec.x + (rec.width / 2));
        var vY = (this.y + (this.height / 2)) - (rec.y + (rec.height / 2));
            // add the half widths and half heights of the objects
        var hWidths = (this.width / 2) + (rec.width / 2);
        var hHeights = (this.height / 2) + (rec.height / 2);
        var colDir = null;;
    
        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        // figures out on which side we are colliding (top, bottom, left, or right)
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {                  
            var     oX = hWidths - Math.abs(vX);
            var     oY = hHeights - Math.abs(vY);         
            
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    //this.y += oY;
                    polar.y += oY;
                } else {
                    colDir = "b";
                    //this.y -= oY;
                    polar.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    //this.x += oX;
                    polar.x += oX;
                } else {
                    colDir = "r";
                    //this.x -= oX;
                    polar.x -= oX;
                }
            }
        }
        return colDir;
    }
    
    isInside(posx:number, posy:number): boolean {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        
        return Math.abs(differencex) < this.width/2 && Math.abs(differencey) < this.height/2;
    }
    
    // kijk of twee rectangles elkaar raken
    hasOverlap(rec: Rectangle): boolean {
        var differencex = this.x - rec.x;
        var differencey = this.y - rec.y;
        
        return Math.abs(differencex) < this.width/2 + rec.width/2 && Math.abs(differencey) < this.height/2 + rec.height/2;
    }
}