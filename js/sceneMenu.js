class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');
        Phaser.Scene.call(this, { key: 'sceneMenu' });
        this.counter = 0;
    }

    preload()
    {
        this.load.image('startButton', 'images/startButton.png');
    }

    create ()
    {
        this.button = this.add.image(100, 200, "startButton");
        this.button.setInteractive();
        this.button.on('pointerdown', this.switchScene,this);
    }

    switchScene()
    {
        this.scene.start('sceneMain');
    }
}