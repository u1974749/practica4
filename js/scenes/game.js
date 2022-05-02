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

class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		//username = '';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
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
		let typeCards = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
		var aiuda = options_data.cards
		if(aiuda == 2)
		{

			let arraycards = ['co', 'sb', 'co', 'sb'];
			this.cameras.main.setBackgroundColor(0xBFFCFF);
			console.log("putaaaa");
			this.add.image(250, 300, arraycards[0]);
			this.add.image(350, 300, arraycards[1]);
			this.add.image(450, 300, arraycards[2]);
			this.add.image(550, 300, arraycards[3]);
			
			this.cards = this.physics.add.staticGroup();
			
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
		}
		else if(aiuda == 3)
		{

			let arraycards = ['co', 'sb', 'co', 'sb','so','so'];
			this.cameras.main.setBackgroundColor(0xBFFCFF);
	
			this.add.image(250, 300, arraycards[0]);
			this.add.image(350, 300, arraycards[1]);
			this.add.image(450, 300, arraycards[2]);
			this.add.image(550, 300, arraycards[3]);
			this.add.image(550, 300, arraycards[4]);
			this.add.image(550, 300, arraycards[5]);
			
			this.cards = this.physics.add.staticGroup();
			
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
			this.cards.create(650, 300, 'back');
			this.cards.create(750, 300, 'back');
		}
		else
		{

			let arraycards = ['co', 'sb', 'co', 'sb','so','so'];
			this.cameras.main.setBackgroundColor(0xBFFCFF);
	
			this.add.image(250, 300, arraycards[0]);
			this.add.image(350, 300, arraycards[1]);
			this.add.image(450, 300, arraycards[2]);
			this.add.image(550, 300, arraycards[3]);
			this.add.image(550, 300, arraycards[4]);
			this.add.image(550, 300, arraycards[5]);
			
			this.cards = this.physics.add.staticGroup();
			
			this.cards.create(250, 300, 'back');
			this.cards.create(350, 300, 'back');
			this.cards.create(450, 300, 'back');
			this.cards.create(550, 300, 'back');
			this.cards.create(650, 300, 'back');
			this.cards.create(750, 300, 'back');
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
						//if(this.level == "easy")
						//{
						//	this.score -= 5;
						//}
						//else if(this.level == "normal")
						//{
						//	this.score -= 10;
						//}
						//else if(this.level == "hard")
						//{
						//	this.score -= 20;
						//}
						this.score -= 20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= 2){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
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


