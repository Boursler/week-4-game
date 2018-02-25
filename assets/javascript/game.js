
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object//end game conditions
var playerCharacter = 0;
var enemyCharacter = 0;
var deadCharacter = 0;
var char1;
var char2;
var char3;
var char4;

function Character(name, healthPower, attackPower, counterAttackPower, image) {
	//this is a constructor. Each individual character will be constructed from this blueprint
	//characters have health, attackpower, counterattackpower properties
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
	char1 = new Character("Jon Snow", -1, 5, 10, "assets/images/jonsnow.jpg");
	char2 = new Character("Daenerys Targaryen", 70, 15, 20, "assets/images/daenerysimage.jpeg");
	char3 = new Character("White Walker", 200, 20, 500, "assets/images/white_walker.jpg");
	char4 = new Character("Jaime Lannister", 15, 20, 5, "assets/images/jaimelannister.jpg");
	defenderList = [char1, char2, char3, char4];
}

function choosePlayerCharacter(remove) {
	//if a good guy has not been chosen yet, character is good guy
	playerCharacter = defenderList.splice(remove, 1);
	playerCharacter = playerCharacter[0];
	console.log(playerCharacter.name + "choosePlayerCharacter choice");
}


function chooseEnemyCharacter(remove) {
	enemyCharacter = defenderList.splice(remove, 1);
	enemyCharacter = enemyCharacter[0];
}

function indexToRemove(char) {
	var remove;
	console.log(typeof (char) + "type of char and char is " + char);
	for (var i = 0; i < defenderList.length; i++) {
		// console.log(defenderList[i].name + "defenderList stuff that's going on" + typeof (defenderList[i].name));
		console.log(defenderList[i].name + " === " + char);
		// console.log(typeof (defenderList[i].name + ))
		console.log(defenderList[i].name === char);
		if (defenderList[i].name === char) {
			remove = i;
		}
	}
	console.log(remove + " removed index");
	return remove;
};

var appearance = {
	initDisplay: function () {
		initGame();
		displayGame();
	},
	printCharacter: function (id, character, classKey) {
		id.html(appearance.printCharacterDiv(character, classKey));


	},
	printCharacterDiv: function (character, classKey) {
		return "<div class='" + classKey + " card'> <img src='" + character.image + "'/><div class=charName>" + character.name + "</div>" + "<div class=charhealth>" + character.healthPower + "</div></div>";
	},
	assignPlayerCharacter: function () {

		//if click on something in characterDiv, it goes to playerCharacter area
		//if click on something in defender area, it goes to enemyCharacter area

		if ($(this).parent().attr("id") === $("#characterDiv").attr("id")) {

			//call choosecharacter maybe
			var char = $(this).find(".charName").text();
			console.log(char + "character choice");
			choosePlayerCharacter(indexToRemove(char));
			displayGame();
		}
	},

	assignEnemyCharacter: function () {
		var eChar = $(this).find(".charName").text();
		chooseEnemyCharacter(indexToRemove(eChar));
		console.log(enemyCharacter.name + " enemy character choice");
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
	$(".defender").off("click");
	$("#attackButton").off("click");
	$("#resetButton").click(appearance.initDisplay);
	console.log("hello world");
	if (isGameInit()) {
		$(".defender").click(appearance.assignPlayerCharacter);
		console.log(isGameInit() + " isGameInit stage");
	}
	else if (isPickEnemy()) {
		console.log(isPickEnemy() + " isPickEnemy state?")
		$(".defender").click(appearance.assignEnemyCharacter);
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
