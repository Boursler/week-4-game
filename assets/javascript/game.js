
//set characters globally
var playerCharacter = 0;
var enemyCharacter = 0;
var deadCharacter = 0;
var char1;
var char2;
var char3;
var char4;
//globally defined array of characters
var defenderList = [char1, char2, char3, char4];

function Character(name, healthPower, attackPower, counterAttackPower, image) {
	//this is a constructor. Each individual character will be constructed from this blueprint
	//characters have name, health, attackpower, counterattackpower, image properties
	//characters have attack, counterattack, healthloss methods
	this.name = name;
	this.healthPower = healthPower;
	this.attackPower = attackPower;
	this.newAttackPower = attackPower;
	this.attackCount = 0;
	this.counterAttackPower = counterAttackPower;
	this.image = image;
	this.attack = function () {
		//attack! returns attack value
		this.attackCount++;
		this.newAttackPower = this.attackPower * this.attackCount;
		return this.newAttackPower;
	};
	this.counterAttack = function () {
		//attack back! returns counter attack value
		return this.counterAttackPower;
	};
	this.healthLoss = function (value) {
		//lose health. takes value passed in with attack amount, reduces overall health by that
		//returns health
		if (this.healthPower > 0) {
			this.healthPower -= value;
			return this.healthPower;
		}
	}
}
//check the current game state
function isRoundOver() {

	if (enemyCharacter.healthPower <= 0) {
		return true;
	}
	else {
		return false;
	}
}
function isGameInit() {
	if (playerCharacter === 0 && enemyCharacter === 0) {
		return true;
	}
	else {
		return false;
	}
}
function isPickEnemy() {
	if (typeof (playerCharacter) === "object" && enemyCharacter === 0 && defenderList.length !== 0) {
		return true;
	}
	else {
		return false;
	}
}
function isAttackStage() {
	if (typeof (playerCharacter) === "object" && typeof (enemyCharacter) === "object") {
		return true;
	}
	else {
		return false;
	}
}
function isGameOver() {
	if (playerCharacter === 0 && enemyCharacter !== 0) {

		return true;
	}
	else if (didYouWin()) {
		return true;
	}
	else {
		return false;
	}
}
function didYouWin() {
	if (defenderList.length === 0 && enemyCharacter === 0) {
		return true;
	}
	else {
		return false;
	}

}
//perform attack and counter attack functions based on logic check for whether all characters are alive or one is dead
function attackRound() {
	enemyCharacter.healthLoss(playerCharacter.attack());
	if (!isRoundOver()) {
		playerCharacter.healthLoss(enemyCharacter.counterAttack());
		if (playerCharacter.healthPower <= 0) {
			deadCharacter = playerCharacter;
			playerCharacter = 0;
		}
	}
	else {
		if (enemyCharacter.healthPower <= 0) {
			deadCharacter = enemyCharacter;
			enemyCharacter = 0;
		}
		else {

		}
	}
}
function initGame() {
	//game starts with full defender list and beginning stats
	playerCharacter = 0;
	enemyCharacter = 0;
	deadCharacter = 0;
	//name, healthPower, attackPower, counterAttackPower, image
	char1 = new Character("Jon Snow", 60, 5, 10, "assets/images/jonsnow.jpg");
	char2 = new Character("Daenerys Targaryen", 70, 4, 15, "assets/images/daenerysimage.jpeg");
	char3 = new Character("White Walker", 150, 1, 6, "assets/images/white_walker.jpg");
	char4 = new Character("Jaime Lannister", 100, 3, 5, "assets/images/jaimelannister.jpg");
	defenderList = [char1, char2, char3, char4];

}

function choosePlayerCharacter(remove) {
	//return an array of length 1 containing the chosen player character, then get the value in that array
	//this also shortens defenderList at remove index
	playerCharacter = defenderList.splice(remove, 1);
	playerCharacter = playerCharacter[0];

}


function chooseEnemyCharacter(remove) {
	enemyCharacter = defenderList.splice(remove, 1);
	enemyCharacter = enemyCharacter[0];
}

function indexToRemove(char) {
	//determine which index needs to be spliced from defenderList
	var remove;
	for (var i = 0; i < defenderList.length; i++) {
		if (defenderList[i].name === char) {
			remove = i;
		}
	}

	return remove;
};
//functions for game printing
var appearance = {
	initDisplay: function () {
		//start a new game and draw it
		initGame();
		displayGame();
	},
	printCharacter: function (id, character, classKey) {
		//set the html of a passed-in id using output of printCharacterDiv and desired classes
		id.html(appearance.printCharacterDiv(character, classKey));


	},
	printCharacterDiv: function (character, classKey) {
		//returns desired html for a character in a bootstrap card, including image, name and health
		return "<div class='" + classKey + " card'> <img src='" + character.image + "'/><div class=charName>" + character.name + "</div>" + "<div class=charhealth>" + character.healthPower + "</div></div>";
	},
	assignPlayerCharacter: function () {
		if ($(this).parent().attr("id") === $("#characterDiv").attr("id")) {
			//access the clicked image's charName text and save that as the chosen playerCharacter for display as well as pass into choosePlayerCharacter for game
			var char = $(this).find(".charName").text();
			choosePlayerCharacter(indexToRemove(char));
			//draw the game
			displayGame();
		}
	},

	assignEnemyCharacter: function () {
		//do the same as above but for an enemy
		var eChar = $(this).find(".charName").text();
		chooseEnemyCharacter(indexToRemove(eChar));
		displayGame();
	},
	//perform an attack, draw the game, print the attack
	attackStage() {
		attackRound();
		displayGame();
		appearance.printAttack();
	},

	printAttack: function () {
		//print the playerCharacter's stats using deadCharacter and print the enemyCharacter's stats
		if (playerCharacter === 0) {
			$("#attackStats").text(deadCharacter.name + " did " + deadCharacter.newAttackPower + " damage against " + enemyCharacter.name + "." + " In return, " + enemyCharacter.name + " did " + enemyCharacter.counterAttackPower + " damage against " + deadCharacter.name + ".");
		}
		//print the enemyCharacter's stats using deadCharacter and print the playerCharacter's stats
		else if (enemyCharacter === 0) {
			$("#attackStats").text(playerCharacter.name + " did " + playerCharacter.newAttackPower + " damage against " + deadCharacter.name + ".");
		}
		//otherwise both fighting characters are alive, print each's stats
		else {
			$("#attackStats").text(playerCharacter.name + " did " + playerCharacter.newAttackPower + " damage against " + enemyCharacter.name + "." + " In return, " + enemyCharacter.name + " did " + enemyCharacter.counterAttackPower + " damage against " + playerCharacter.name + ".")
		}
	},

	printWin: function () {
		//give a win statement
		$("#gameState").prepend("Yay, you won! The world is safe!");

	},
	printLoss: function () {
		//give a loss statement
		$("#gameState").prepend("Oh no, you lost!");
	}
}

function displayGame() {
	//each time this is called, empty the previous information and re-draw with most up-to-date
	$("#enemyCharacter").children().empty();
	$("#gameState").empty();
	$("#defenderArea").empty();
	$("#characterDiv").empty();
	$("#attackStats").empty();
	for (var i = 0; i < defenderList.length; i++) {
		if (isGameInit()) {
			$("#characterDiv").append(appearance.printCharacterDiv(defenderList[i], "defender"));
		}
		else {
			$("#defenderArea").append(appearance.printCharacterDiv(defenderList[i], "defender"));
		}
	}
	setUpActions();

	if (isGameInit()) {
		$("#playerCharacter").text("");
	}
	else {
		if (playerCharacter === 0) {
			appearance.printCharacter($("#playerCharacter"), deadCharacter, "playerChar");
		}
		else {

			appearance.printCharacter($("#playerCharacter"), playerCharacter, "playerChar");
		}
	}
	if (enemyCharacter !== 0) {
		appearance.printCharacter($("#enemyCharacter"), enemyCharacter, "enemyChar");
	}
	else {
		$("#enemyCharacter").text("");
	}

	if (didYouWin()) {
		appearance.printWin();
	}
	if (isGameOver() && !didYouWin()) {
		appearance.printLoss();
	}
}

function setUpActions() {
	//turn off all on "click" events in order to turn them on according to game state
	$(".defender").off("click");
	$("#attackButton").off("click");
	$("#resetButton").off("click");
	//resetButton is available as long as the game is being played
	$("#resetButton").click(appearance.initDisplay);
	//only other action available is choose a character
	if (isGameInit()) {
		$(".defender").click(appearance.assignPlayerCharacter);
	}
	//only other action available is choose an enemy
	else if (isPickEnemy()) {
		$(".defender").click(appearance.assignEnemyCharacter);
	}
	//only other action available is attack
	else if (isAttackStage()) {

		$("#attackButton").click(appearance.attackStage);
	}
	else if (isGameOver()) {

	}
}

$(document).ready(function () {
	//set up a game so user may begin play at their leisure
	initGame();
	displayGame();
});
