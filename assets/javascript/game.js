
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object//end game conditions
var playerCharacter = [];
var enemyCharacter;

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
		return this.attackPower *= this.attackCount;
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

function isGameOver() {
	if (playerCharacter.healthPower <= 0) {
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
	if (defenderList.length === 0) {
		return true;
	}
	else {
		return false;
	}

}
function attackRound() {
	enemyCharacter.healthLoss(playerCharacter.attack());
	if (!isRoundOver()) {
		playerCharacter.healthLoss(enemyCharacter.counterAttack());
	}
	else {
		if (!isGameOver()) {
			chooseCharacter(char);
		}
		else {
			//keep going
		}
	}
}
function initGame() {
	//game starts with full defender list and beginning stats
	playerCharacter = [];
	char1 = new Character("char1", 50, 5, 10);
	char2 = new Character("char2", 70, 15, 20);
	char3 = new Character("char3", 200, 20, 500);
	char4 = new Character("char4", 15, 20, 5);
	defenderList = [char1, char2, char3, char4];
	chooseCharacter(char);

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


	assignPlayerCharacter: $("p").click(function () {
		//if click on something in characterDiv, it goes to playerCharacter area
		//if click on something in defender area, it goes to enemyCharacter area

		if ($(this).parent().attr("id") === $("#characterDiv").attr("id")) {
			$("#playerCharacter").append($(this));
			//call choosecharacter maybe
			var char = $(this).text();
			choosePlayerCharacter(char, indexToRemove(char));
			var defenders = $("#characterDiv").children();
			$("#defenderArea").append(defenders);
		}
	}),
	assignEnemyCharacter: $("p").click(function () {

		if ($(this).parent().attr("id") === $("#defenderArea").attr("id")) {
			$("#enemyCharacter").append($(this));
			var eChar = $(this).text();
			chooseEnemyCharacter(eChar, indexToRemove(eChar));
			console.log(enemyCharacter.name + " enemyCharacter");
		}
	}),

	removeEnemyCharacter:
		$("#resetButton").click(function () {
			if (enemyCharacter.healthPower <= 0) {
				$("#enemyCharacter").children().empty();
			}
		}),

	printAttack: function () {
		$("#attackStats").text(this.playerCharacter.name + " did " + this.playerCharacter.attackPower + " damage against " + this.enemyCharacter.name + "." + " In return, " + this.enemyCharacter.name + " did " + this.enemyCharacter.counterAttackPower + " damage against " + this.playerCharacter.name + ".")
	},
	printHealth: function () {
		$("#playerCharacter").append("<p>" + this.playerCharacter.healthPower + "</p>");
		$("#enemyCharacter").append("<p>" + this.enemyCharacter.healthPower + "</p>");
	},
	printWin: function () {
		if (didYouWin()) {
			$("#gameState").prepend("Yay, you won! The world is safe!");
		}
	}
	//on click run attack function
	//onclick init game function

}




$(document).ready(function () {
	//here is where the first user input will be taken by a click event, kicking off the game and setting the machine into motion. No function will be called before this function
});
