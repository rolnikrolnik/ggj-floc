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

        this.load.spritesheet('square', 'images/square.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('rect', 'images/pipe.png', { frameWidth: 100, frameHeight: 50 });

        this.thermometersId = [];
    }

    drawPipes(north, south, west, east) {
        this.pipes.clear();

        this.drawLine(MOVE_ALL_X + 205, 365, MOVE_ALL_X + 265, 365, west ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 470, 365, MOVE_ALL_X + 550, 365, east ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 365, 175, MOVE_ALL_X + 365, 255, north ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 365, 490, MOVE_ALL_X + 365, 540, south ? RED : GREY);
    }

    drawLine(xstart, ystart, xstop, ystop, color) {
        this.pipes.lineStyle(5, color, 1.0);
        this.pipes.beginPath();
        this.pipes.moveTo(xstart, ystart);
        this.pipes.lineTo(xstop, ystop);
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
        this.powerplant = this.add.image(MOVE_ALL_X + 360, 360, 'powerplant');
        this.powerplant.displayWidth = 200;
        this.powerplant.displayHeight = 200;
        
        var termGrey = this.add.graphics({x: MOVE_ALL_X + 260, y: 479});
        this.drawRect(termGrey, GREY, 200, 12);
        this.plant.healthIndicator = this.add.graphics({x: MOVE_ALL_X + 260, y: 480})
        this.drawRect(this.plant.healthIndicator, RED, 200, 10)
    }
    create() {
        this.counter = 0;

        this.createPlant();

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(20, 20, `Dni: ${1}, godziny: ${0}, minuty: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.pipes = this.add.graphics();
        this.printHouses();

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    makeGradientLine(x, y) {
        const thermometerId = `${x}${y}`;
        this.thermometersId.push(thermometerId);
        var texture = this.textures.createCanvas(thermometerId, 10, 150); // wielkosc canvasa
        var context = texture.getContext();
        var grd = context.createLinearGradient(0, 0, 10, 180);    // ERROR LINE
        
        grd.addColorStop(0, '#ff2323');
        grd.addColorStop(1, '#2ed3f4');
        
        context.fillStyle = grd;
        context.fillRect(0, 0, game.config.width, game.config.height);
        
        texture.refresh();

        this.add.image(x, y, thermometerId); // pos

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

        this.updateThermometers();

        this.drawPipes(...this.plant.directions.map(direction => direction.isOpen));
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150, 150);
        this.makeGradientLine(house.x + 89, house.y);
        
        house.createThermometer(this.add.graphics({ x: house.x + 84, y: house.y - 75}));
        this.drawRect(house.thermometer, GREY, 10, 150*house.temp/100);
    }

    updateThermometers(){
        this.plant.south.houses.forEach(h => this.drawRect(h.thermometer, GREY, 10, 150 - h.temp*150/100));
        this.plant.north.houses.forEach(h => this.drawRect(h.thermometer, GREY, 10, 150 - h.temp*150/100));
        this.plant.east.houses.forEach(h => this.drawRect(h.thermometer, GREY, 10, 150 - h.temp*150/100));
        this.plant.west.houses.forEach(h => this.drawRect(h.thermometer, GREY, 10, 150 - h.temp*150/100));
        this.drawRect(this.plant.healthIndicator, RED, this.plant.health*200/100, 10);
    }

    updateTime() {  
        this.timing++;
        this.drawTime(calculateTime(this.timing));
    }

    drawTime(time) {
        this.timerDisplay.setText(`Dni: ${time.days}, godziny: ${time.hours}, minuty: ${time.minutes}`);
    }
}