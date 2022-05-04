class GameMode extends Phaser.Scene {
    constructor (){
        super('GameMode');
		//username = '';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.numCards = 4; //numero de cartas elegidas por el usuario 
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
		let arraycards = ['cb', 'co', 'sb', 'so', 'tb', 'to']; //array con todos los tipos de cartas

		this.cameras.main.setBackgroundColor(0xBFFCFF); //fondo
		
		arraycards.sort(function(){return Math.random() - 0.5}); //mueve los tipos de cartas aleatoriamente
		arraycards = arraycards.slice(0,this.numCards); // coge la cantidad de cartas determinadas por el numCards
		arraycards = arraycards.concat(arraycards); // duplica las cartas elegidas para formar parejas
		arraycards.sort(function(){return Math.random() - 0.5}); // mueve los tipos de cartas aleatoriamente

		// dependiendo de la cantidad de cartas se ajusta la variable position que determina la posicion de las cartas
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
		for (var j = 0; j < arraycards.length; j++){ // inserta las cartas
			this.add.image((position+50), 300, arraycards[j]);
			position += 100;
		}

		this.cards = this.physics.add.staticGroup();

		// dependiendo de la cantidad de cartas se ajusta la variable position que determina la posicion de las cartas
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
		var showtime = 1000;
		setTimeout (()=>{
			for (var j = 0; j < arraycards.length; j++){ // coloca el back de las cartas
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
							
							this.score -= 20;
							
							this.firstClick.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
							
							//for (var i = 0; i < arraycards.length; i++){
							//	this.card[i].setVisible(false); //gira las cartas para ponerlas boca arriba
							//}
							//setTimeout (()=>{
								console.log("Tobe");
								console.log("Fly");
								if (this.score <= 0){
									alert("Game Over");
									console.log("High");
									loadpage("./phasergame.html");
								}
								console.log("ase");
							//}, showtime)
						}
						else{
							console.log("to");
							this.correct++;
							if (this.correct >= 4){
								console.log("chitto");
								alert("You Win with " + this.score + " points.");
								loadpage("./playPhaserMode2.html");
								console.log("namidade");
							}
						}
						this.firstClick = null;
						console.log("hikari");
					}
					else{
						console.log("tsubasa");
						this.firstClick = card;
					}
					console.log("de");
				}, card);
			});
		}, showtime)
	}
	
	update (){	}
}


