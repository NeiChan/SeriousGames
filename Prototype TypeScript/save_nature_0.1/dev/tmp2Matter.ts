// global window shortcuts maken zodat je niet steeds Matter. hoeft te typen
// var Engine = Matter.Engine,
//     World = Matter.World,
//     Render = Matter.Render,
//     Body = Matter.Body,
//     Bodies = Matter.Bodies,
//     Constraint = Matter.Constraint,
//     Composites = Matter.Composites,
//     MouseConstraint = Matter.MouseConstraint;

// class Game {
//     private engine;
//     private render;
    
//     static soundmanager: SoundsManager;
//     private assets      : AssetsManager = new AssetsManager();

//     // private sounds      : SoundsManager = new SoundsManager(); 
    
//     public objectList:any = [];

//     // Get class player
//     private _background  : Background;
//     private _bear        : polarBear;
//     private _bush        : testSubject;
//     // private _score       : Score;

//     private context     : CanvasRenderingContext2D;
//     private canvas      : HTMLElement;

//     // constructor for Main
//     constructor() {
//          Game.soundmanager = new SoundsManager("soundfile")
//         // call createPlayer() function
//         //  console.log(Game.soundmanager.soundMarkers);
//         this.canvas = document.getElementsByTagName('body')[0];
//         // this.context = this.canvas.getContext('2d');

//         // Ophalen van de polarbear-spritesheet uit de AssetsManager
//         // var backgroundImg   = this.assets.greenBG;
//         // var bearImg         = this.assets.polarbear;
//         // var bushImg         = this.assets.desObjects.Bush1;

//         // // Aanmaken van een polarBear
//         // this._background    = new Background({ imgSrc: backgroundImg, x: 0, y: 0});
//         // this._bear          = new polarBear({ imgSrc: bearImg, frameWidth: 50, frameHeight: 50, maxFrame: 3, animationSpeed: 10, x: 80, y: 500, speed: 3 });
//         // this._bush          = new testSubject({ imgSrc: bushImg, x: 150, y: 530, frameHeight: 145, frameWidth: 80 });
//         // // this._score          = new Score({ imgSrc: bushImg, x: 350, y: 530, frameHeight: 145, frameWidth: 80 });

//         // this.objectList.push(this._background);
//         // this.objectList.push(this._bush);
//         // // this.objectList.push(this._score);
//         // this.objectList.push(this._bear);

//         // Request animation, replaces an update() function so it can run at 60 fps
//         // requestAnimationFrame(() => this.update());
//         var content = document.getElementById('content');
//         var div = utility.createDiv('divver');
//         div = test.addSoundEvent(div, 'game_over');
//         content.appendChild(div);
        
//         this.setupMatter();
//         // this.addElements();
//     }

    
//     setupMatter(){
//         this.engine = Engine.create();
//         // create a renderer
//         this.render = Matter.Render.create({
//             element: this.canvas,
//             engine: this.engine
//         });
        
//         var mouseConstraint = MouseConstraint.create(this.engine);
//         World.add(this.engine.world, mouseConstraint);
        
//         // this.addPhysicsObject(this.engine.world);


//         // create two boxes and a ground
//         var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
//         var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
//         var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//         World.add(this.engine.world,[boxA, boxB, ground]);
//         this.addPhysicsObject([boxA, boxB, ground]);
//         //this.addPhysicsObject(boxA);
//         //this.addPhysicsObject(boxB);
        

//         // run the engine
//         Engine.run(this.engine);

//         // run the renderer
//         Render.run(this.render);
//     }
    
//     public addPhysicsObject(arr):void {
//         World.add(this.engine.world, arr);
//     }
    
//     addElements():void {
//         // this.ball = new Ball(this);        
//     }
        
// } 