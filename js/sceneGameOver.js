class SceneGameOver extends Phaser.Scene {
    constructor() {
        super('SceneGameOver');
        Phaser.Scene.call(this, { key: 'sceneGameOver' });
        this.counter = 0;
    }
    preload()
    {
        this.load.image('empty', 'images/houses/empty.png');

    }
    create ()
    {
        this.button = this.add.image(100, 200, "empty");
    }

}