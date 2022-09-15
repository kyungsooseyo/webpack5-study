const http = require('http');
const app = http.createServer((req, res) => {
  if (req.url === '/api/hello') {
    res.end('hello world');
  }
})
app.listen(4001, 'localhost', () => {
  console.log('server is running at http://localhost:4001');
})