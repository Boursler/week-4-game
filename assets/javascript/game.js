
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object//end game conditions
var playerCharacter = [];
var enemyCharacter;

function Character(name, healthPower, attackPower, counterAttackPower) {
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
var char1 = new Character("char1", 50, 5, 10);
var char2 = new Character("char2", 70, 15, 20);
var char3 = new Character("char3", 200, 20, 500);
var char4 = new Character("char4", 15, 20, 5);
var defenderList = [char1, char2, char3, char4];
console.log("starting defender list " + defenderList);
console.log("here's a name " + char2.name);
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
	else if (defenderList.length === 0) {
		return true;
	}
	else {
		return false;
	}
}
function playGame() {
	enemyCharacter.healthLoss(playerCharacter.attack());
	playerCharacter.healthLoss(enemyCharacter.attack());
	if (isRoundOver()) {
		if (!isGameOver()) {
			chooseCharacter(char);
		}
		else {
			//keep going
		}
	}
	else {
		initGame();
	}
}
function initGame() {
	//game starts with full defender list and beginning stats

}
function chooseCharacter(char) {
	//if a good guy has not been chosen yet, character is good guy
	var remove = defenderList.indexOf(char);
	if (playerCharacter.length === 0) {
		playerCharacter = defenderList.splice(remove, 1);
		playerCharacter = playerCharacter[0];
		console.log(defenderList);
		console.log(playerCharacter);
	}
	else {
		//otherwise, bad guy
		enemyCharacter = defenderList.splice(remove, 1);
		enemyCharacter = enemyCharacter[0];
		console.log(enemyCharacter);
	}
}
chooseCharacter(char3);
//this is a constructor. Each individual character will be constructed from this blueprint



$(document).ready(function () {
	//here is where the first user input will be taken by a click event, kicking off the game and setting the machine into motion. No function will be called before this function
});
