
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object//end game conditions
var playerCharacter = 0;
var enemyCharacter = 0;

function Character(name, healthPower, attackPower, counterAttackPower) {
	//this is a constructor. Each individual character will be constructed from this blueprint
	//characters have health, attackpower, counterattackpower properties
	//characters have attack, counterattack, healthloss methods
	this.name = name;
	this.healthPower = healthPower;
	this.attackPower = attackPower;
	this.attackCount = 0;
	this.counterAttackPower = counterAttackPower;
	this.attack = function () {
		//attack! returns attack value
		this.attackCount++;
		return this.attackPower * this.attackCount;
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
			playerCharacter = 0;
		}

		console.log(playerCharacter.healthPower + "player character health");
	}
	else {
		if (enemyCharacter.healthPower <= 0) {
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

	},
	printAttack: function () {
		$("#attackStats").text(playerCharacter.name + " did " + playerCharacter.attackPower + " damage against " + enemyCharacter.name + "." + " In return, " + enemyCharacter.name + " did " + enemyCharacter.counterAttackPower + " damage against " + playerCharacter.name + ".")
	},

	printHealth: function () {
		$("#playerCharacter").append("<p>" + playerCharacter.healthPower + "</p>");
		$("#enemyCharacter").append("<p>" + enemyCharacter.healthPower + "</p>");
	},

	printWin: function () {

		$("#gameState").prepend("Yay, you won! The world is safe!");

	},
	//on click run attack function
	//onclick init game function

}
function displayGame() {
	$("#enemyCharacter").children().empty();
	// appearance.printHealth.empty();
	$("#gameState").empty();
	$("#defenderArea").empty();
	$("#characterDiv").empty();
	for (var i = 0; i < defenderList.length; i++) {
		if (isGameInit()) {
			$("#characterDiv").append("<p>" + defenderList[i].name + "</p>");
		}
		else if (isPickEnemy()) {

			$("#defenderArea").append("<p>" + defenderList[i].name + "</p>");
			console.log("defender list at " + i);
		}
		else if (isAttackStage()) {

			$("#defenderArea").append("<p>" + defenderList[i].name + "</p>");
		}
	}
	setUpActions();

	// appearance.printAttack();
	appearance.printHealth();
	if (playerCharacter !== 0) {
		$("#playerCharacter").text(playerCharacter.name);
	}
	else {
		$("#playerCharacter").text("");
	}
	if (enemyCharacter !== 0) {
		$("#enemyCharacter").text(enemyCharacter.name);
	}
	else {
		$("#enemyCharacter").text("");
	}

	if (didYouWin()) {
		appearance.printWin();
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
