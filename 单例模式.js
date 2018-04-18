/*
	单例核心思想
	用一个变量来标志当前是否已经为某个类创建过对象，
	如果是，则在下一次获取该类的实例时，直接返回之前创建的对象

	单例满足的条件
	1、只有一个实例
	2、全局访问

	单例模式目的
	多人开发时就能很好的解决命名冲突的问题，以及可以更好的维护代码，更好的控制代码。

	单例常用场景
	只需要生成一个唯一对象的时候，比如说页面登录框，
	只可能有一个登录框，那么你就可以用单例的思想去实现他，
	当然你不用单例的思想实现也行，
	那带来的结果可能就是你每次要显示登陆框的时候都要重新生成一个登陆框并显示（耗费性能），
	或者是不小心显示出了两个登录框
*/

// 处理单个对象是否创建过
const __instance = (() => {
	let instance
	return newInstance => {
		if (newInstance) instance = newInstance
		return instance
	}
})()

class Person {
	constructor(name) {
		if (__instance()) return __instance()
		// 按自己需求实例化
		this.foo = name
		__instance(this)
	}
}

const u1 = new Person('张三')
const u2 = new Person('李四')

console.log(u1.foo) // 张三
// 第二次实例化无效
console.log(u2.foo) // 张三
console.log(u1 === u2) // true