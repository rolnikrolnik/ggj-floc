class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');
        Phaser.Scene.call(this, { key: 'sceneMenu' });
        this.counter = 0;
    }

    preload()
    {
        this.load.image('logo', 'images/cieplutko-logo.png');
        this.load.image('startButton', 'images/startButton2.png');
        this.load.image('keyboard', 'images/keyboard.png');
        this.load.image('arrow', 'images/arrow2.png');
        this.load.image('powerplantMenu', 'images/houses/powerplant2.png');

        this.load.audio('theme', ['music/menu.wav']);
    }

    create ()
    {
        this.logo = this.add.image(675, 110, "logo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        this.add.text(590,300,"GRAJ",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.add.text(550,400,"RANKING",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.add.text(560,500,"MANUAL",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.pressSpacebar = this.add.text(380,700,"Press spacebar to continue...", {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.choice = 0;
        this.choiceBox = this.add.graphics();
        this.drawChoiceBox();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.choice == 0) {
                this.choice = 2;
            } else {
                this.choice--;
            }

            this.drawChoiceBox();
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            if (this.choice == 2) {
                this.choice = 0;
            } else {
                this.choice++;
            }

            this.drawChoiceBox();
        }


        this.music = this.sound.add('theme');
        this.music.play();

        if (this.spaceBar.isDown) {
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
}