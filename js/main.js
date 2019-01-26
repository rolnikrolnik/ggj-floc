var game;
window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 720,
        parent: 'phaser-game',
        scene: [SceneMenu, SceneMain, SceneGameOver],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
    };
    game = new Phaser.Game(config);
}