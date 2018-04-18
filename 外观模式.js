
/*
	定义
		为子系统中的一组接口提供了一个一致的界面，此模块定义了一个高层接口，这个接口值得这一子系统更加容易使用

	作用
		经常被用于JavaScript类库里，通过它封装一些接口用于兼容多浏览器，
		外观模式可以让我们间接调用子系统，从而避免因直接访问子系统而产生不必要的错误。

	
*/


let nextTick = (global, setImmediate === undefined) ? process.nextTick : global.setImmediate

console.log(nextTick)