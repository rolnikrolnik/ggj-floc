class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');

        this.counter = 0;
    }
    preload()
    {
        this.load.image("empty", "images/houses/empty.png");
        this.load.image("powerplant", "images/houses/powerplant.png");        
        this.load.image("1", "images/houses/1.png");
        this.load.image("2", "images/houses/2.png");
        this.load.image("3", "images/houses/3.png");
        this.load.image("4", "images/houses/4.png");
        this.load.image("5", "images/houses/5.png");

        this.load.spritesheet('square', 'images/square.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('rect', 'images/pipe.png', {frameWidth: 100, frameHeight: 50});
    }
    create() {
        this.plant = new PowerPlant();

        this.powerplant = this.add.image(360, 360, "powerplant");
        this.powerplant.displayWidth=200;
        this.powerplant.displayHeight=200;

        this.house1 = this.add.image(100, 360, "1");
        this.house1.displayWidth=150;
        this.house1.displayHeight=150;

        this.house2 = this.add.image(360, 620, "2");
        this.house2.displayWidth=150;
        this.house2.displayHeight=150;

        this.house5 = this.add.image(360, 100, "4");
        this.house5.displayWidth=150;
        this.house5.displayHeight=150;

        this.house5 = this.add.image(620, 360, "5");
        this.house5.displayWidth=150;
        this.house5.displayHeight=150;
        
        this.pipes = this.physics.add.staticGroup();
        this.pipes.create(225, 365, 'rect').setDisplaySize(80, 5);
        this.pipes.create(510, 360, 'rect').setDisplaySize(80, 5);
        this.pipes.create(360, 215, 'rect').setDisplaySize(5, 80);
        this.pipes.create(360, 500, 'rect').setDisplaySize(5, 80);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursor = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        }
        
    }
    onUp()
    {
        
    }
    onDown()
    {
        
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

        //http://labs.phaser.io/edit.html?src=src/input/keyboard/just%20down.js
       if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
       {
        this.plant.west.toggle();
        console.log('left');
       }
       else if (Phaser.Input.Keyboard.JustDown(this.cursors.right))
       {
        this.plant.east.toggle();
        console.log('right');
       }
       else if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
       {
           this.plant.north.toggle();
        console.log('up');
       } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        console.log('down');
        this.plant.south.toggle();
       }


       this.counter++;
       
       try {
        if (this.counter == 20) {

            this.plant.update();
    
            this.counter = 0;
           }
       }
       catch(error) {
            console.log(error);
            this.counter = 21;
       }
    }
}