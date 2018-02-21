//this is a constructor. Each individual character will be constructed from this blueprint
function Character() {
	//characters have health, attackpower, counterattackpower properties
	//characters have attack, counterattack, healthloss methods
	this.healthPower;
	this.attackPower;
	this.counterAttackPower;
	this.attack = function () {
		//attack! returns attack value
	};
	this.counterAttack = function () {
		//attack back! returns counter attack value
	};
	this.healthLoss = function (value) {
		//lose health. takes value passed in with attack amount, reduces overall health by that
		//returns health
	}
}
var playerCharacter = new Character
