var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [ GameScene ]
};

var game = new Phaser.Game(config);

function play(){
	loadpage("../html/play.html");
}
function buttonPractice(){
	loadpage("./buttons_controller.js");
}