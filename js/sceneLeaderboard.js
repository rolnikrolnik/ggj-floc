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
        this.ranking=this.add.text(500,600,"RANKING",{fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});
    }
}