class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');
        Phaser.Scene.call(this, { key: 'sceneMenu' });
        this.counter = 0;
    }

    preload()
    {
        this.load.image('logo', 'images/logo/cieplutko-logo.png');
        this.load.image('startButton', 'images/startButton2.png');
        this.load.image('keyboard', 'images/keyboard.png');
        this.load.image('arrow', 'images/arrow2.png');
        this.load.image('powerplantMenu', 'images/houses/powerplant2.png');
        this.load.image('house1', 'images/houses/4.png');
        this.load.image('house2', 'images/houses/5.png');

        this.load.spritesheet('ice', 'images/ice.png', { frameWidth: 100, frameHeight: 135 });
        this.load.spritesheet('fire', 'images/fire.png', { frameWidth: 100, frameHeight: 135 });
    
        this.load.image('redPipe1', 'images/pipes/red1.png');
        this.load.image('redPipe2', 'images/pipes/red2.png');
        this.load.image('redPipe3', 'images/pipes/red3.png');
        this.load.image('redPipe4', 'images/pipes/red4.png');
        this.load.image('redPipe5', 'images/pipes/red5.png');
        this.load.image('redPipe6', 'images/pipes/red6.png');
        this.load.image('redPipe7', 'images/pipes/red7.png');

        this.load.image('bluePipe1', 'images/pipes/blue1.png');
        this.load.image('bluePipe2', 'images/pipes/blue2.png');
        this.load.image('bluePipe3', 'images/pipes/blue3.png');
        this.load.image('bluePipe4', 'images/pipes/blue4.png');
        this.load.image('bluePipe5', 'images/pipes/blue5.png');
        this.load.image('bluePipe6', 'images/pipes/blue6.png');
        this.load.image('bluePipe7', 'images/pipes/blue7.png');

    }

    create ()
    {
        this.logo = this.add.image(675, 110, "logo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        this.add.text(590,300,"GREJ",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.add.text(565,400,"EFEKTY",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.add.text(560,500,"INO JAK?",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.pressSpacebar = this.add.text(395,700,"Kaj leziesz? Ciepnij spacje...", {fontFamily:'ZCOOL KuaiLe',color:'#ffffb3',fontSize:'40px'});

        this.drawPipesInitial();

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.choice = 0;
        this.choiceBox = this.add.graphics();
        this.drawChoiceBox();

        this.add.image(200, 420, "house1").setDisplaySize(150, 150);
        this.ice = this.add.sprite(200,400,'ice');
        this.ice.scaleX = 1.3;
        this.ice.scaleY = 1.3;
        var frameNames= this.anims.generateFrameNumbers('ice');
        this.anims.create({
            key: 'animateIce',
            frames: frameNames,
            frameRate: 6,
            repeat: -1
        });
        this.ice.play('animateIce');

        this.add.image(1100, 420, "house2").setDisplaySize(150, 150);
        this.fire = this.add.sprite(1100,400,'fire');
        this.fire.scaleX = 1.3;
        this.fire.scaleY = 1.3;
        var frameNames= this.anims.generateFrameNumbers('fire');
        this.anims.create({
            key: 'animateFire',
            frames: frameNames,
            frameRate: 8,
            repeat: -1 
        });
        this.fire.play('animateFire');
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.choice == 0) {
                this.choice = 2;               
            } else {
                this.choice--;               
            }

            if(this.choice == 0){
                this.drawPipesInitial();
            }
            else if(this.choice == 1){
                this.drawPipesRanking();
            }
            else if(this.choice ==2){
                this.drawPipesManual();
            }

            this.drawChoiceBox();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            if (this.choice == 2) {
                this.choice = 0;
            } else {
                this.choice++;
            }

            if(this.choice == 0){
                this.drawPipesInitial();
            }
            else if(this.choice == 1){
                this.drawPipesRanking();
            }
            else if(this.choice ==2){
                this.drawPipesManual();
            }

            this.drawChoiceBox();
        }

        if (this.spaceBar.isDown || this.enter.isDown) {
            this.switchToScene();
        }      
    }

    switchToScene()
    {
        switch (this.choice) {
            case 0:
                this.scene.start('sceneMain');
                break;
            case 1:
                this.scene.start('sceneLeaderboard');
                break;
            case 2:
                this.scene.start('sceneTutorial');
                break;
            default:
                break;
        }
    }

    drawChoiceBox() {
        this.choiceBox.clear();
        this.choiceBox.lineStyle(3, 0xdf7919, 1);
        this.choiceBox.strokeRect(520, 285 + this.choice * 100, 250, 70);
    }

    drawPipesGame()
    {
        this.add.image(788, 320, "bluePipe1");
    }

    drawPipesInitial()
    {
        this.add.image(788, 320, "bluePipe1");
        this.add.image(820, 320, "bluePipe1");
        this.add.image(852, 320, "bluePipe1");
        this.add.image(882, 323, "bluePipe2");

        this.add.image(884, 353, "bluePipe6");
        this.add.image(884, 387, "bluePipe6");

        this.add.image(788, 420, "redPipe1");
        this.add.image(820, 420, "redPipe1");
        this.add.image(852, 420, "redPipe1");

        this.add.image(884, 486, "redPipe5");
        this.add.image(884, 452, "redPipe5");

        this.add.image(788, 520, "redPipe1");
        this.add.image(820, 520, "redPipe1");
        this.add.image(852, 520, "redPipe1");
        this.add.image(882, 517, "redPipe3");

        this.add.image(884, 420, "bluePipe4");
        this.add.image(916, 420, "bluePipe1");
        this.add.image(948, 420, "bluePipe1");
        this.add.image(980, 420, "bluePipe1");

        this.add.image(501, 320, "redPipe1");
        this.add.image(469, 320, "redPipe1");
        this.add.image(437, 320, "redPipe1");
        this.add.image(407, 323, "redPipe6");

        this.add.image(404, 353, "redPipe5");
        this.add.image(404, 387, "redPipe5");

        this.add.image(501, 420, "bluePipe1");
        this.add.image(469, 420, "bluePipe1");
        this.add.image(437, 420, "bluePipe1");

        this.add.image(404, 453, "bluePipe6");
        this.add.image(404, 487, "bluePipe6");

        this.add.image(501, 520, "bluePipe1");
        this.add.image(469, 520, "bluePipe1");
        this.add.image(437, 520, "bluePipe1");
        this.add.image(407, 518, "bluePipe3");

        this.add.image(404, 420, "redPipe4");
        this.add.image(371, 420, "redPipe1");
        this.add.image(338, 420, "redPipe1");
        this.add.image(305, 420, "redPipe1");
    }

    drawPipesRanking()
    {
        this.add.image(788, 320, "redPipe1");
        this.add.image(820, 320, "redPipe1");
        this.add.image(852, 320, "redPipe1");
        this.add.image(882, 323, "redPipe2"); 

        this.add.image(884, 353, "redPipe5");
        this.add.image(884, 387, "redPipe5");

        this.add.image(788, 420, "bluePipe1");
        this.add.image(820, 420, "bluePipe1");
        this.add.image(852, 420, "bluePipe1");

        this.add.image(884, 486, "redPipe5");
        this.add.image(884, 452, "redPipe5");

        this.add.image(788, 520, "redPipe1");
        this.add.image(820, 520, "redPipe1");
        this.add.image(852, 520, "redPipe1");
        this.add.image(882, 517, "redPipe3");

        this.add.image(884, 420, "bluePipe4");
        this.add.image(916, 420, "bluePipe1");
        this.add.image(948, 420, "bluePipe1");
        this.add.image(980, 420, "bluePipe1");

        this.add.image(501, 320, "bluePipe1");
        this.add.image(469, 320, "bluePipe1");
        this.add.image(437, 320, "bluePipe1");
        this.add.image(407, 323, "bluePipe5");

        this.add.image(404, 353, "bluePipe6");
        this.add.image(404, 387, "bluePipe6");

        this.add.image(501, 420, "redPipe1");
        this.add.image(469, 420, "redPipe1");
        this.add.image(437, 420, "redPipe1");

        this.add.image(404, 453, "bluePipe6");
        this.add.image(404, 487, "bluePipe6");

        this.add.image(501, 520, "bluePipe1");
        this.add.image(469, 520, "bluePipe1");
        this.add.image(437, 520, "bluePipe1");
        this.add.image(407, 518, "bluePipe3");

        this.add.image(404, 420, "redPipe4");
        this.add.image(371, 420, "redPipe1");
        this.add.image(338, 420, "redPipe1");
        this.add.image(305, 420, "redPipe1");   
    }
    drawPipesManual(){
        this.add.image(788, 320, "redPipe1");
        this.add.image(820, 320, "redPipe1");
        this.add.image(852, 320, "redPipe1");
        this.add.image(882, 323, "redPipe2"); 

        this.add.image(884, 353, "redPipe5");
        this.add.image(884, 387, "redPipe5");

        this.add.image(788, 420, "redPipe1");
        this.add.image(820, 420, "redPipe1");
        this.add.image(852, 420, "redPipe1");

        this.add.image(884, 486, "bluePipe6");
        this.add.image(884, 452, "bluePipe6");

        this.add.image(788, 520, "bluePipe1");
        this.add.image(820, 520, "bluePipe1");
        this.add.image(852, 520, "bluePipe1");
        this.add.image(882, 517, "bluePipe7");

        this.add.image(884, 420, "bluePipe4");
        this.add.image(916, 420, "bluePipe1");
        this.add.image(948, 420, "bluePipe1");
        this.add.image(980, 420, "bluePipe1");

        this.add.image(501, 320, "bluePipe1");
        this.add.image(469, 320, "bluePipe1");
        this.add.image(437, 320, "bluePipe1");
        this.add.image(407, 323, "bluePipe5");

        this.add.image(404, 353, "bluePipe6");
        this.add.image(404, 387, "bluePipe6");

        this.add.image(501, 420, "bluePipe1");
        this.add.image(469, 420, "bluePipe1");
        this.add.image(437, 420, "bluePipe1");

        this.add.image(404, 453, "redPipe5");
        this.add.image(404, 487, "redPipe5");

        this.add.image(501, 520, "redPipe1");
        this.add.image(469, 520, "redPipe1");
        this.add.image(437, 520, "redPipe1");
        this.add.image(407, 518, "redPipe7");

        this.add.image(404, 420, "redPipe4");
        this.add.image(371, 420, "redPipe1");
        this.add.image(338, 420, "redPipe1");
        this.add.image(305, 420, "redPipe1");
    }

}