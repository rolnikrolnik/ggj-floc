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

    
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create ()
    {
        this.logo = this.add.image(675, 125, "logo");
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

        this.ranking=this.add.text(50,580,"Dostarczaj cieplutko \n           do dzielnic",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

    }
    update() {
        if(this.spaceBar.isDown) {
            this.scene.start('sceneMain');
        }
    }
    switchToMainScene()
    {
        this.scene.start('sceneMain');
    }
    switchToLeaderboardScene()
    {
        this.scene.start('sceneLeaderboard');
    }
}