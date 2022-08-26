// 获取滚动容器
export function getScrollParent (el) {
  let _parent = el.parentNode.parentNode.parentNode;

  while (_parent) {
    // 获取 父元素的overflow属性
    let styleOverflow = getComputedStyle(_parent)['overflow'];
    if (/(scroll)|(auto)/.test(styleOverflow)) {
      // 判断元素 overflow -> auto
      return _parent;
    }
    _parent = _parent.parentNode;
  }
}

// 图片加载
export function imgLoad (src) {
  return new Promise((resolve, reject) => {
    const oImg = new Image();
    oImg.src = src;
    // 通过请求资源 判断资源是否有问题
    oImg.onload = resolve;
    oImg.onerror = reject;
  })
}