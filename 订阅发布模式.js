/*
	定义
		又叫观察者模式，它定义了对象间的一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
		当一个对象发生改变时，所有依赖于它的对象都将得到通知。

		观察者模式无非就两个部分，一个订阅(监听程序),一个发布(触发事件).而他们中间的链接枢纽就是事件。 
		通常来说，我们可以自定义一个观察者模式--使用自定义事件.

*/

class Event {
  constructor() {
    this.subscribers = new Map([['any', []]]);
  }

  on(fn, type = 'any') {
    let subs = this.subscribers;
    if (!subs.get(type)) return subs.set(type, [fn]);
    subs.set(type, (subs.get(type).push(fn)));
  }

  emit(content, type = 'any') {
    for (let fn of this.subscribers.get(type)) {
      fn(content);
    }
  }
}

let event = new Event();

event.on((content) => console.log(`get published content: ${content}`), 'myEvent');
event.emit('jaja', 'myEvent'); //get published content: jaja