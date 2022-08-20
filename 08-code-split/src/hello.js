function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world');
    }, 1000);
  })
}
async function hello(params) {
  // console.log('hello!!');
  let str = await getString();
  console.log(str);
}
export default hello;
