class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods;

    this.proxy(this.$data)
    // 监视data中的数据
    new Observer(this.$data);
    // 渲染data中的数据
    new Compiler(this.$el, this);
  }
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] == newValue) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
