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
        this.load.image('5', 'images/houses/5.png');
        this.load.image('blue1', 'images/pipes/blue1.png');
        this.load.image('blue2', 'images/pipes/blue2.png');
        this.load.image('red1', 'images/pipes/red1.png');
        this.load.image('red2', 'images/pipes/red2.png');

        this.thermometersId = [];
        this.load.spritesheet('ice', 'images/ice.png', { frameWidth: 100, frameHeight: 135 });
        this.load.spritesheet('fire', 'images/fire.png', { frameWidth: 100, frameHeight: 135 });
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
        
        this.drawRect(this.add.graphics({x: this.plant.x+30 - 1, y: this.plant.y + 95 - 2}), WHITE, 152, 14 );
        var termGrey = this.add.graphics({x: this.plant.x+30, y: this.plant.y + 94});
        this.drawRect(termGrey, GREY, 150, 12);
        this.plant.healthIndicator = this.add.graphics({x: this.plant.x+30, y: this.plant.y + 95 });
        this.drawRect(this.plant.healthIndicator, RED, 150, 10);
        this.plant.warning = this.add.text(this.plant.x+100,this.plant.y+50, '!', {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'})
    }
    create() {
        this.counter = 0;
        this.gameOver = false;

        this.createPlant();

        this.timing = 0;
        this.timer = setInterval(() => this.updateTime(), 1000);

        this.timerDisplay = this.add.text(0, 20, `Dni: ${0}, godziny: ${0}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.pipes = this.add.group();
        this.printHouses();
        this.makeWungiel();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.ice = this.add.sprite(15000,100,'ice');
        var frameNames= this.anims.generateFrameNumbers('ice');
        this.anims.create({
            key: 'animateIceMain',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });

        this.fire = this.add.sprite(15000,100,'fire');
        var frameNames= this.anims.generateFrameNumbers('fire');
        this.anims.create({
            key: 'animateFireMain',
            frames: frameNames,
            frameRate: 8,
            repeat: 0 
        });
    }

    makeWungiel() {
        this.wungiel = 3;
        this.wungielDisplay = this.add.text(0, 100, `Chopie, mosz ${this.wungiel} wungle z gruby`, {fontFamily:'ZCOOL KuaiLe', color: '#ffffb3',fontSize:'30px'});
        this.wungielButtonDisplay = this.add.text(0, 130, `Ciepnij spacje i dogrzej kafloka`, {fontFamily:'ZCOOL KuaiLe', color: '#ffffb3',fontSize:'20px'});
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
                this.plant.refreshPipes = true;
                this.plant.west.toggle();
            }
            else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
                this.plant.refreshPipes = true;
                this.plant.east.toggle();
            }
            else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                this.plant.refreshPipes = true;
                this.plant.north.toggle();
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                this.plant.refreshPipes = true;
                this.plant.south.toggle();
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.useWungiel();
            }
        }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.thermometersId.forEach(thermometerId => {
                    this.textures.remove(thermometerId);
                })
                this.scene.start('sceneGameOver');
            }
        }

        this.counter++;

        if (!this.gameOver) {
            try {
                if (this.counter == GAME_SPEED) {

                    this.plant.update();

                    this.counter = 0;
                }
                
                if (this.plant.refreshPipes){
                    this.pipes.clear();
                    this.updatePipes();
                    this.plant.refreshPipes = false;  
                }
                this.drawRect(this.plant.healthIndicator, RED, this.plant.health > 100 ? 150 : this.plant.health*150/100, 10);
                this.plant.warning.visible = (this.plant.health < 20 || this.plant.health > 80);
            } catch (error) {
                this.counter = GAME_SPEED + 1;
                this.gameOver = true;

                switch (error.error) {
                    case HOUSE_BURNING:
                        this.fire.x = this.plant.directions[error.index].houses[0].x;
                        this.fire.y = this.plant.directions[error.index].houses[0].y;
                        this.fire.play('animateFireMain');
                        break;
                    case HOUSE_FROZEN:
                        this.ice.x = this.plant.directions[error.index].houses[0].x;
                        this.ice.y = this.plant.directions[error.index].houses[0].y;
                        this.ice.play('animateIceMain');
                        break;
                    case PLANT_BURNING:
                        this.fire.x = this.plant.x;
                        this.fire.y = this.plant.y;
                        this.fire.play('animateFireMain');
                        break;
                    case PLANT_FROZEN:
                        this.ice.x = this.plant.x;
                        this.ice.y = this.plant.y;
                        this.ice.play('animateIceMain');
                        break;
                }            

            this.pressSpacebar = this.add.text(380,700,"Kaj leziesz? Ciepnij spacje...", {fontFamily:'ZCOOL KuaiLe',color:'#ffffb3',fontSize:'40px'});

                clearInterval(this.timer);
                localStorage.setItem(CURRENT_SCORE, this.timing);
            }
        }

        this.updateThermometers();
    }

    printHouse(house) {
        this.houses.create(house.x, house.y, house.insulation.toString()).setDisplaySize(150, 150);
        if (house.x < this.plant.x){
            this.makeGradientLine(house.x - 89, house.y);
            house.createThermometer(this.add.graphics({ x: house.x - 94, y: house.y - 75}));
            house.warningHot = this.add.text(house.x - 110, house.y - 70, `!`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'30px'});
            house.warningCold = this.add.text(house.x - 110, house.y + 45, `!`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'30px'});
        }
        else {
            this.makeGradientLine(house.x + 99, house.y);
            house.createThermometer(this.add.graphics({ x: house.x + 94, y: house.y - 75}));
            house.warningHot = this.add.text(house.x + 110, house.y - 70, `!`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'30px'});
            house.warningCold = this.add.text(house.x + 110, house.y + 45, `!`, {fontFamily:'ZCOOL KuaiLe', color:'#df7919',fontSize:'30px'});
        }
    }

    drawPipe(x, y, angle, type){
        var pipe = this.pipes.create(x, y, type);
        pipe.setDisplaySize(PIPE_SIZE, PIPE_SIZE);
        pipe.depth = -10
        pipe.angle = angle;
    }

    updateThermometers(){
        this.plant.north.houses.forEach(h => this.updateHouse(h));
        this.plant.south.houses.forEach(h => this.updateHouse(h));
        this.plant.west.houses.forEach(h => this.updateHouse(h));
        this.plant.east.houses.forEach(h => this.updateHouse(h));
    } 

    updatePipes(){
        this.plant.south.houses.forEach(house =>
        {
            var color = this.plant.south.isOpen ? 'red' : 'blue'

            var ypos;
            for (ypos = this.plant.y; ypos < house.y; ypos += PIPE_SIZE)
            {
                this.drawPipe(this.plant.x, ypos, 90, color + '1');
            }

            if (house.x - 75 >= this.plant.x - 100 && house.x + 75 <= this.plant.x + 100){
                return;
            }

            if (house.x < this.plant.x)
            {
                this.drawPipe(this.plant.x-2, ypos, 90, color + '2');

                for (var i = this.plant.x-PIPE_SIZE-2; i >= house.x; i -= PIPE_SIZE)
                {
                    this.drawPipe(i, ypos+2, 0, color + '1');
                }
            }
            else {
                this.drawPipe(this.plant.x+2, ypos, 180, color + '2');

                for (var i = this.plant.x+PIPE_SIZE+2; i <= house.x; i += PIPE_SIZE)
                {
                    this.drawPipe(i, ypos+4, 0, color + '1');
                }
            }   

            this.updateHouse(house);
        });
        this.plant.north.houses.forEach(house =>
        {
            this.updateHouse(house);
            var color = this.plant.north.isOpen ? 'red' : 'blue'

            var ypos;
            for (ypos = this.plant.y; ypos > house.y; ypos -= PIPE_SIZE)
            {
                this.drawPipe(this.plant.x+2, ypos, 90, color + '1');
            }

            if (house.x - 75 >= this.plant.x - 100 && house.x + 75 <= this.plant.x + 100){
                return;
            }

            if (house.x < this.plant.x){
                this.drawPipe(this.plant.x, ypos, 0, color + '2');

                for (var i = this.plant.x-PIPE_SIZE; i >= house.x; i -= PIPE_SIZE)
                {
                    this.drawPipe(i, ypos-2, 0, color + '1');
                }
            }
            else {
                this.drawPipe(this.plant.x+5, ypos, -90, color + '2');

                for (var i = this.plant.x+PIPE_SIZE+5; i <= house.x; i += PIPE_SIZE)
                {
                    this.drawPipe(i, ypos-2, 0, color + '1');
                }
            }   
        });
        this.plant.east.houses.forEach(house =>
        {
            this.updateHouse(house);
            var color = this.plant.east.isOpen ? 'red' : 'blue'

            var xpos;
            for (xpos = this.plant.x; xpos < house.x; xpos += PIPE_SIZE)
            {
                this.drawPipe(xpos, this.plant.y, 0, color + '1');
            }

            if (house.y - 75 >= this.plant.y - 100 && house.y + 75 <= this.plant.y + 100){
                return;
            }

            if (house.y < this.plant.y)
            {
                this.drawPipe(xpos, this.plant.y-2, 90, color + '2');

                for (var i = this.plant.y-PIPE_SIZE-2; i >= house.y; i -= PIPE_SIZE)
                {
                    this.drawPipe(xpos+2, i, 90, color + '1');
                }
            }
            else {
                this.drawPipe(xpos, this.plant.y+2, 0, color + '2');

                for (var i = this.plant.y+PIPE_SIZE+2; i <= house.y; i += PIPE_SIZE)
                {
                    this.drawPipe(xpos+2, i, 90, color + '1');
                }
            }   
        });
        this.plant.west.houses.forEach(house =>
        {
            this.updateHouse(house);
            
            var color = this.plant.west.isOpen ? 'red' : 'blue'

            var xpos;
            for (xpos = this.plant.x; xpos > house.x; xpos -= PIPE_SIZE)
            {
                this.drawPipe(xpos, this.plant.y, 0, color + '1');
            }

            if (house.y - 75 >= this.plant.y - 100 && house.y + 75 <= this.plant.y + 100){
                return;
            }

            if (house.y < this.plant.y)
            {
                this.drawPipe(xpos, this.plant.y-4, 180, color + '2');

                for (var i = this.plant.y-PIPE_SIZE-2; i >= house.y; i -= PIPE_SIZE)
                {
                    this.drawPipe(xpos-2, i, 90, color + '1');
                }
            }
            else {
                this.drawPipe(xpos, this.plant.y+2, -90, color + '2');

                for (var i = this.plant.y+PIPE_SIZE+2; i <= house.y; i += PIPE_SIZE)
                {
                    this.drawPipe(xpos-4, i, 90, color + '1');
                }
            }   
        });
    }

    updateHouse(house){
        this.drawRect(house.thermometer, BLACK, 10, 
            house.temp*150/100 > 150
                ? 0
                : house.temp*150/100 < 0
                    ? 150
                    : 150 - house.temp*150/100);

        house.warningHot.visible = house.temp > 80;
        house.warningCold.visible = house.temp < 20;
    }

    updateTime() {  
        this.timing++;
        this.drawTime(calculateTime(this.timing));
    }

    drawTime(time) {
        this.timerDisplay.setText(`Dni: ${time.days}, godziny: ${time.hours}`);
    }

    updateWungiel() {
        this.wungielDisplay.setText(`Mosz ${this.wungiel} wungle z gruby`);
    }
}


