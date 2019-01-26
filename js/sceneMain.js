class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        Phaser.Scene.call(this, { key: 'sceneMain' });
    }
    preload() {
        this.load.image('empty', 'images/houses/empty.png');
        this.load.image('powerplant', 'images/houses/powerplant.png');
        this.load.image('1', 'images/houses/1.png');
        this.load.image('2', 'images/houses/2.png');
        this.load.image('3', 'images/houses/3.png');
        this.load.image('4', 'images/houses/4.png');
        this.load.image('5', 'images/houses/5.png');
        this.thermometersId = [];

        this.load.spritesheet('ice', 'images/ice.png', { frameWidth: 100, frameHeight: 135 });
        this.load.spritesheet('fire', 'images/fire.png', { frameWidth: 100, frameHeight: 135 });
    }

    // drawPipes(north, south, west, east) {
    //     this.pipes.clear();

    //     this.drawLine(MOVE_ALL_X + 205, MOVE_ALL_Y + 365, MOVE_ALL_X + 265, MOVE_ALL_Y + 365, west ? RED : GREY);
    //     this.drawLine(MOVE_ALL_X + 470, MOVE_ALL_Y + 365, MOVE_ALL_X + 550, MOVE_ALL_Y + 365, east ? RED : GREY);
    //     this.drawLine(MOVE_ALL_X + 365, MOVE_ALL_Y + 175, MOVE_ALL_X + 365, MOVE_ALL_Y + 255, north ? RED : GREY);
    //     this.drawLine(MOVE_ALL_X + 365, MOVE_ALL_Y + 490, MOVE_ALL_X + 365, MOVE_ALL_Y + 540, south ? RED : GREY);
    // }

    drawLine(xstart, ystart, xstop, ystop, color) {
        this.pipes.lineStyle(5, color, 1.0);
        this.pipes.beginPath();
        this.pipes.moveTo(xstart, ystart, -10);
        this.pipes.lineTo(xstop, ystop, -10);
        this.pipes.closePath();
        this.pipes.strokePath();
    }

    drawRect(rect, color, width, height) {
        rect.clear();
        rect.fillStyle(color, 1);
        rect.fillRect(0, 0, width, height);
    }

    printHouses(){
        this.houses = this.add.group();
        this.plant.north.houses.forEach(h => this.printHouse(h));
        this.plant.south.houses.forEach(h => this.printHouse(h));
        this.plant.west.houses.forEach(h => this.printHouse(h));
        this.plant.east.houses.forEach(h => this.printHouse(h));
    }

    createPlant(){
        this.plant = new PowerPlant();
        this.powerplant = this.add.image(this.plant.x, this.plant.y, 'powerplant');
        this.powerplant.displayWidth = 200;
        this.powerplant.displayHeight = 200;
        
        this.drawRect(this.add.graphics({x: this.plant.x - 100 - 1, y: this.plant.y + 120 - 2}), WHITE, 202, 14 );
        var termGrey = this.add.graphics({x: this.plant.x - 100, y: this.plant.y + 119});
        this.drawRect(termGrey, GREY, 200, 12);
        this.plant.healthIndicator = this.add.graphics({x: this.plant.x - 100, y: this.plant.y + 120 })
        this.drawRect(this.plant.healthIndicator, RED, 200, 10)
    }
    create() {
        this.counter = 0;

        this.createPlant();

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(20, 20, `Dni: ${0}, godziny: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.pipes = this.add.graphics();
        this.printHouses();
        this.makeWungiel();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.ice = this.add.sprite(1100,100,'ice');
        var frameNames= this.anims.generateFrameNumbers('ice');
        this.anims.create({
            key: 'animateIce',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });
        this.ice.play('animateIce');

        this.fire = this.add.sprite(1200,100,'fire');
        var frameNames= this.anims.generateFrameNumbers('fire');
        this.anims.create({
            key: 'animateFire',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });
        this.fire.play('animateFire');
    }

    makeWungiel() {
        this.wungiel = 3;
        this.wungielDisplay = this.add.text(0, 100, `Chopie, mosz ${this.wungiel} holdy wungla`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'30px'});
        this.wungielButtonDisplay = this.add.text(0, 130, `Ciepnij spacje i dopierdziel do pieca`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'20px'});
    }

    makeGradientLine(x, y) {
        this.drawRect(this.add.graphics({x: x - 6, y: y - 76}), WHITE, 12, 152 );

        const thermometerId = `${x}${y}`;
        this.thermometersId.push(thermometerId);
        var texture = this.textures.createCanvas(thermometerId, 10, 150); // wielkosc canvasa
        var context = texture.getContext();
        var grd = context.createLinearGradient(0, 0, 10, 180);    // ERROR LINE
        
        grd.addColorStop(0, '#CE2029');
        grd.addColorStop(1, '#006bce');
        
        context.fillStyle = grd;
        context.fillRect(0, 0, game.config.width, game.config.height);
        
        texture.refresh();

        this.add.image(x, y, thermometerId); // pos

    }

    useWungiel() {
        if (this.wungiel > 0) {
            this.wungiel--;    
            this.plant.health+=30;
            this.updateWungiel();
        }
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.plant.west.toggle();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.plant.east.toggle();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.plant.north.toggle();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.plant.south.toggle();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.useWungiel();
        }

        this.counter++;

        try {
            if (this.counter == GAME_SPEED) {

                this.plant.update();

                this.counter = 0;
            }
        } catch (error) {
            this.counter = 51;
            clearInterval(this.timer);
            localStorage.setItem(CURRENT_SCORE, this.timing);
            this.scene.start('sceneGameOver');
            this.thermometersId.forEach(thermometerId => {
                this.textures.remove(thermometerId);
            })
        }
        this.pipes.clear();

        this.updateHouses();

        // this.drawPipes(...this.plant.directions.map(direction => direction.isOpen));
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150, 150);
        this.makeGradientLine(house.x + 89, house.y);
        
        house.createThermometer(this.add.graphics({ x: house.x + 84, y: house.y - 75}));
        this.drawRect(house.thermometer, GREY, 10, 150*house.temp/100);

    }

    updateHouses(){
        this.plant.south.houses.forEach(house =>
        {
            this.updateHouse(house);
            this.drawLine(this.plant.x , this.plant.y + 140, house.x, house.y - 75, house.isOpen ? RED : GREY);
        });
        this.plant.north.houses.forEach(house =>
        {
            this.updateHouse(house);
            this.drawLine(this.plant.x , this.plant.y - 100, house.x, house.y + 75, house.isOpen ? RED : GREY);
        });
        this.plant.east.houses.forEach(house =>
        {
            this.updateHouse(house);
            this.drawLine(this.plant.x + 100 , this.plant.y, house.x - 75, house.y, house.isOpen ? RED : GREY);
        });
        this.plant.west.houses.forEach(house =>
            {
                this.updateHouse(house);
                this.drawLine(this.plant.x - 100 , this.plant.y, house.x + 100, house.y, house.isOpen ? RED : GREY);
            });
        this.drawRect(this.plant.healthIndicator, RED, this.plant.health*200/100, 10);
    }

    updateHouse(house){
        this.drawRect(house.thermometer, BLACK, 10, 150 - house.temp*150/100);
    }

    updateTime() {  
        this.timing++;
        this.drawTime(calculateTime(this.timing));
    }

    drawTime(time) {
        this.timerDisplay.setText(`Dni: ${time.days}, godziny: ${time.hours}`);
    }

    updateWungiel() {
        this.wungielDisplay.setText(`Mosz ${this.wungiel} holdy wungla`);
    }
}