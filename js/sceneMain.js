class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');

        this.counter = 0;
    }
    preload()
    {
        this.load.image("empty", "images/houses/empty.png");
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

        this.house1 = this.add.image(100, 360, "1");
        this.house1.displayWidth=150;
        this.house1.displayHeight=150;

        this.houses = this.physics.add.staticGroup();

        this.houses.create(360, 100,'square');
        this.houses.create(360, 620,'square');
        //this.houses.create(100, 360,'square');
        this.houses.create(620, 360,'square');
        this.houses.create(360, 360,'square').setScale(2);
        
        this.pipes = this.physics.add.staticGroup();
        this.pipes.create(250, 365, 'rect').setDisplaySize(120, 5);
        this.pipes.create(500, 360, 'rect').setDisplaySize(200, 10);
        this.pipes.create(360, 220, 'rect').setDisplaySize(10, 200);
        this.pipes.create(360, 500, 'rect').setDisplaySize(10, 200);

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
        console.log('left');
       }
       else if (Phaser.Input.Keyboard.JustDown(this.cursors.right))
       {
        console.log('right');
       }
       else if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
       {
        console.log('up');
       } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        console.log('down');
       }


       this.counter++;
       console.log(this.counter);
       
       if (this.counter == 100) {

        this.plant.update();

        this.counter = 0;
       }
    }
}