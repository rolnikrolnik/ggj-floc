class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load images / sounds

        //this.load.image("face", "images/face.png")
        this.load.spritesheet('boy', 'images/boy.png', { frameWidth: 120, frameHeight: 200 });
    }
    create() {
        //define objects

        //this.face = this.add.image(100, 200, "face");
        //this.face.setOrigin(0,0) // gorny lewy rog
        //this.face.alpha=.5; //przezroczystosc (0 -1)
        //this.face.angle=45; //obrot
        //this.face.scaleX=.5 //zmniejszenie (0-1)
        //this.face.scaleY=.5 //zmniejszenie (0-1)
        //this.face.displayWidth=100
        //this.face.displayHeight=100

        this.char = this.add.sprite(game.config.width/2,game.config.height/2,"boy");
        var frameNames= this.anims.generateFrameNumbers('boy');
        this.anims.create({
            key: 'walk',
            frames: frameNames,
            frameRate: 16,
            repeat: -1 //w nieskonczonosc
        });

        this.char.play("walk");
    }
    update() {
        //constant running loop

        this.char.x+=5; //bedzie se lazl do przodu
        if (this.char.x>game.config.width)
        {
            this.char.x=0;
        }
    }
}