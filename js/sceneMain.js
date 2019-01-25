class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.spritesheet('square', 'images/square.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('rect', 'images/pipe.png', {frameWidth: 100, frameHeight: 50});
    }
    create() {
        this.houses = this.physics.add.staticGroup();

        this.houses.create(360, 100,'square');
        this.houses.create(360, 620,'square');
        this.houses.create(100, 360,'square');
        this.houses.create(620, 360,'square');
        this.houses.create(360, 360,'square').setScale(2);
        
        this.pipes = this.physics.add.staticGroup();
        this.pipes.create(220, 360, 'rect').setDisplaySize(200, 10);
        this.pipes.create(500, 360, 'rect').setDisplaySize(200, 10);
        this.pipes.create(360, 220, 'rect').setDisplaySize(10, 200);
        this.pipes.create(360, 500, 'rect').setDisplaySize(10, 200);

        this.cursors = this.input.keyboard.createCursorKeys();
        
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
       if (this.cursors.left.isDown)
       {
        console.log('left');
       }
       else if (this.cursors.right.isDown)
       {
        console.log('right');
       }
       else if (this.cursors.up.isDown)
       {
        console.log('up');
       } else if (this.cursors.down.isDown) {
        console.log('down');
       }
    }
}