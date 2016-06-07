/// <reference path="interfaces/ICollidable.ts"/>
/// <reference path="../typings/matter.d.ts"/>



class Game{
    
    static soundmanager: SoundsManager;
    private assets      : AssetsManager = new AssetsManager();
    
    public objectList:any = [];
    
    constructor(){
        Game.soundmanager = new SoundsManager("soundfile");
        
        this.createGame();
        
        var content = document.getElementById('content');
        var div = utility.createDiv('divver');
        div = test.addSoundEvent(div, 'game_over');
        content.appendChild(div);
    }
    
    // http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library
    // http://brm.io/matter-js/docs/classes/Body.html#properties
    
    // https://github.com/liabru/matter-js/blob/master/src/constraint/MouseConstraint.js#L82-L108
    // http://stackoverflow.com/questions/28324303/matter-js-mouse-click-on-body
    // http://brm.io/matter-js/docs/classes/Events.html
    
    public createGame(){
        // Matter module aliases
        var Engine = Matter.Engine,
            World = Matter.World,
            Body = Matter.Body,
            Common = Matter.Common,
            Bodies = Matter.Bodies,
            Constraint = Matter.Constraint,
            Composites = Matter.Composites,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Mouse = Matter.Mouse;
        var _sceneEvents = [],
            _mouseConstraint;
            
        // create a Matter.js engine
        var engine = Engine.create(document.body, {
        render: {
            options: {
            wireframes: false,
            background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-bk2.jpg'
            }
        }
        });
        
        var offset = 10,
            options = { 
                isStatic: true,
                render: {
                    visible: false
                }
            };

        engine.world.bodies = [];

        // add a mouse controlled constraint
        _mouseConstraint = MouseConstraint.create(engine);
        World.add(engine.world, _mouseConstraint);

        World.add(engine.world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        ]);

        var stack = Composites.stack(20, 20, 10, 4, 0, 0, function(x, y) {
            if (Common.random() > 0.35) {
                var body = Bodies.rectangle(x, y, 64, 64, {
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                            texture: 'http://brm.io/matter-js-demo-master/img/box.png'
                        }
                    }
                });
                
                // body = test.addSoundEvent(body, 'game_over');
                // content.appendChild(body);
                return body;
            } else {
                return Bodies.circle(x, y, 46, {
                    density: 0.0005,
                    frictionAir: 0.06,
                    restitution: 0.3,
                    friction: 0.01,
                    render: {
                        sprite: {
                            texture: 'http://brm.io/matter-js-demo-master/img/ball.png'
                        }
                    }
                });
            }
        });

        World.add(engine.world, stack);

        // console.log(stack);
        
        Events.on(engine, 'tick', function() {
            var allBodies = Composite.allBodies(engine.world);
            Matter.MouseConstraint.update(_mouseConstraint, allBodies);
            _triggerEvents(_mouseConstraint);
            
            console.log(_mouseConstraint.mouse.position);
            
            
        });

        var renderOptions = engine.render.options;
        renderOptions.background = 'http://brm.io/matter-js-demo-master/img/wall-bg.jpg';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;

        


        // // some settings
        // var offset = 30,
        //     wallOptions = { 
        //     isStatic: true
        //     };

       
       
        // add some invisible some walls to the world
        // World.add(engine.world, [
        // Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, wallOptions),
        // Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, wallOptions),
        // Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, wallOptions),
        // Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, wallOptions)
        // ]);

        // //create a stack
        // var stack = Composites.stack(6, 6, 12, 4, 0, 0, function(x, y, column, row) {
        
        // if (Math.random() > 0.5) {
        //     return Bodies.rectangle(x, y, 64, 64, {
        //     render: {
        //         sprite: {
        //         texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-blue.png'
        //         }
        //     }
        //     });
        // } else if (Math.random() > 0.9) {
        //     return Bodies.rectangle(x, y, 64, 64, {
        //     render: {
        //         sprite: {
        //         texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-red.png'
        //         }
        //     }
        //     });
        // } else if  (Math.random() > 0.7) {
        //     return Bodies.circle(x, y, 46, {
        //     density: 0.0005,
        //     frictionAir: 0.06,
        //     restitution: 0.3,
        //     friction: 0.06,
        //     render: {
        //         sprite: {
        //         texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape-green.png'
        //         }
        //     }
        //     });
        // } else {
        //     return Bodies.circle(x, y, 46, {
        //     density: 0.0005,
        //     frictionAir: 0.06,
        //     restitution: 0.3,
        //     friction: 0.06,
        //     render: {
        //         sprite: {
        //         texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape.png'
        //         }
        //     }
        //     });
        // }
        // });

        // add the stack to the world
        // World.add(engine.world, stack);
        
        // run the engine
        Engine.run(engine);
        
        Events.on(engine, 'mousedown', function(event) {
            var mousePosition = event.mouse.position;    

            console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
        })
        
        var _triggerEvents = function(mouseConstraint) {
            var mouse = mouseConstraint.mouse,
                mouseEvents = mouse.sourceEvents;
                console.log(mouseEvents);

            if (mouseEvents.mousemove){
                Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });
                console.log("ya");
            }

            if (mouseEvents.mousedown){
                Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });
                console.log("ya");
            }
            if (mouseEvents.mouseup){
                Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });
            }
            // reset the mouse state ready for the next step
            Mouse.clearSourceEvents(mouse);
        };
        
        console.log(_mouseConstraint.mouse.sourceEvents);
    }


}