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