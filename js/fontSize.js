!(function() {
  // 动态为根元素设置字体大小
  function init() {
    // 获取屏幕宽度
    var doc = document.documentElement;
    var docWidth = doc.clientWidth;
    // 设置根元素字体大小: 1rem === 100rpx | 0.01rem === 1rpx | 100vw就是设备的宽度 等于750rpx 等于7.5rem
    doc.style.fontSize = (docWidth / 750) * 100 + 'px';
    //测试
    // console.log('html fontSize :', doc.style.fontSize);
  }

  // 首次加载应用，设置一次
  init();
  // 监听手机旋转的事件的时机，重新设置
  window.addEventListener('orientationchange', init);
  // 监听手机窗口变化，重新设置
  window.addEventListener('resize', init);
})();
