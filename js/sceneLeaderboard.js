class SceneLeaderboard extends Phaser.Scene {
    constructor() {
        super('SceneLeaderboard');
        Phaser.Scene.call(this, { key: 'sceneLeaderboard' });
        this.counter = 0;
    }
    
    preload()
    {

    }

    create ()
    {
        console.log(localStorage.getItem(LEADERBOARD));

        const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD));

        this.ranking = this.add.text(500,40,"RANKING",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spacebar.isDown) {
            this.scene.start('sceneMenu');
        }
    }
}