import ButtonDemo from "./scenes/buttons";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [ ButtonDemo ]
}

export default new Phaser.Game(config)


function play(){
	loadpage("../html/play.html");
}
function buttonPractice(){
	loadpage("./buttons_controller.js");
}