//this is a constructor. Each individual character will be constructed from this blueprint
function Character(healthPower, attackPower, counterAttackPower) {
	//characters have health, attackpower, counterattackpower properties
	//characters have attack, counterattack, healthloss methods
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
var playerCharacter;
var defenderList = [];
