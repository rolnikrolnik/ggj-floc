class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');

        this.counter = 0;
    }
    preload()
    {
        this.load.image('button', 'images/startButton.png')


    }
    create() {

        //this.face = this.add.image(100, 200, "button");
       // this.face.setInteractive();
        //this.face.on('pointerdown',this.startGame);

        this.add.text(0, 0, 'Click to add new Scene');

        this.input.on('pointerdown', function () {
    
            this.input.stopPropagation();
            this.scene.switch('sceneMain');
        
        }, this);

    }

    startGame(){

        
        scene.start(sceneMain);
    }

    update() {
   
        
    }
}