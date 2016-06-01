// /// <reference path="units/polarBear.ts"/>
// // <reference path="../typings/matter-js.d.ts"/>
// var Engine = Matter.Engine;
// class matter{
//     private engine;
//     private render;
//     private Bear : polarBear;
//     private body : HTMLElement;
    
//     constructor(){
//         this.setupMatter();
//         this.addElements();
        
//     }
    
//     setupMatter(){
//         var body = document.querySelector("body");
//         this.engine = Engine.create();
//         // Matter.Engine.
//         // create a renderer
//         // this.render = Matter.Render.create({
//         //     engine: this.engine
//         // });
//         this.body = document.body;
//         this.render = Matter.Render.create({
//             element: this.body,   
//             engine: this.engine        
//         });

//         this.addPhysicsObject(this.engine.world);


//         // create two boxes and a ground
//         var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
//         var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
//         var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//         Matter.World.add(this.engine.world,[boxA, boxB, ground]);
//         // this.addPhysicsObject([boxA, boxB, ground]);
//         //this.addPhysicsObject(boxA);
//         //this.addPhysicsObject(boxB);
        

//         // run the engine
//         Matter.Engine.run(this.engine);

//         // run the renderer
//         Matter.Render.run(this.render);
//     }
    
//     public addPhysicsObject(arr):void {
//         Matter.World.add(this.engine.world, arr);
//     }
    
//     addElements():void {
//         this.Bear = new polarBear(this);        
//     }
        
// } 