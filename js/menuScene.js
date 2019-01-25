class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        Phaser.Scene.call(this, { key: 'menuScene' });
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
        this.button.on('pointerdown',this.switchScene,this);
    }
    switchScene()
    {
        console.log('hej');
        this.scene.start('sceneMain');
    }
}