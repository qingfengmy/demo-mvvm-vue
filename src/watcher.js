/* 
watcher模块负责把compile模块与observe模块关联起来
*/
class Watcher {
  // vm: 当前的vue实例
  // expr: data中数据的名字
  // 一旦数据发生了改变，需要调用cb
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    // this表示的就是新创建的watcher对象
    dep.addSub(this)
    // 需要把expr的旧值给存储起来
    this.oldValue = CompileUtil.getVMValue(vm, expr);
  }

  // 对外暴漏的一个方法，这个方法用于更新页面
  update() {
    // 对比expr是否发生了改变，如果发生了改变，需要调用cb
    let oldValue = this.oldValue;
    let newValue = CompileUtil.getVMValue(this.vm, this.expr);
    if (oldValue != newValue) {
      this.cb(newValue, oldValue);
    }
  }
}
