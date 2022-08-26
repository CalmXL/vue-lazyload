import { imgLoad } from "./utils";

export default class Lazyimg {
  constructor ({ el, src, options, imgRender }) {
    this.el = el;
    this.src = src;
    this.options = options;
    this.imgRender = imgRender;
    this.loaded = false;
    
    this.state = {
      loading: false,
      error: false
    }
  }

  // 检查是否看的见元素
  checkIsVisible () {
    // 获取当前元素的大小及相对于视口的位置 -> 此处获取 top
    const { top } = this.el.getBoundingClientRect();
    // top 是否小于 当前 所配置的高度 默认 1.3倍
    return top < window.innerHeight * (this.options.preload || 1.3)
  }
  // 加载img
  loadImg () {
    
    this.imgRender(this, 'loading');

    imgLoad(this.src).then(() => {
      this.state.loading = true;
      this.imgRender(this, 'ok');
      this.loaded = true;
    }, () => {
      this.state.loading = true;
      this.imgRender(this, 'error');
      this.loaded = true;
    })
  }
}