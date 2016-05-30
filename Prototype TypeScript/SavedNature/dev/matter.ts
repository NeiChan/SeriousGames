/// <reference path="../typings/matter-js.d.ts"/>

class matter{
    private engine;
    private render;
    // private polarBear : polarBear;
    
    constructor(){
        // this._Engine = Matter.Engine;
        // this._World = Matter.World;
        // public Body : Matter.Body;
        // public Bodies : Matter.Bodies;
        
        // public Constraint : Matter.Constraint;
        // public Events : Matter.Events;
        // public Query : Matter.Query;
        
        // var engine = this._Engine.create();
        // this.setupMatter();
        // this.addElements();
        
        this.test2();
        
    }
    
    test2():void{
        
        var canvas = document.getElementsByTagName('canvas')[0];
        var context = canvas.getContext('2d');
        
        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var World = Matter.World;
        var Bodies = Matter.Bodies;
        var Body = Matter.Body;
        var Composite = Matter.Composite;
        var Composites = Matter.Composites;
        var Constraint = Matter.Constraint;
        var MouseConstraint = Matter.MouseConstraint;
        // create a Matter.js engine
        var engine = Engine.create();

        // create a renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: '#fafafa',
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
            }
        });

        // create two boxes and a ground
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, ground]);

        // run the engine
        Engine.run(engine);

        // run the renderer
        Render.run(render);
        
        var bodies = Composite.allBodies(engine.world);

        // window.requestAnimationFrame(render);
    }
    
    // setupMatter(){
    //     var body = document.querySelector("body");
    //     this.engine = Engine.create();
    //     // create a renderer
    //     // this.render = Matter.Render.create({
    //     //     engine: this.engine
    //     // });
        
    //     this.render = Render.create({
    //         element: document.body,           
    //     });

    //     // this.addPhysicsObject(this.engine.world);


    //     // create two boxes and a ground
    //     var boxA = Bodies.rectangle(400, 200, 80, 80);
    //     var boxB = Bodies.rectangle(450, 50, 80, 80);
    //     var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    //     World.add(this.engine.world,[boxA, boxB, ground]);
    //     // this.addPhysicsObject([boxA, boxB, ground]);
    //     //this.addPhysicsObject(boxA);
    //     //this.addPhysicsObject(boxB);
        

    //     // run the engine
    //     Engine.run(this.engine);

    //     // run the renderer
    //     // Render.bind(this.render);
    // }
    
    // public addPhysicsObject(arr):void {
    //     World.add(this.engine.world, arr);
    // }
    
    // addElements():void {
    //     // this.polarBear = new polarBear(this);        
    // }
        
} 