class SceneLeaderboard extends Phaser.Scene {
    constructor() {
        super('SceneLeaderboard');
        Phaser.Scene.call(this, { key: 'sceneLeaderboard' });
        this.counter = 0;
    }
    
    preload()
    {
        this.load.image('logo', 'images/cieplutko-logo.png');
    }

    create ()
    {
        const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD));
        this.sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
        this.textOptions = {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'};

        this.ranking = this.add.text(600,40,"RANKING", this.textOptions);
        this.pressSpacebar = this.add.text(380,650,"Press spacebar to continue...", this.textOptions);

        this.printScores();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spacebar.isDown) {
            this.scene.start('sceneMenu');
        }
    }

    printScores() {
        for (let index = 0; index < this.sortedLeaderboard.length; index++) {
            this.printPlayer(index);
        }
    }

    printPlayer(index) {
        this.add.text(400, 100 + index * 50, this.getNameText(index), this.textOptions);
        this.add.text(850,100 + index * 50, this.getScoreText(index), this.textOptions);
    }

    
    getNameText(index) {
        return this.sortedLeaderboard[index]
        ? `${ index + 1 }. ${ this.sortedLeaderboard[index].name }`
        : `${ index + 1 }. ...`;
    }

    getScoreText(index) {
        return this.sortedLeaderboard[index]
        ? `${ this.sortedLeaderboard[index].score }`
        : `...`;
    }
}