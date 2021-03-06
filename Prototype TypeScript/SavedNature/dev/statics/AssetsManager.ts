class AssetsManager {
    // players
    public polarbear = "images/polarbear/spritesheet.png";

    // ***************** Levels
    private desertBase = "images/levels/desert/";
    private greenBase = "images/levels/green/";
    private winterBase = "images/levels/winter/";

    // ***************** Collectables
    private collectBase = "images/collectables/";
    private collectCoins = this.collectBase + "coins/";

    // Desert level
    public desBG = this.desertBase + "BG.png";

    public desTiles = [
        this.desertBase + "Tiles/1.png",
        this.desertBase + "Tiles/2.png",
        this.desertBase + "Tiles/3.png",
        this.desertBase + "Tiles/4.png",
        this.desertBase + "Tiles/5.png",
        this.desertBase + "Tiles/6.png",
        this.desertBase + "Tiles/7.png",
        this.desertBase + "Tiles/8.png",
        this.desertBase + "Tiles/9.png",
        this.desertBase + "Tiles/10.png",
        this.desertBase + "Tiles/11.png",
        this.desertBase + "Tiles/12.png",
        this.desertBase + "Tiles/13.png",
        this.desertBase + "Tiles/14.png",
        this.desertBase + "Tiles/15.png",
        this.desertBase + "Tiles/16.png",
    ];

    public desObjects = {
        Bush1 : this.desertBase + "Objects/Bush1.png",
        Bush2 : this.desertBase + "Objects/Bush2.png",
        Cactus1 : this.desertBase + "Objects/Cactus1.png",
        Cactus2 : this.desertBase + "Objects/Cactus2.png",
        Cactus3 : this.desertBase + "Objects/Cactus3.png",
        Crate : this.desertBase + "Objects/Crate.png",
        Grass1 : this.desertBase + "Objects/Grass1.png",
        Grass2 : this.desertBase + "Objects/Grass2.png",
        Sign : this.desertBase + "Objects/Sign.png",
        SignArrow : this.desertBase + "Objects/SignArrow.png",
        Skeleton : this.desertBase + "Objects/Skeleton.png",
        Stone : this.desertBase + "Objects/Stone.png",
        StoneBlock : this.desertBase + "Objects/StoneBlock.png",
    };

    // Green level
    public greenBG = this.greenBase + "BG2.png";

    public greenTiles = [
        this.greenBase + "Tiles/1.png",
        this.greenBase + "Tiles/2.png",
        this.greenBase + "Tiles/3.png",
        this.greenBase + "Tiles/4.png",
        this.greenBase + "Tiles/5.png",
        this.greenBase + "Tiles/6.png",
        this.greenBase + "Tiles/7.png",
        this.greenBase + "Tiles/8.png",
        this.greenBase + "Tiles/9.png",
        this.greenBase + "Tiles/10.png",
        this.greenBase + "Tiles/11.png",
        this.greenBase + "Tiles/12.png",
        this.greenBase + "Tiles/13.png",
        this.greenBase + "Tiles/14.png",
        this.greenBase + "Tiles/15.png",
        this.greenBase + "Tiles/16.png",
        this.greenBase + "Tiles/17.png",
        this.greenBase + "Tiles/18.png",
    ];

    public greenObjects = {
        Bush1 : this.greenBase + "Objects/Bush1.png",
        Bush2 : this.greenBase + "Objects/Bush2.png",
        Bush3 : this.greenBase + "Objects/Bush3.png",
        Bush4 : this.greenBase + "Objects/Bush4.png",
        Crate : this.greenBase + "Objects/Crate.png",
        Tree1 : this.greenBase + "Objects/Tree_1.png",
        Tree2 : this.greenBase + "Objects/Tree_2.png",
        Tree3 : this.greenBase + "Objects/Tree_3.png",
        Sign1 : this.greenBase + "Objects/Sign_1.png",
        Sign2 : this.greenBase + "Objects/Sign_2.png",
        Stone : this.greenBase + "Objects/Stone.png",
    };


    // Winter level
    public winterBG = this.winterBase + "BG.png";

    public winterTiles = [
        this.winterBase + "Tiles/1.png",
        this.winterBase + "Tiles/2.png",
        this.winterBase + "Tiles/3.png",
        this.winterBase + "Tiles/4.png",
        this.winterBase + "Tiles/5.png",
        this.winterBase + "Tiles/6.png",
        this.winterBase + "Tiles/7.png",
        this.winterBase + "Tiles/8.png",
        this.winterBase + "Tiles/9.png",
        this.winterBase + "Tiles/10.png",
        this.winterBase + "Tiles/11.png",
        this.winterBase + "Tiles/12.png",
        this.winterBase + "Tiles/13.png",
        this.winterBase + "Tiles/14.png",
        this.winterBase + "Tiles/15.png",
        this.winterBase + "Tiles/16.png",
        this.winterBase + "Tiles/17.png",
        this.winterBase + "Tiles/18.png",
    ];

    public winterObjects = {
        Crystal : this.winterBase + "Objects/Crystal.png",
        Crate : this.winterBase + "Objects/Crate.png",
        Tree1 : this.winterBase + "Objects/Tree_1.png",
        Tree2 : this.winterBase + "Objects/Tree_2.png",
        IceBox : this.winterBase + "Objects/IceBox.png",
        SnowMan : this.winterBase + "Objects/SnowMan.png",
        Igloo : this.winterBase + "Objects/Igloo.png",
        Stone : this.winterBase + "Objects/Stone.png",
        Sign1 : this.winterBase + "Objects/Sign_1.png",
        Sign2 : this.winterBase + "Objects/Sign_2.png",
    };

    // Collectables
    public collectables = {
        goldCoin : this.collectCoins + "goldCoin.png"
    };
}
