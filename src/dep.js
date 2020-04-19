/* dep对象用于管理所有的订阅者和通知这些订阅者 */
class Dep {
  constructor() {
    // 用于管理订阅者
    this.subs = [];
  }

  // 添加订阅者
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知
  notify() {
    // 遍历所有的订阅者，调用watcher的update方法
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

const dep = new Dep()