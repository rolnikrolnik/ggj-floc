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

        this.drawLine(185, 365, 265, 365, west ? RED : GREY);
        this.drawLine(470, 365, 550, 365, east ? RED : GREY);
        this.drawLine(365, 175, 365, 255, north ? RED : GREY);
        this.drawLine(365, 460, 365, 540, south ? RED : GREY);
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
        rect.fillRect(0, -height, width, height);
    }

    create() {
        this.counter = 0;

        this.plant = new PowerPlant();
        this.powerplant = this.add.image(360, 360, 'powerplant');
        this.powerplant.displayWidth = 200;
        this.powerplant.displayHeight = 200;

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(20, 20, `Day ${1}, hours: ${0}, mins: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.pipes = this.add.graphics();

        this.houses = this.add.group();
        this.plant.north.houses.forEach(h => this.printHouse(h));
        this.plant.south.houses.forEach(h => {
            this.printHouse(h);
        });
        this.plant.west.houses.forEach(h => {
            this.printHouse(h);
        });
        this.plant.east.houses.forEach(h => {
            this.printHouse(h);
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

        this.plant.south.houses.forEach(h => this.drawRect(h.thermometer, RED, 10, h.temp*150/100));
        this.plant.north.houses.forEach(h => this.drawRect(h.thermometer, RED, 10, h.temp*150/100));
        this.plant.east.houses.forEach(h => this.drawRect(h.thermometer, RED, 10, h.temp*150/100));
        this.plant.west.houses.forEach(h => this.drawRect(h.thermometer, RED, 10, h.temp*150/100));

        this.drawPipes(...this.plant.directions.map(direction => direction.isOpen));
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150, 150);
        var termGrey = this.add.graphics({ x: house.x + 89, y: house.y + 75});
        this.drawRect(termGrey, GREY, 12, 150);
        
        house.createThermometer(this.add.graphics({ x: house.x + 90, y: house.y + 75}));
        this.drawRect(house.thermometer, RED, 10, 150*house.temp/100);
    }

    updateTime() {  
        this.timing++;
        this.drawTime(calculateTime(this.timing));
    }

    drawTime(time) {
        this.timerDisplay.setText(`Day ${time.days}, hours: ${time.hours}, mins: ${time.minutes}`);
    }
}