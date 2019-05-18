!(function() {
  function run(colParam) {
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

    //获取盒子里面p1和p2的高度
    let p1Height = parseFloat(
      window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(1)')[imgNum - 1]).height
    ); //在函数外申明为了方便调用 建议遍历所有的盒子里面的p1取他们高度的最大值
    let p2Height = parseFloat(
      window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(2)')[imgNum - 1]).height
    ); //在函数外申明为了方便调用 建议遍历所有的盒子里面的p2取他们高度的最大值

    //第一次执行分割为colParam列
    jgg(colParam);

    //重新获取盒子里面p1和p2的高度再次赋值给存储变量
    p1Height = parseFloat(
      window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(1)')[imgNum - 1]).height
    ); //获取了最后一个盒子里面p1的高度(最后一个一定是最长的，同时也是高度最高的)
    p2Height = parseFloat(
      window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(2)')[imgNum - 1]).height
    ); //获取了最后一个盒子里面p2的高度(最后一个一定是最长的，同时也是高度最高的)

    //第二次执行分割为colParam列
    jgg(colParam);

    // 遍历所有按钮监听点击事件
    for (let j = 2; j < btns.length + 2; j++) {
      const btn = btns[j - 2];
      btn.onclick = function() {
        //第一次执行分割为j列
        jgg(j);

        //重新获取盒子里面p1和p2的高度再次赋值给存储变量
        p1Height = parseFloat(
          window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(1)')[imgNum - 1]).height
        ); //获取了最后一个盒子里面p1的高度(最后一个一定是最长的，同时也是高度最高的)
        p2Height = parseFloat(
          window.getComputedStyle(document.querySelectorAll('#bottom > .box > p:nth-of-type(2)')[imgNum - 1]).height
        ); //获取了最后一个盒子里面p2的高度(最后一个一定是最长的，同时也是高度最高的)

        //第二次执行分割为j列
        jgg(j);

        // 监听手机旋转的事件的时机，重新设置
        window.addEventListener('orientationchange', function() {
          run(j);
        });

        // 监听手机窗口变化，重新设置
        window.addEventListener('resize', function() {
          run(j);
        });
      };
    }

    function jgg(cols) {
      //750像素宽度下
      boxWidth = containerWidth / cols; //750像素设备宽度下的值
      imgWidth = boxWidth - boxPadding * 2; //750像素设备宽度下的值
      imgHeight = (308 / 220) * imgWidth; //750像素设备宽度下的值
      boxHeight = imgHeight + p1Height + p2Height + boxPadding * 2; //750像素设备宽度下的值

      console.log('p1高度 :', p1Height);
      console.log('p2高度 :', p2Height);
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

  // 首次加载应用运行
  run(2);

  // 首次加载应用运行，监听手机旋转的事件的时机，重新设置
  window.addEventListener('orientationchange', function() {
    run(2);
  });

  // 首次加载应用运行，监听手机窗口变化，重新设置
  window.addEventListener('resize', function() {
    run(2);
  });
})();
