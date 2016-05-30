
class physyics2d{
    // public gravity : any;
    // public world : any;
    
    // public constructor(){
        
    //     this.gravity = new PhysicsType2d.Vector2(0.0, -9.78);
    //     this.world = new PhysicsType2d.Dynamics.World(this.gravity);
    //     this.doSomething();
    // }
    
    // public doSomething() : void{
    //     // console.log("Ola");
        
    //     var groundDefinition = new PhysicsType2d.Dynamics.BodyDefinition();
    //     groundDefinition.type = PhysicsType2d.Dynamics.BodyType.STATIC;
    //     var ground = this.world.CreateBody(groundDefinition);
    //     var groundShape = new PhysicsType2d.Collision.Shapes.EdgeShape();
    //     groundShape.Set(
    //         new PhysicsType2d.Vector2(-50.0, 0.0), 
    //         new PhysicsType2d.Vector2(50.0, 0.0));
    //     ground.CreateFixture(groundShape, 0.0);
        
    //     var boxShape = new PhysicsType2d.Collision.Shapes.PolygonShape();
    //     boxShape.SetAsBoxAtOrigin(0.5, 0.5);
    //     var bd = new PhysicsType2d.Dynamics.BodyDefinition();
    //     bd.type = PhysicsType2d.Dynamics.BodyType.DYNAMIC;
    //     bd.position = new PhysicsType2d.Vector2(0, 11);
                    
    //     var boxBody = this.world.CreateBody(bd);
    //     var fd = new PhysicsType2d.Dynamics.FixtureDefinition();
    //     fd.shape = boxShape;
    //     fd.density = 1.0;
    //     fd.friction = 0.3;
    //     boxBody.CreateFixtureFromDefinition(fd);
        
    //     var timeStep = 1/60; // Simulate 60 steps per second
    //     var velocityIterations = 8; // Number of iterations the velocity solver will use
    //     var positionIterations = 3; // Number of iterations the position solver will use
    //     this.world.Step(timeStep, velocityIterations, positionIterations);
    // }
}