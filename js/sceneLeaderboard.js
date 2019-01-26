class SceneLeaderboard extends Phaser.Scene {
    constructor() {
        super('SceneLeaderboard');
        Phaser.Scene.call(this, { key: 'SceneLeaderboard' });
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