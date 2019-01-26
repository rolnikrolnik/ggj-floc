class SceneTutorial extends Phaser.Scene {
    constructor() {
        super('sceneTutorial');
        Phaser.Scene.call(this, { key: 'sceneTutorial' });
        this.counter = 0;
    }

    preload()
    {
        this.load.image('tutorialLogo', 'images/logo/tutorial-logo.png');
        this.load.image('keyboard', 'images/keyboard.png');
        this.load.image('arrow', 'images/arrow2.png');
        this.load.image('coal', 'images/coal.png');
    }

    create ()
    {
        this.logo = this.add.image(675, 110, "tutorialLogo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        // this.powerplantMenu = this.add.image(950, 525, "powerplantMenu");
        // this.powerplantMenu.scaleX=0.9;
        // this.powerplantMenu.scaleY=0.65;

        this.keyboard = this.add.image(300, 350, "keyboard");
        this.keyboard.scaleX=2.5;
        this.keyboard.scaleY=2.5;
        this.keyboard.angle=330;

        this.coal = this.add.image(1050, 400, "coal");
        this.coal.scaleX = 1.3;
        this.coal.scaleY = 1.3;

        this.coalDesc = this.add.text(850,580,"Spacja dogrzewa!",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.arrow = this.add.image(370, 450, "arrow");
        this.arrow.scaleX=1.5;
        this.arrow.angle=320;

        this.ranking=this.add.text(150,580,"Dostarczaj cieplutko \n           do dzielnic",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.pressSpacebar = this.add.text(380,700,"Press spacebar to continue...", {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spacebar.isDown) {
            this.scene.start('sceneMenu');
        }
    }
}