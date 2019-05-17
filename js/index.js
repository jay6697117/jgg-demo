!(function() {
  function run() {
    //设置图片最大数量
    let imgNum = 30;
    // 获取需要的标签
    let boxWidth, imgWidth, imgHeight, boxHeight;
    let btns = document.getElementById('top').children; //全部按钮
    let boxs = document.getElementById('bottom').children; //全部box盒子
    // 定义变量
    let containerWidth = (718 / 750) * document.documentElement.clientWidth;
    let boxPadding = (2 / 750) * document.documentElement.clientWidth;
    //创造两个数组
    let arr1 = [];
    for (let index = 0; index < imgNum; index++) {
      const elem = `因为遇见你${index + 1}`;
      arr1.push(elem);
    }
    let arr2 = [];
    for (let index = 0; index < imgNum; index++) {
      const elem = `孙怡邓伦牵手演绎刺绣奇缘${index + 1}`;
      arr2.push(elem);
    }
    //载入图片和文字节点的开关
    loadNodes(imgNum);
    let p1Height = parseFloat(
      window.getComputedStyle(document.querySelector('#bottom > .box > p:nth-of-type(1)')).height
    ); //在函数外申明为了方便调用
    let p2Height = parseFloat(
      window.getComputedStyle(document.querySelector('#bottom > .box > p:nth-of-type(2)')).height
    ); //在函数外申明为了方便调用
    //初始化两列
    jgg(3);
    // 遍历所有按钮监听点击事件
    for (let j = 2; j < btns.length + 2; j++) {
      const btn = btns[j - 2];
      btn.onclick = function() {
        jgg(j);
        p1Height = parseFloat(
          window.getComputedStyle(document.querySelector('#bottom > .box > p:nth-of-type(1)')).height
        );
        p2Height = parseFloat(
          window.getComputedStyle(document.querySelector('#bottom > .box > p:nth-of-type(2)')).height
        );
        jgg(j);
      };
    }
    function jgg(cols) {
      //750像素宽度下
      boxWidth = containerWidth / cols; //750像素设备宽度下的值
      imgWidth = boxWidth - boxPadding * 2; //750像素设备宽度下的值
      imgHeight = (308 / 220) * imgWidth; //750像素设备宽度下的值
      boxHeight = imgHeight + p1Height + p2Height + boxPadding * 2; //750像素设备宽度下的值
      console.log(boxWidth);
      console.log(boxHeight);
      console.log(p1Height);
      console.log(p2Height);
      console.log(imgWidth);
      console.log(imgHeight);
      //遍历boxs
      for (let i = 0; i < boxs.length; i++) {
        // 2.2.1 求出当前盒子所在的行和列
        let rowNum = parseInt(i / cols);
        let colNum = parseInt(i % cols);
        // console.log(`当前盒子在第${rowNum + 1}行, 第${colNum + 1}列`);
        const box = boxs[i];
        const img = boxs[i].getElementsByTagName('img')[0];
        box.style.position = 'absolute';
        //转换成px
        box.style.width = boxWidth + 'px';
        box.style.height = boxHeight + 'px';
        img.style.width = imgWidth + 'px';
        img.style.height = imgHeight + 'px';
        box.style.left = colNum * boxWidth + 'px';
        box.style.top = rowNum * boxHeight + 'px';
      }
    }
    // 加载节点
    function loadNodes(num) {
      for (let i = 0; i < num; i++) {
        let bottom = document.getElementById('bottom');
        let div = document.createElement('div');
        div.className = 'box'; //div加class
        div.innerHTML = `<img src="img/${i + 1}.jpg" alt="" /><p>${arr1[i]}</p><p>${arr2[i]}</p>`;
        bottom.appendChild(div);
      }
    }
  }

  // 首次加载应用，设置一次
  run();
  // 监听手机旋转的事件的时机，重新设置
  window.addEventListener('orientationchange', run);
  // 监听手机窗口变化，重新设置
  window.addEventListener('resize', run);
})();
