
/*
	什么是策略模式
		客户端程序直接包含业务算法代码的话会变的复杂，这样会使客户程序庞大且难以维护，尤其是需要支持多种业务算法时。
		不同的时候需要不同的算法，我们不想支持我们并不使用的业务算法。
		当业务功能是客户程序的一个难以分割的成分时，增加新的业务算法或改变现有算法将十分困难。
		

	策略模式的定义
		定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

	使用策略模式的优点
		1. 策略模式利用组合，委托等技术和思想，有效的避免很多if条件语句。

        2. 策略模式提供了开放-封闭原则，使代码更容易理解和扩展。

        3. 策略模式中的代码可以复用。	

    使用场景
    	1、许多相关类仅仅是行为不同
    	2、需要使用一个算法的不同实现。
    	3、算法使用了客户不应该知道的数据。策略模式可以避免暴露复杂的、与算法相关的数据结构。
		4、一个类定义了很多行为，而且这些行为在这个类里的操作以多个条件语句的形式出现。策略模式将相关的条件分支移入它们各自的 Strategy 类中以代替这些条件语句。
		5、表单验证之类    

*/

let data = new Map([['first_name', 'Super'], ['last_name', 'Man'], ['age', 'unknown'], ['username', 'o_O']]);
let config = new Map([['first_name', 'isNonEmpty'], ['age', 'isNumber'], ['username', 'isAlphaNum']]);


class Checker {
	constructor(check, instructions) {
		[this.check, this.instructions] = [check, instructions]
	}
}

class Validator {
	constructor(config) {
		[this.config, this.messages] = [config, []]
	}

	validate(data) {
		for (let [k, v] of data.entries()) {
			let type = this.config.get(k)
			let checker = Validator[type]
			if (!type) continue
			let result = checker.check(v)
			if (!result) this.messages.push(checker.instructions + `**${v}**`)
		}
	}

	hasError() {
		return this.message.length !== 0
	}
}

Validator.isNumber = new Checker(val => !isNaN(val), 'the value can only be a valid number')
Validator.isNonEmpty = new Checker(val => val !== '', 'the value can not be empty')
Validator.isAlphaNum = new Checker(val => !/^a-z0-9/i.test(val), 'the value can not have special symbols')

let validator = new Validator(config)
validator.validate(data)

console.log(validator.messages.join('\n')) // //the value can only be a valid number **unknown**