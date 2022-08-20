import hello from './hello';
import imgSrc from './assets/1.png';
import logoSvg from './assets/logo.svg';
import example from './assets/hello.txt';
import jepg from './assets/2.jpeg';
import './style1.css';
import './style.less';
import data from './assets/data.xml';
import notes from './assets/data.csv';
import yaml from './assets/data.yaml';
import json5 from './assets/data.json5';
import './async-module.js'
import _ from 'lodash'
hello();
const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);
const img2 = document.createElement('img');
img2.style.cssText = 'width: 100px; height: 100px;';
img2.src = logoSvg;
document.body.appendChild(img2);
// const p = document.createElement('p');
// p.innerText = example;
// document.body.appendChild(p);
const block = document.createElement('div');
block.textContent = example;
block.classList.add('block-bg');
document.body.appendChild(block);
const img3 = document.createElement('img');
img3.src = jepg;
document.body.appendChild(img3);
document.body.classList.add('hello');
console.log(data); // xml会转换成object
console.log(notes); // csv会转换成array
console.log(yaml.title);
console.log(json5.title);
console.log(_.join(['js', 'css', 'html'], ' '));
//! 通过import这种方式实现了懒加载，一开始不会加载math.js，只有当点击按钮时才会加载math.js
const button = document.createElement('button');
button.textContent = 'Click me run add';
button.onclick = () => {
  //~ 配置魔法注释，打包出来的文件名就是math.bundle.js 因为在webpack.config.js中配置了output.filename 是bundle.js
  //` 通过webpackPrefetch:true 预加载math.js  即在header中添加<link rel="prefetch" href="math.bundle.js">但是不会执行math.js 在网络空闲时才会加载
  // import(/* webpackChunkName:'math',webpackPrefetch:true */'./math').then(({ add }) => {
  //   console.log(add(1, 2));
  // });
  //* webpackPreload 和 webpackPrefetch的区别是 webpackPrefetch会在页面加载时就加载math.js，preload会在点击按钮时才加载math.js
  import(/* webpackChunkName:'math',webpackPreload:true */'./math').then(({ add }) => {
    console.log(add(1, 2));
  });
}
document.body.appendChild(button);
