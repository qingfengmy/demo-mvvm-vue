/* 
  专门负责解析模板内容
*/
class Compiler {
    constructor(el, vm) {
      // el: new vue传递的选择器
      this.el = typeof el === "string" ? document.querySelector(el) : el
      // vm: new的vue实例
      this.vm = vm
  
      // 编译模板
      if (this.el) {
        //1. 把el中所有的子节点都放入到内存中， fragment
        let fragment = this.node2fragment(this.el)
        //2. 在内存中编译fragment
        this.compile(fragment)
        //3. 把fragment一次性的添加到页面
        this.el.appendChild(fragment)
      }
    }
  
    /* 核心方法 */
    node2fragment(node) {
      let fragment = document.createDocumentFragment()
      // 把el中所有的子节点挨个添加到文档碎片中
      let childNodes = node.childNodes
      CompilerHelper.toArray(childNodes).forEach(node => {
        // 把所有的子节点都添加到frament中
        fragment.appendChild(node)
      })
      return fragment
    }
  
    /**
     * 编译文档碎片（内存中）
     * @param {*} fragment
     */
    compile(fragment) {
      let childNodes = fragment.childNodes
      CompilerHelper.toArray(childNodes).forEach(node => {
        // 编译子节点
  
        if (CompilerHelper.isElementNode(node)) {
          // 如果是元素， 需要解析指令
          this.compileElement(node)
        }
  
        if (CompilerHelper.isTextNode(node)) {
          // 如果是文本节点， 需要解析插值表达式
          this.compileText(node)
        }
  
        // 如果当前节点还有子节点，需要递归的解析
        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node)
        }
      })
    }
  
    // 解析html标签
    compileElement(node) {
      // console.log(node)
      // 1. 获取到当前节点下所有的属性
      let attributes = node.attributes
      CompilerHelper.toArray(attributes).forEach(attr => {
        // 2. 解析vue的指令（所以以v-开头的属性）
        let attrName = attr.name
  
        if (CompilerHelper.isDirective(attrName)) {
          let type = attrName.slice(2)
          let expr = attr.value
  
          // console.log(type)
          // 解析v-on指令
          if (CompilerHelper.isEventDirective(type)) {
            CompileUtil["eventHandler"](node, this.vm, type, expr)
          } else {
            CompileUtil[type] && CompileUtil[type](node, this.vm, expr)
          }
        }
      })
    }
  
    // 解析文本节点
    compileText(node) {
      CompileUtil.mustache(node, this.vm)
    }
  }
  