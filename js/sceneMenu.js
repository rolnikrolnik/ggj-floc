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
    }

    create ()
    {
        this.logo = this.add.image(675, 200, "logo");
        this.logo.scaleX=1.1;
        this.logo.scaleY=1.1;

        this.button = this.add.image(600, 500, "startButton");
        this.button.setInteractive();
        this.button.on('pointerdown', this.switchScene,this);
    }

    switchScene()
    {
        this.scene.start('sceneMain');
    }
}