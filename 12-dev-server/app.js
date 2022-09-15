console.log('hello');
fetch('/api/hello').then(res => res.text()).then(text => console.log(text));