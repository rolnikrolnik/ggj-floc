class SceneLeaderboard extends Phaser.Scene {
    constructor() {
        super('SceneLeaderboard');
        Phaser.Scene.call(this, { key: 'sceneLeaderboard' });
    }
    
    preload()
    {
        this.load.image('rankingLogo', 'images/logo/ranking-logo.png');
    
        this.load.image('redPipe1', 'images/pipes/red1.png');
        this.load.image('redPipe2', 'images/pipes/red2.png');
        this.load.image('redPipe3', 'images/pipes/red3.png');
        this.load.image('redPipe4', 'images/pipes/red4.png');
        this.load.image('redPipe5', 'images/pipes/red5.png');
        this.load.image('redPipe6', 'images/pipes/red6.png');
        this.load.image('redPipe7', 'images/pipes/red7.png');

        this.load.image('bluePipe1', 'images/pipes/blue1.png');
        this.load.image('bluePipe2', 'images/pipes/blue2.png');
        this.load.image('bluePipe3', 'images/pipes/blue3.png');
        this.load.image('bluePipe4', 'images/pipes/blue4.png');
        this.load.image('bluePipe5', 'images/pipes/blue5.png');
        this.load.image('bluePipe6', 'images/pipes/blue6.png');
        this.load.image('bluePipe7', 'images/pipes/blue7.png');
        this.load.image('bluePipe8', 'images/pipes/blue8.png');
        this.load.image('bluePipe9', 'images/pipes/blue9.png');
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
 
        this.add.image(67, 172, "redPipe5");
        this.add.image(67, 204, "redPipe5");
        this.add.image(67, 236, "redPipe5");
        this.add.image(67, 268, "redPipe5");
        this.add.image(70, 298, "redPipe7");
        this.add.image(100, 300, "redPipe1");
        this.add.image(132, 300, "redPipe1");
        this.add.image(164, 300, "redPipe1");
        this.add.image(196, 300, "redPipe1");
        this.add.image(228, 300, "redPipe1");
        this.add.image(260, 300, "redPipe1");
        this.add.image(290, 303, "redPipe2");

        this.add.image(292, 332, "redPipe5");
        this.add.image(292, 364, "redPipe5");
        this.add.image(292, 396, "redPipe5");
        this.add.image(290, 427, "redPipe3");

        this.add.image(259, 429, "redPipe1");
        this.add.image(227, 429, "redPipe1");

        this.add.image(198, 427, "redPipe7");
        this.add.image(195, 396, "redPipe5");
        this.add.image(193, 366, "redPipe2");

        this.add.image(162, 363, "redPipe1");

        this.add.image(1000, 500, "bluePipe1");
        this.add.image(1032, 500, "bluePipe1");
        this.add.image(1064, 498, "bluePipe8");
        this.add.image(1096, 500, "bluePipe1");
        this.add.image(1126, 503, "bluePipe2");

        this.add.image(1128, 532, "bluePipe6");
        this.add.image(1128, 564, "bluePipe6");
        this.add.image(1128, 596, "bluePipe6");
        this.add.image(1131, 627, "bluePipe3");

        this.add.image(1161, 629, "bluePipe1");
        this.add.image(1193, 629, "bluePipe1");
        this.add.image(1226, 629, "bluePipe1");

        this.add.image(1064, 468, "bluePipe6");
        this.add.image(1064, 436, "bluePipe6");
        this.add.image(1067, 403, "bluePipe9");

        this.add.image(1096, 403, "bluePipe1");
        this.add.image(1126, 401, "bluePipe7");
        this.add.image(1131, 374, "bluePipe5");
        this.add.image(1161, 371, "bluePipe1");
        this.add.image(1193, 371, "bluePipe1");


    
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