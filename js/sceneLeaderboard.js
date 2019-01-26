class SceneLeaderboard extends Phaser.Scene {
    constructor() {
        super('SceneLeaderboard');
        Phaser.Scene.call(this, { key: 'sceneLeaderboard' });
    }
    
    preload()
    {
        this.load.image('rankingLogo', 'images/ranking-logo.png');
    }

    create ()
    {
        this.rankingLogo = this.add.image(675, 110, "rankingLogo");
        this.rankingLogo.scaleX=1.1;
        this.rankingLogo.scaleY=1.1;

        const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD));
        
        if (!leaderboard) {
            this.sortedLeaderboard = [];
        } else {
            this.sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
        }
        
        this.textOptions = {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'};
;
        this.pressSpacebar = this.add.text(380,700,"Press spacebar to continue...", this.textOptions);

        this.printScores();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spacebar.isDown) {
            this.scene.start('sceneMenu');
        }
    }

    printScores() {
        for (let index = 0; index < 10; index++) {
            this.printPlayer(index);
        }
    }

    printPlayer(index) {
        this.add.text(400,175 + index * 50, this.getNameText(index), this.textOptions);
        this.add.text(850,175 + index * 50, this.getScoreText(index), this.textOptions);
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