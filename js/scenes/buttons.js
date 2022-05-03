/*export class TextButton extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style) {
	  super(scene, x, y, text, style);
  
	  this.setInteractive({ useHandCursor: true })
		.on('pointerover', () => this.enterButtonHoverState() )
		.on('pointerout', () => this.enterButtonRestState() )
		.on('pointerdown', () => this.enterButtonActiveState() )
		.on('pointerup', () => this.enterButtonHoverState() );
	}
  
	enterButtonHoverState() {
	  this.setStyle({ fill: '#ff0'});
	}
  
	enterButtonRestState() {
	  this.setStyle({ fill: '#0f0'});
	}
  
	enterButtonActiveState() {
	  this.setStyle({ fill: '#0ff' });
	}
  }*/

/*export class TextButton extends Phaser.GameObjects{
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}

// Then later in one of your scenes, create a new button:
const button = new Button(0, 0, 'Start Game', this, () => console.log('game is started'));
*/
var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('eye', '../resources/cb.png');
}

function create ()
{
    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();

    sprite.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);
		//Phaser.Scene.call(this, { key: 'gameScene' });
		//this.scene.pause();
		//this.scene.start('SimpleScene');
    });

    sprite.on('pointerout', function (pointer) {

        this.clearTint();

    });

    sprite.on('pointerup', function (pointer) {

        this.clearTint();

    });
}