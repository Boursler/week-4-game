
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object//end game conditions
var playerCharacter = 0;
var enemyCharacter = 0;
var deadCharacter = 0;

function Character(name, healthPower, attackPower, counterAttackPower) {
	//this is a constructor. Each individual character will be constructed from this blueprint
	//characters have health, attackpower, counterattackpower properties
	//characters have attack, counterattack, healthloss methods
	this.name = name;
	this.healthPower = healthPower;
	this.attackPower = attackPower;
	this.newAttackPower = attackPower;
	this.attackCount = 0;
	this.counterAttackPower = counterAttackPower;
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
var char1 = new Character("char1", -1, 5, 10);
var char2 = new Character("char2", 70, 15, 20);
var char3 = new Character("char3", 200, 20, 500);
var char4 = new Character("char4", 15, 20, 5);
var defenderList = [char1, char2, char3, char4];

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

function attackRound() {
	enemyCharacter.healthLoss(playerCharacter.attack());
	console.log(enemyCharacter);
	if (!isRoundOver()) {
		playerCharacter.healthLoss(enemyCharacter.counterAttack());
		if (playerCharacter.healthPower <= 0) {
			deadCharacter = playerCharacter;
			playerCharacter = 0;
			console.log(deadCharacter.name + "dead character");
		}

		console.log(playerCharacter.healthPower + "player character health");
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
	char1 = new Character("char1", 50, 5, 10);
	char2 = new Character("char2", 70, 15, 20);
	char3 = new Character("char3", 200, 20, 500);
	char4 = new Character("char4", 15, 20, 5);
	defenderList = [char1, char2, char3, char4];
}

function choosePlayerCharacter(char, remove) {
	//if a good guy has not been chosen yet, character is good guy
	playerCharacter = defenderList.splice(remove, 1);
	playerCharacter = playerCharacter[0];
}

function chooseEnemyCharacter(eChar, remove) {
	enemyCharacter = defenderList.splice(remove, 1);
	enemyCharacter = enemyCharacter[0];
}

function indexToRemove(char) {
	var remove;
	for (var i = 0; i < defenderList.length; i++) {
		if (defenderList[i].name === char) {
			remove = i;
		}
	}
	return remove;
};

var appearance = {
	initDisplay: function () {
		initGame();
		displayGame();
	},
	assignPlayerCharacter: function () {

		//if click on something in characterDiv, it goes to playerCharacter area
		//if click on something in defender area, it goes to enemyCharacter area

		if ($(this).parent().attr("id") === $("#characterDiv").attr("id")) {

			//call choosecharacter maybe
			var char = $(this).text();
			choosePlayerCharacter(char, indexToRemove(char));
			displayGame();
		}
	},

	assignEnemyCharacter: function () {
		var eChar = $(this).text();
		chooseEnemyCharacter(eChar, indexToRemove(eChar));
		displayGame();
	},

	attackStage() {
		attackRound();
		displayGame();
		appearance.printAttack();

	},

	printAttack: function () {

		if (playerCharacter === 0) {
			$("#attackStats").text(deadCharacter.name + " did " + deadCharacter.newAttackPower + " damage against " + enemyCharacter.name + "." + " In return, " + enemyCharacter.name + " did " + enemyCharacter.counterAttackPower + " damage against " + deadCharacter.name + ".");
		}
		else if (enemyCharacter === 0) {
			$("#attackStats").text(playerCharacter.name + " did " + playerCharacter.newAttackPower + " damage against " + deadCharacter.name + ".");
		}
		else {
			$("#attackStats").text(playerCharacter.name + " did " + playerCharacter.newAttackPower + " damage against " + enemyCharacter.name + "." + " In return, " + enemyCharacter.name + " did " + enemyCharacter.counterAttackPower + " damage against " + playerCharacter.name + ".")
		}
	},



	printWin: function () {

		$("#gameState").prepend("Yay, you won! The world is safe!");

	},
	printLoss: function () {
		$("#gameState").prepend("Oh no, you lost!");
	}
	//on click run attack function
	//onclick init game function

}
function displayGame() {
	$("#enemyCharacter").children().empty();

	$("#gameState").empty();
	$("#defenderArea").empty();
	$("#characterDiv").empty();
	$("#attackStats").empty();
	for (var i = 0; i < defenderList.length; i++) {
		if (isGameInit()) {
			$("#characterDiv").append("<p>" + defenderList[i].name + " " + defenderList[i].healthPower + "</p>");
		}
		else {
			$("#defenderArea").append("<p>" + defenderList[i].name + " " + defenderList[i].healthPower + "</p>");
		}
	}
	setUpActions();

	if (isGameInit()) {
		$("#playerCharacter").text("");
	}
	else {
		if (playerCharacter === 0) {
			$("#playerCharacter").text(deadCharacter.name + " " + deadCharacter.healthPower);
		}
		else {
			$("#playerCharacter").text(playerCharacter.name + " " + playerCharacter.healthPower);
		}
	}
	if (enemyCharacter !== 0) {
		$("#enemyCharacter").text(enemyCharacter.name + " " + enemyCharacter.healthPower);
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
	$("p").off("click");
	$("#attackButton").off("click");
	$("#resetButton").click(appearance.initDisplay);
	console.log("hello world");
	if (isGameInit()) {
		$("p").click(appearance.assignPlayerCharacter);
		console.log(isGameInit() + " isGameInit stage");
	}
	else if (isPickEnemy()) {
		console.log(isPickEnemy() + " isPickEnemy state?")
		$("p").click(appearance.assignEnemyCharacter);
	}
	else if (isAttackStage()) {
		console.log(isAttackStage() + " isAttack stage")
		$("#attackButton").click(appearance.attackStage);
	}
	else if (isGameOver()) {
		console.log("game is over" + isGameOver());
	}
}

$(document).ready(function () {
	//here is where the first user input will be taken by a click event, kicking off the game and setting the machine into motion. No function will be called before this function
	initGame();
	displayGame();

});
