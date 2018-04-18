
/*
	// http://www.php.cn/js-tutorial-351015.html
	定义
		为一个对象提供一个代用品或占位符，以便控制对它的访问。


*/

class Real {
	doSomething() {
		console.log('do something ...')
	}
}

class Proxy extends Real {
	constructor() {
		super()
	}

	doSomething () {
		setTimeout(super.doSomething, 1000 * 3)
	}
}


new Proxy().doSomething() // after 3s , do something ...