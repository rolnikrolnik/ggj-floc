class SceneGameOver extends Phaser.Scene {
    constructor() {
        super('SceneGameOver');
        Phaser.Scene.call(this, { key: 'sceneGameOver' });
        this.counter = 0;
    }
    
    preload()
    {
        this.load.image('gameoverLogo', 'images/gameover-logo.png');
    }

    create ()
    {
        this.gameoverLogo = this.add.image(675, 110, "gameoverLogo");
        this.gameoverLogo.scaleX=1.1;
        this.gameoverLogo.scaleY=1.1;

        this.name = '';
        this.score = localStorage.getItem(CURRENT_SCORE);
        localStorage.removeItem(CURRENT_SCORE);

        this.scoreText = this.add.text(350, 275, `Score: ${this.score}`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'170px'});
        this.nameText = this.add.text(580, 550, `Name: ${this.name}_`, {fontFamily:'ZCOOL KuaiLe',color:'#df7919',fontSize:'40px'});

        this.input.keyboard.on('keydown', this.addLetterToName, this);  

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.enter.isDown) {
            this.saveScore();

            this.scene.start('sceneLeaderboard');
        }
    }

    addLetterToName(event) {
        if (event.key == 'Backspace' && this.name.length > 0) {
            this.name = this.name.substring(0, this.name.length - 1).toUpperCase();
        }

        if (event.keyCode >= 65 && event.keyCode <= 90 && this.name.length < 6) {
            this.name += event.key;
            this.name = this.name.toUpperCase();
        }

        if (this.name.length == 6) {
            this.nameText.setText(`Name: ${this.name}`);
        } else {
            this.nameText.setText(`Name: ${this.name}_`);
        }
    }

    saveScore() {
        const scoreEntry = { name: this.name, score: this.score };

        let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD));

        if (!leaderboard) {
            leaderboard = [ scoreEntry ];
        } else {
            leaderboard.push(scoreEntry);
        }

        localStorage.setItem(LEADERBOARD, JSON.stringify(leaderboard));

        console.log(leaderboard);
    }
}