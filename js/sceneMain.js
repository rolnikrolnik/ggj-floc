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

    drawPipes(xstart, ystart, xstop, ystop) {
        this.pipes.lineStyle(5, RED, 1.0);
        this.pipes.beginPath();
        this.pipes.moveTo(xstart, ystart);

        if (xstart > xstop){
            var tmp = xstart;
            xstart = xstop;
            xstop = tmp;
        }

        for (var i = xstart; i < xstop; i += PIPE_SIZE)
        {
            this.pipes.lineTo(i, ystart);
        }

        if (ystart > ystop){
            var tmp = ystart;
            ystart = ystop;
            ystop = tmp;
        }

        for (var i = ystart; i < ystop; i += PIPE_SIZE)
        {
            this.pipes.lineTo(xstop, i);
        }

        this.pipes.closePath();
        this.pipes.strokePath();
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
        this.gameOver = false;

        this.createPlant();

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(20, 20, `Dni: ${0}, godziny: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.pipes = this.add.graphics();
        this.printHouses();
        this.makeWungiel();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.ice = this.add.sprite(15000,100,'ice');
        var frameNames= this.anims.generateFrameNumbers('ice');
        this.anims.create({
            key: 'animateIce',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });
        this.ice.play('animateIce');

        this.fire = this.add.sprite(15000,100,'fire');
        var frameNames= this.anims.generateFrameNumbers('fire');
        this.anims.create({
            key: 'animateFire',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });
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
        if (!this.gameOver) {
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
        }

        this.counter++;

        try {
            if (this.counter == GAME_SPEED) {

                this.plant.update();

                this.counter = 0;
            }
        } catch (error) {
            this.counter = GAME_SPEED + 1;
            this.gameOver = true;

            switch (error.error) {
                case HOUSE_BURNING:
                    this.fire.x = this.plant.directions[error.index].houses[0].x;
                    this.fire.y = this.plant.directions[error.index].houses[0].y;
                    this.fire.play('animateFire');
                    break;
                case HOUSE_FROZEN:
                    this.ice.x = this.plant.directions[error.index].houses[0].x;
                    this.ice.y = this.plant.directions[error.index].houses[0].y;
                    this.ice.play('animateIce');
                    break;
                case PLANT_BURNING:
                    this.fire.x = this.plant.x;
                    this.fire.y = this.plant.y;
                    this.fire.play('animateFire');
                    break;
                case PLANT_FROZEN:
                    this.ice.x = this.plant.x;
                    this.ice.y = this.plant.y;
                    this.ice.play('animateIce');
                    break;
            }            

            clearInterval(this.timer);
            localStorage.setItem(CURRENT_SCORE, this.timing);
            //this.scene.start('sceneGameOver');
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
            this.pipes.lineStyle(5, this.plant.south.isOpen ? RED : GREY, 1.0);
            this.pipes.beginPath();

            for (var i = this.plant.y + 150; i <= house.y; i += PIPE_SIZE)
            {
                this.pipes.lineTo(this.plant.x, i);
            }

            var xstart, xstop;
            if (house.x < this.plant.x)
            {
                xstart = house.x+100;
                xstop = this.plant.x;
            }
            else{
                xstart = this.plant.x;
                xstop = house.x-100;
            }

            this.pipes.moveTo(xstart, house.y);

            for (var i = xstart; i <= xstop; i += PIPE_SIZE)
            {
                this.pipes.lineTo(i, house.y);
            }
    
            this.pipes.strokePath();
        });
        this.plant.north.houses.forEach(house =>
        {
            this.updateHouse(house);
            this.pipes.lineStyle(5, this.plant.north.isOpen ? RED : GREY, 1.0);
            this.pipes.beginPath();

            for (var i = house.y; i <= this.plant.y-100; i += PIPE_SIZE)
            {
                this.pipes.lineTo(this.plant.x, i);
            }

            var xstart, xstop;
            if (house.x < this.plant.x)
            {
                xstart = house.x+100;
                xstop = this.plant.x;
            }
            else{
                xstart = this.plant.x;
                xstop = house.x-100;
            }

            this.pipes.moveTo(xstart, house.y);

            for (var i = xstart; i <= xstop; i += PIPE_SIZE)
            {
                this.pipes.lineTo(i, house.y);
            }
    
            this.pipes.strokePath();
        });
        this.plant.east.houses.forEach(house =>
        {
            this.updateHouse(house);
            this.pipes.lineStyle(5, this.plant.east.isOpen ? RED : GREY, 1.0);
            this.pipes.beginPath();
        
            for (var i = this.plant.x+100; i <= house.x; i += PIPE_SIZE)
            {
                this.pipes.lineTo(i, this.plant.y);
            }
            
            var ystart, ystop;
            if (house.y < this.plant.y)
            {
                ystart = house.y+100;
                ystop = this.plant.y;
            }
            else{
                ystart = this.plant.y;
                ystop = house.y-100;
            }

            this.pipes.moveTo(house.x,ystart);
            for (var i = ystart; i <= ystop; i += PIPE_SIZE)
            {
                this.pipes.lineTo(house.x, i);
            }
    
            this.pipes.strokePath();
        });
        this.plant.west.houses.forEach(house =>
            {
                this.updateHouse(house);
                this.pipes.lineStyle(5, this.plant.west.isOpen ? RED : GREY, 1.0);
                this.pipes.beginPath();
            
                for (var i = house.x; i <= this.plant.x-100; i += PIPE_SIZE)
                {
                    this.pipes.lineTo(i, this.plant.y);
                }
                
                var ystart, ystop;
                if (house.y < this.plant.y)
                {
                    ystart = house.y+100;
                    ystop = this.plant.y;
                }
                else{
                    ystart = this.plant.y;
                    ystop = house.y-100;
                }
    
                this.pipes.moveTo(house.x,ystart);
                for (var i = ystart; i <= ystop; i += PIPE_SIZE)
                {
                    this.pipes.lineTo(house.x, i);
                }
        
                this.pipes.strokePath();
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