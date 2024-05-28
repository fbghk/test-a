const fs = require('node:fs');
const http = require('http');
const server = http.createServer();
const readline = require('readline')

//? 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on()



//! 파일 생성
fs.appendFile('./data/test.html', content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("good")
  }
})


//! 서버 생성
server.on('request', (request, res) => {
  fs.appendFile('./data/test.html', content, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("good")
    }
  })
  fs.readFile('./data/test.html', function(err,data){
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data);
    return res.end()
  })
})








//! 서버 실행
server.listen(8000, (error) => {
  if(error) {
    console.log('Error: ', error);
  } else {
    console.log('서버돌아감');
    console.log(`http://localhost:8000/`);
  }
});
