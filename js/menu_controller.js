function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	loadpage("./html/phasergame.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

function play(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("../html/playPhaser.html");
}

function optionsPhaser(){
	loadpage("../html/optionsPhaser.html");
}

function loadPhaser(){
	loadpage("../html/loadPhaser.html");
}

