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
        const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
        const textOptions = {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'};
        
        this.printScores(sortedLeaderboard, textOptions);

        this.ranking = this.add.text(600,40,"RANKING", textOptions);
        this.pressSpacebar = this.add.text(380,650,"Press spacebar to continue...", textOptions);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spacebar.isDown) {
            this.scene.start('sceneMenu');
        }
    }

    printScores(sortedLeaderboard, textOptions) {
        this.add.text(400,100, `1. ${sortedLeaderboard[0].name}`, textOptions);
        this.add.text(400,150, `2. ${sortedLeaderboard[1].name}`, textOptions)
        this.add.text(400,200, `3. ${sortedLeaderboard[2].name}`, textOptions)
        this.add.text(400,250, `4. ${sortedLeaderboard[3].name}`, textOptions)
        this.add.text(400,300, `5. ${sortedLeaderboard[4].name}`, textOptions)
        this.add.text(400,350, `6. ${sortedLeaderboard[5].name}`, textOptions)
        this.add.text(400,400, `7. ${sortedLeaderboard[6].name}`, textOptions)
        this.add.text(400,450, `8. ${sortedLeaderboard[7].name}`, textOptions)
        this.add.text(400,500, `9. ${sortedLeaderboard[8].name}`, textOptions)
        this.add.text(400,550, `10. ${sortedLeaderboard[9].name}`, textOptions)

        this.add.text(850,100, `${sortedLeaderboard[0].score}`, textOptions);
        this.add.text(850,150, `${sortedLeaderboard[1].score}`, textOptions)
        this.add.text(850,200, `${sortedLeaderboard[2].score}`, textOptions)
        this.add.text(850,250, `${sortedLeaderboard[3].score}`, textOptions)
        this.add.text(850,300, `${sortedLeaderboard[4].score}`, textOptions)
        this.add.text(850,350, `${sortedLeaderboard[4].score}`, textOptions)
        this.add.text(850,400, `${sortedLeaderboard[4].score}`, textOptions)
        this.add.text(850,450, `${sortedLeaderboard[4].score}`, textOptions)
        this.add.text(850,500, `${sortedLeaderboard[4].score}`, textOptions)
        this.add.text(850,550, `${sortedLeaderboard[4].score}`, textOptions)
    }
}