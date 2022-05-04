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
		this.numCards = 2; //numero de cartas elegidas por el usuario 
		this.level = "normal"; //nivel elegido por el usuario 
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

		let arraycards = ['cb', 'co', 'sb', 'so', 'tb', 'to']; //array con todos los tipos de cartas

		this.cameras.main.setBackgroundColor(0xBFFCFF); //fondo
		
		arraycards.sort(function(){return Math.random() - 0.5}); //mueve los tipos de cartas aleatoriamente
		this.numCards = options_data.cards; // iguala el numCards al numero de cartas elegidas por el usuario
		this.level = options_data.dificulty; // iguala el nivel al nivel elegido por el usuario
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
		// dependiendo del nivel reduce mas o menos el tiempo
		var showtime = 5000;
		if(this.level == "normal")
		{
			showtime = 2500;
		}
		else if(this.level == "hard")
		{
			showtime = 1000;
		}

		setTimeout (()=>{
			for (var j = 0; j < arraycards.length; j++){ // coloca el back de las cartas
				this.cards.create((position+50), 300, 'back');
				position += 100;
				console.log(j);
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
							// dependiendo del nivel reduce mas o menos la cantidad de puntos
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
							
							//FALTA GIRAR LAS CARTAS CUANDO HAY UN ERROR
							//
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
								let partida = {
									username: this.username,
									score: this.score
								}
								let arrayPartides = [];
								if(localStorage.partides){
									arrayPartides = JSON.parse(localStorage.partides);
									if(!Array.isArray(arrayPartides)) arrayPartides = [];
								} //GUARDA LA PARTIDA TERMINADA CON LA PUNTUACION
								arrayPartides.push(partida);
								localStorage.partides = JSON.stringify(arrayPartides);
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
		}, 1000);
	}
	update (){	}
}


