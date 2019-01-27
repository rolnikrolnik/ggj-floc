class SceneManual extends Phaser.Scene {
    constructor() {
        super('SceneManual');
        Phaser.Scene.call(this, { key: 'sceneManual' });
    }

    preload()
    {
        // this.load.image('logo', 'images/cieplutko-logo.png');
        // this.load.image('keyboard', 'images/keyboard.png');
        // this.load.image('arrow', 'images/arrow2.png');

        // this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create()
    {
        this.logo = this.add.image(675, 110, "logo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        this.powerplantMenu = this.add.image(950, 525, "powerplantMenu");
        this.powerplantMenu.scaleX=0.9;
        this.powerplantMenu.scaleY=0.65;

        this.ranking=this.add.text(1020,650,"RANKING",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.ranking.setInteractive();
        this.ranking.on('pointerdown', this.switchToLeaderboardScene,this);

        this.button = this.add.image(950, 310, "startButton");
        this.button.setInteractive();
        this.button.on('pointerdown', this.switchToMainScene,this);

        this.keyboard = this.add.image(200, 350, "keyboard");
        this.keyboard.scaleX=2.5;
        this.keyboard.scaleY=2.5;
        this.keyboard.angle=330;

        this.arrow = this.add.image(370, 450, "arrow");
        this.arrow.scaleX=1.5;
        this.arrow.angle=320;

        this.ranking=this.add.text(50,580,"Dej cieplutko \n           do dzielnic",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.choiceBox = this.add.graphics();

        this.choiceBox.lineStyle(2, 0xce2616, 1);
        this.choiceBox.strokeRect(50, 250, 100, 100);
    }

    update() {
        // if(this.spaceBar.isDown) {
        //     this.scene.start('sceneMain');
        // }
    }

}