//import { getRandomInt } from './random.js';

var options_data = {
	cards:2, dificulty:"hard"
};

var load = function(){
	var json = localStorage.getItem("config","{'cards':2,'dificulty':'hard'}");
	if(json)
	{
		options_data = JSON.parse(json);
	} 
};

load();

class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		//username = '';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.numCards = 2;
		this.level = "normal";
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
		this.username = sessionStorage.getItem("username","unknown");
		//let arraycards = ['co', 'sb', 'co', 'sb'];

		
		//let arraycards = ['co', 'sb', 'co', 'sb','so','so','tb','tb'];
		let arraycards = ['cb', 'co', 'sb', 'so', 'tb', 'to'];

		this.cameras.main.setBackgroundColor(0xBFFCFF);
		
		arraycards.sort(function(){return Math.random() - 0.5});
		this.numCards = options_data.cards;
		this.level = options_data.dificulty;
		arraycards = arraycards.slice(0,this.numCards);
		arraycards = arraycards.concat(arraycards);
		arraycards.sort(function(){return Math.random() - 0.5});

		if(arraycards.length == 4)
		{
			var position = 200;
		}
		else if(arraycards.length == 6)
		{
			var position = 100;
		}
		else if(arraycards.length == 8)
		{
			var position = 0;
		}
		for (var j = 0; j < arraycards.length; j++){
			this.add.image((position+50), 300, arraycards[j]);
			position += 100;
		}

		this.cards = this.physics.add.staticGroup();

		if(arraycards.length == 4)
		{
			var position = 200;
		}
		else if(arraycards.length == 6)
		{
			var position = 100;
		}
		else if(arraycards.length == 8)
		{
			var position = 0;
		}

		for (var j = 0; j < arraycards.length; j++){
			this.cards.create((position+50), 300, 'back');
			position += 100;
		}

		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						console.log(this.level);
						console.log(this.score);
						if(this.level == "easy")
						{
							this.score -= 5;
						}
						else if(this.level == "normal")
						{
							this.score -= 10;
						}
						else if(this.level == "hard")
						{
							this.score -= 20;
						}

						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						var showtime = 5000;
						/*setTimeout (()=>{
							for (var i = 0; i < arraycards.length; i++){
								Vue.set(card, i, {done: false, texture:arraycards[i]}); //gira las cartas para ponerlas boca abajo
							}
						}, showtime)*/
						if (this.score <= 0){
							alert("Game Over");
							loadpage("./phasergame.html");
						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							loadpage("./phasergame.html");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}


