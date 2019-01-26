class SceneGameOver extends Phaser.Scene {
    constructor() {
        super('SceneGameOver');
        Phaser.Scene.call(this, { key: 'sceneGameOver' });
        this.counter = 0;
    }
    
    preload()
    {
        this.load.image('empty', 'images/houses/empty.png');

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create ()
    {
        this.button = this.add.image(100, 200, "empty");
    }

    update() {
        if(this.spaceBar.isDown) {
            this.scene.start('sceneMenu');
        }
    }

}