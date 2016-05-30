/// <reference path="../typings/matter-js.d.ts"/>

class matter{
    public _Engine = Matter.Engine;
    public _World = Matter.World;
    public _Body = Matter.Body;
    public _Bodies = Matter.Bodies;
    public _Composites = Matter.Composites;
    public _Constraint = Matter.Constraint;
    public _Events = Matter.Events;
    public _Query = Matter.Query;
    public _MouseConstraint = Matter.MouseConstraint;
    
    public constructor(){
        // this._Engine = Matter.Engine;
        // this._World = Matter.World;
        // public Body : Matter.Body;
        // public Bodies : Matter.Bodies;
        // public Composites : Matter.Composites;
        // public Constraint : Matter.Constraint;
        // public Events : Matter.Events;
        // public Query : Matter.Query;
        
        // var engine = this._Engine.create();
        this.makeTest();
    }
    
    public makeTest() : void {
        
        
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 600;

        document.body.appendChild(canvas);

        // this.render();
       
    }
    
    // public render() : void{
        
    //         var bodies = this._Bodies(this._Engine.world);

    //         window.requestAnimationFrame(render);

    //         context.fillStyle = '#fff';
    //         context.fillRect(0, 0, canvas.width, canvas.height);

    //         context.beginPath();

    //         for (var i = 0; i < bodies.length; i += 1) {
    //             var vertices = bodies[i].vertices;

    //             context.moveTo(vertices[0].x, vertices[0].y);

    //             for (var j = 1; j < vertices.length; j += 1) {
    //                 context.lineTo(vertices[j].x, vertices[j].y);
    //             }

    //             context.lineTo(vertices[0].x, vertices[0].y);
    //         }

    //         context.lineWidth = 1;
    //         context.strokeStyle = '#999';
    //         context.stroke();
    // }

    
}