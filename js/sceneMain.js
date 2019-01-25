class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');

        this.counter = 0;
    }
    preload()
    {
        this.load.image('empty', 'images/houses/empty.png');
        this.load.image('powerplant', 'images/houses/powerplant.png');        
        this.load.image('1', 'images/houses/1.png');
        this.load.image('2', 'images/houses/2.png');
        this.load.image('3', 'images/houses/3.png');
        this.load.image('4', 'images/houses/4.png');
        this.load.image('5', 'images/houses/5.png');

        this.load.spritesheet('square', 'images/square.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('rect', 'images/pipe.png', {frameWidth: 100, frameHeight: 50});
    }
    create() {
        this.plant = new PowerPlant();
        this.powerplant = this.add.image(360, 360, 'powerplant');
        this.powerplant.displayWidth=200;
        this.powerplant.displayHeight=200;

        this.pipes = this.add.group();
        this.pipes.create(225, 365, 'rect').setDisplaySize(80, 5);
        this.pipes.create(510, 360, 'rect').setDisplaySize(80, 5);
        this.pipes.create(360, 215, 'rect').setDisplaySize(5, 80);
        this.pipes.create(360, 500, 'rect').setDisplaySize(5, 80);

        this.houses = this.add.group();
        this.plant.north.houses.forEach(h => {
            this.printHouse(h);
            this.northText = this.add.text(h.x, h.y + 50, h.temp, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        });
        this.plant.south.houses.forEach(h => {this.printHouse(h);
            this.southText = this.add.text(h.x, h.y + 50, h.temp, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        });
        this.plant.west.houses.forEach(h => {this.printHouse(h);
            this.westText = this.add.text(h.x, h.y + 50, h.temp, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        });
        this.plant.east.houses.forEach(h => {this.printHouse(h);
            this.eastText = this.add.text(h.x, h.y + 50, h.temp, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
                    }            );

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
       this.plant.south.houses.forEach(h => this.southText.setText(h.temp));
       this.plant.north.houses.forEach(h => this.northText.setText(h.temp));
       this.plant.east.houses.forEach(h => this.eastText.setText(h.temp));
       this.plant.west.houses.forEach(h => this.westText.setText(h.temp));
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150,150);
    }
}