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
    }

    drawPipes(north, south, west, east) {
        this.pipes.clear();

        this.drawLine(MOVE_ALL_X + 185, 365, MOVE_ALL_X + 265, 365, west ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 470, 365, MOVE_ALL_X + 550, 365, east ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 365, 175, MOVE_ALL_X + 365, 255, north ? RED : GREY);
        this.drawLine(MOVE_ALL_X + 365, 460, MOVE_ALL_X + 365, 540, south ? RED : GREY);
    }

    drawLine(xstart, ystart, xstop, ystop, color) {
        this.pipes.lineStyle(5, color, 1.0);
        this.pipes.beginPath();
        this.pipes.moveTo(xstart, ystart);
        this.pipes.lineTo(xstop, ystop);
        this.pipes.closePath();
        this.pipes.strokePath();
    }

    create() {
        this.counter = 0;

        this.plant = new PowerPlant();
        this.powerplant = this.add.image(MOVE_ALL_X + 360, 360, 'powerplant');
        this.powerplant.displayWidth = 200;
        this.powerplant.displayHeight = 200;

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(20, 20, `Dni: ${1}, godziny: ${0}, minuty: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.pipes = this.add.graphics();

        this.houses = this.add.group();
        this.plant.north.houses.forEach(h => {
            this.printHouse(h);
            h.createThermometer(this.add.text(h.x, h.y + 50, h.temp, { fontFamily: 'ZCOOL KuaiLe', color: '#df7919', fontSize: '40px' }));
        });
        this.plant.south.houses.forEach(h => {
            this.printHouse(h);
            h.createThermometer(this.add.text(h.x, h.y + 50, h.temp, { fontFamily: 'ZCOOL KuaiLe', color: '#df7919', fontSize: '40px' }));
        });
        this.plant.west.houses.forEach(h => {
            this.printHouse(h);
            h.createThermometer(this.add.text(h.x, h.y + 50, h.temp, { fontFamily: 'ZCOOL KuaiLe', color: '#df7919', fontSize: '40px' }));
        });
        this.plant.east.houses.forEach(h => {
            this.printHouse(h);
            h.createThermometer(this.add.text(h.x, h.y + 50, h.temp, { fontFamily: 'ZCOOL KuaiLe', color: '#df7919', fontSize: '40px' }));
        });

        this.cursors = this.input.keyboard.createCursorKeys();
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
            localStorage.setItem('currentScore', this.timing);
            this.scene.start('sceneGameOver');
        }

        this.plant.south.houses.forEach(h => h.thermometer.setText(h.temp));
        this.plant.north.houses.forEach(h => h.thermometer.setText(h.temp));
        this.plant.east.houses.forEach(h => h.thermometer.setText(h.temp));
        this.plant.west.houses.forEach(h => h.thermometer.setText(h.temp));

        this.drawPipes(...this.plant.directions.map(direction => direction.isOpen));
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150, 150);
    }

    updateTime() {
        this.timing++;
        this.drawTime(calculateTime(this.timing));
    }

    drawTime(time) {
        this.timerDisplay.setText(`Dni: ${time.days}, godziny: ${time.hours}, minuty: ${time.minutes}`);
    }
}