class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load images / sounds

        this.load.image("face", "images/face.png")
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
        //this.face.setInteractive();
        //this.face.on('pointerdown',this.onDown,this);
        //this.face.on('pointerup',this.onUp,this);

        /*
        this.char = this.add.sprite(0,game.config.height/2,"boy");
        var frameNames= this.anims.generateFrameNumbers('boy');
        this.anims.create({
            key: 'walk',
            frames: frameNames,
            frameRate: 16,
            repeat: -1 //w nieskonczonosc
        });

        this.char.play("walk");
        this.doWalk();
        */

        this.text1=this.add.text(200,300,"ALE fajny FONT!",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.text1.setOrigin(0.5,0.5);
        // a tu macie do tworzenia tekstow: 
        // https://phasergames.com/phaser-3-text-designer-tool/

        this.graphics=this.add.graphics();
        this.graphics.lineStyle(8,0xff0000);
        this.graphics.fillStyle(0xff00ff,.5);
        //this.graphics.moveTo(0,0);
        //this.graphics.lineTo(100,300);
        //this.graphics.strokeRect(100,200,50,50);
        //this.graphics.strokeCircle(100,200,60);
        this.graphics.fillCircle(100,200,60);
        //this.graphics.strokePath();

    }
    onUp()
    {
        this.face.alpha=1;
    }
    onDown()
    {
        this.face.alpha=0.5;
    }
    doWalk(){
        this.tweens.add({
            targets: this.char,
            duration: 5000,
            x:game.config.width,
            y:0,
            alpha:0,
            onComplete:this.onCompleteHandler.bind(this)
        });
    }
    onCompleteHandler(tween, targets, custom)
    {
        var char=targets[0];
        char.x=0;
        char.y=game.config.height/2;
        char.alpha=1;
        this.doWalk();
    }
    update() {
        //constant running loop

        /*
        this.char.x+=5; //bedzie se lazl do przodu
        if (this.char.x>game.config.width)
        {
            this.char.x=0;
        }
        */
    }
}