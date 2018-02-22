
//eventually, clicking your character will run the constructor on that character and set playerCharacter or enemyCharacter equal to their object
var playerCharacter = [];
var enemyCharacter;
var char1 = "char1";
var char2 = "char2";
var char3 = "char3";
var char4 = "char4";
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


$(document).ready(function () {
	//here is where the first user input will be taken by a click event, kicking off the game and setting the machine into motion. No function will be called before this function
});
