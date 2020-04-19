let CompileUtil = {
  mustache(node, vm) {
    let txt = node.textContent;
    let reg = /\{\{(.+)\}\}/;
    if (reg.test(txt)) {
      let expr = RegExp.$1.trim();
      node.textContent = txt.replace(reg, this.getVMValue(vm, expr));

      window.watcher = new Watcher(vm, expr, (newValue) => {
        console.log('111', newValue)
        node.textContent = txt.replace(reg, newValue);
      });
    }
  },
  // 处理v-text指令
  text(node, vm, expr) {
    node.textContent = this.getVMValue(vm, expr);
    // 通过watcher对象，监听expr的数据的变化，一旦变化了，执行回调函数
    new Watcher(vm, expr, (newValue, oldValue) => {
      node.textContent = newValue;
    });
  },
  html(node, vm, expr) {
    node.innerHTML = this.getVMValue(vm, expr);
    new Watcher(vm, expr, (newValue) => {
      node.innerHTML = newValue;
    });
  },
  model(node, vm, expr) {
    let self = this;
    node.value = this.getVMValue(vm, expr);
    // 实现双向的数据绑定， 给node注册input事件，当当前元素的value值发生改变，修改对应的数据
    node.addEventListener("input", function () {
      self.setVMValue(vm, expr, this.value);
    });
    new Watcher(vm, expr, (newValue) => {
      node.value = newValue;
    });
  },
  eventHandler(node, vm, type, expr) {
    // 给当前元素注册事件即可
    let eventType = type.split(":")[1];
    let fn = vm.$methods && vm.$methods[expr];
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm));
    }
  },
  // 这个方法用于获取VM中的数据，处理复杂数据 例如：car.color
  getVMValue(vm, expr) {
    // 获取到data中的数据
    let data = vm.$data;
    expr.split(".").forEach((key) => {
      data = data[key];
    });
    return data;
  },
  setVMValue(vm, expr, value) {
    let data = vm.$data;
    // car brand
    let arr = expr.split(".");

    arr.forEach((key, index) => {
      // 如果index是最后一个
      if (index < arr.length - 1) {
        data = data[key];
      } else {
        data[key] = value;
      }
    });
  },
};
