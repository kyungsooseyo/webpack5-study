import hello from './hello';
import imgSrc from './assets/1.png';
import logoSvg from './assets/logo.svg';
import example from './assets/hello.txt';
import jepg from './assets/2.jpeg';
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
document.body.appendChild(block);
const img3 = document.createElement('img');
img3.src = jepg;
document.body.appendChild(img3);
