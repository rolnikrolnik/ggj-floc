class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        Phaser.Scene.call(this, { key: 'sceneMain' });
        this.counter = 0;
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

    create() {
        this.plant = new PowerPlant();
        this.powerplant = this.add.image(360, 360, 'powerplant');
        this.powerplant.displayWidth = 200;
        this.powerplant.displayHeight = 200;

        // this.pipes = this.add.group();
        // this.pipes.create(225, 365, 'rect').setDisplaySize(80, 5);
        // this.pipes.create(510, 360, 'rect').setDisplaySize(80, 5);
        // this.pipes.create(360, 215, 'rect').setDisplaySize(5, 80);
        // this.pipes.create(360, 500, 'rect').setDisplaySize(5, 80);

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
            console.log('left');
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.plant.east.toggle();
            console.log('right');
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.plant.north.toggle();
            console.log('up');
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            console.log('down');
            this.plant.south.toggle();
        }


        this.counter++;

        try {
            if (this.counter == 50) {

                this.plant.update();

                this.counter = 0;
            }
        } catch (error) {
            this.counter = 51;
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
}