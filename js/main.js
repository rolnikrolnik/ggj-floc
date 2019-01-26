var game;
window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 1350,
        height: 745,
        parent: 'phaser-game',
        scene: [SceneMenu, SceneMain, SceneGameOver, SceneLeaderboard, SceneTutorial],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        audio: {
            disableWebAudio: true
        }
    };
    game = new Phaser.Game(config);
}