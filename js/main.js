var game;
window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 720,
        height: 720,
        parent: 'phaser-game',
        scene: [SceneMain],
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