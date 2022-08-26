import Lazyload from './lazyload';

// vueLazy 插件
/**
 *  插件应该暴露一个 install 方法， 第一个参数Vue 构造器， 第二个参数 一个可选的配置对象
 */
const VueLazyload = {
  /**
   * 
   * @param {*} Vue 
   * @param {*} options 
   */
  install (Vue, options) {
    console.log(Vue.prototype);
    const LazyClass = Lazyload(Vue);
    const lazyload = new LazyClass(options);
    
    // 添加全局指令
    
    Vue.directive('lazy', {
      // el, bindings, vnode
      bind: lazyload.bindLazy.bind(lazyload)
    });
  } 
}


export default VueLazyload;