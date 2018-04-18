/*
	定义
	提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象内部表示。
	

	迭代器的几个特点
	1、访问一个聚合对象的内容而无需暴露它的内部表示。
	2、为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作
	3、遍历的同时更改迭代器所在的集合结构可能会导致问题（比如C#的foreach里不允许修改item
	
	场景
	以常用的上传文件功能为例，在不同的浏览器环境下，选择的上传方式是不一样的。
	因为使用浏览器的上传控件进行上传速度快，可以暂停和续传，所以我们首先会优先使用控件上传。
	如果浏览器没有安装上传控件， 则使用 Flash 上传， 如果连 Flash 也没安装，
	那就只好使用浏览器原生的表单上传了

	对于集合内部结果常常变化各异，我们不想暴露其内部结构的话，
	但又想让客户代码透明地访问其中的元素，这种情况下我们可以使用迭代器模式

*/

const agg = {
	data: [1, 2, 3, 4, 5],
	[Symbol.iterator] () {
		let index = 0
		return {
			next: () => {
				if (index < this.data.length) return { value: this.data[index++], done: false}
				return { value: undefined, done: true}
			},
			hasNext: () => index < this.data.length,
			reset: () => index = 0,
			current: () => {
				index -= 1
				if (index < this.data.length) return { value: this.data[index++], done: false}
				return { value: undefined, done: true}
			}
		}
	}
}

let iter = agg[Symbol.iterator]()

console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next()) // { value: 2, done: false }
console.log(iter.current()) // { value: 2, done: false }
console.log(iter.hasNext()) // true
console.log(iter.reset()) // 0
console.log(iter.next()) // { value: 1, done: false }

for (let ele of agg) {
	console.log(ele)
}