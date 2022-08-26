import Lazyimg from "./lazyimg";
import { getScrollParent } from "./utils";

// 返回一个 Lazyload 的类
export default function lazyload (Vue) {

  return class Lazyload {
    constructor (options) {
      this.options = options;
      this.isAddScrollerListener = false;
      this.lazyImgPool = [];
    }


    /**
     * 钩子函数: 
     *    bind： 只调用一次
     *  
     * 钩子函数参数: 
     *    el: 指令所绑定的元素
     *    binding: {
     *      name: 指令名， 不包含v-前缀
     *      value: 指令的绑定值 
     *    }
     */
    bindLazy (el, bindings, vnode) {
      // 在下次更新循环结束后执行延迟回调。
      Vue.nextTick(() => {
        // 获取滚动容器
        const scrollParent = getScrollParent(el);
        // 绑定滚动事件
        if (scrollParent && !this.isAddScrollerListener) {
          scrollParent.addEventListener(
            'scroll',
            this.handleScroll.bind(this), 
            false
          );
        }
        // 实例化 Lazyimg
        const lazyImg = new Lazyimg({
          el, 
          src: bindings.value,
          options: this.options,
          imgRender: this.imgRender.bind(this)
        })
        // 将实例化的lazyImg 存储到lazyImgPool
        this.lazyImgPool.push(lazyImg);
        this.handleScroll();// 初始化显示
        // console.log(this.lazyImgPool);
      })
    }

    handleScroll () {
      let isVisible = false; // 是否可见
      // 遍历 lazyImgPool
      this.lazyImgPool.forEach(lazyImg => { 
        // 当 图片实例没有加载
        if (!lazyImg.loaded) {
          // 检测当前实例是否应该加载
          isVisible = lazyImg.checkIsVisible();
          // 应该加载 + loadImg()
          isVisible && lazyImg.loadImg();
        }
      })
    }

    // 图片渲染
    imgRender (lazyImg, state) {
      const { el, options } = lazyImg;
      const { loading, error } = options;
      let src = '';
      // 判断状态 设置 src 的路径
      switch (state) {
        case 'loading': 
          src = loading || '';
          break;
        case 'error': 
          src = error || '';
          break;
        default:
          src = lazyImg.src;
          break;
      }
      // 设置元素的 src
      el.setAttribute('src', src);
    }
  }
}