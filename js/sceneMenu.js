class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');
        Phaser.Scene.call(this, { key: 'sceneMenu' });
        this.counter = 0;
    }

    preload()
    {
        this.load.image('logo', 'images/cieplutko-logo.png');
        this.load.image('startButton', 'images/startButton.png');
    
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create ()
    {
        this.logo = this.add.image(675, 125, "logo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        this.ranking=this.add.text(500,600,"RANKING",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
        this.ranking.setInteractive();
        this.ranking.on('pointerdown', this.switchToLeaderboardScene,this);

        this.button = this.add.image(600, 500, "startButton");
        this.button.setInteractive();
        this.button.on('pointerdown', this.switchToMainScene,this);
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