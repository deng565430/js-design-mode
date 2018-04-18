/*
	装饰者模式的定义：
		1、不改变对象自身的基础上，在程序运行期间给对像动态的添加职责。
		2、与继承相比，装饰者是一种更轻便灵活的做法。

	装饰者模式的特点：
		可以动态的给某个对象添加额外的职责，而不会影响从这个类中派生的其它对象；

	继承的一些缺点：
		1、继承会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；
		2、超类的内部细节对于子类是可见的，继承常常被认为破坏了封装性；	

	装饰者模式和代理模式的区别： 
		1. 代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个代替者。本体定义了关键功能，
			而代理提供了或者拒绝对他的访问，或者是在访问本体之前做一些额外的事情。 
		2. 装饰者模式的作用就是为对象动态的加入某些行为。

*/



// 使用AOP（面向切面编程）装饰函数

// 封装的before函数
// 在需要执行的函数之前执行某个新添加的功能函数

// 是新添加的函数在旧函数之前执行
Function.prototype.before=function (beforefn) {
    var _this= this;                               //保存旧函数的引用
    return function () {                           //返回包含旧函数和新函数的“代理”函数
        beforefn.apply(this,arguments);            //执行新函数,且保证this不被劫持,新函数接受的参数
                                                    // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
        return _this.apply(this,arguments);
    };
};

// 封装的after函数
// 在需要执行的函数之后执行某个新添加的功能函数

//新添加的函数在旧函数之后执行
Function.prototype.after=function (afterfn) {
    var _this=this;
    return function () {
        var ret=_this.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    };
};


class Sale {
	constructor(price) {
		[this.decoratorsList, this.price] = [[], price]
	}
	decorate(decorator) {
		if (!Sale[decorator]) throw new Error(`decorator not exist: ${decorator}`)
		this.decoratorsList.push(Sale[decorator])
	}

	getPrice () {
		for (let decorator of this.decoratorsList) {
			this.price = decorator(this.price)
		}
		return this.price.toFixed(2)
	}

	static quebec(price) {
		return price + price * 7.5 / 100
	}

	static fedtax(price) {
		return price + price * 5 / 100
	}
}

const sale = new Sale(100)

sale.decorate('fedtax')
sale.decorate('quebec')

console.log(sale.getPrice()) // 112.88