const fs = require('fs');
const http = require('http');
// const server = http.createServer();

const path = require('path')
const { URLSearchParams } = require('url');

//? 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on()



// //! 파일 생성
// fs.appendFile('./data/test.html', content, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("good")
//   }
// })


// //! 서버 생성
// server.on('request', (request, res) => {
//   fs.appendFile('./data/test.html', content, err => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("good")
//     }
//   })
//   fs.readFile('./data/test.html', function(err,data){
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.write(data);

//     return res.end()
//   })
// })

const server = http.createServer((req,res) => {
  if(req.method === "GET") {
    if (req.url === "/") {
      fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
        if (err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end("500 code는 서버 자체의 에러");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"})
        res.end(data);
      });
    }
    // if(req.url === "style.css"){
    // fs.readFile(path.join(__dirname, "style.css"), (err, data) => {
    //   if (err) {
    //     res.writeHead(500, {"Content-Type": "text/plain"});
    //     res.end("500 code는 서버 자체의 에러");
    //     return;
    //   }
    //   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"})
    //   res.end(data);
    // });}
    else {
      res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
      res.end("404 code는 페이지를 찾을 수 없음");
      return;
    }


  }else
  if (req.method === "POST") {
    if (req.url === "/test"){
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

    req.on("end", ()=> {
      const parsedData = new URLSearchParams(body);
      const title = parsedData.get ("title");
      const content = parsedData.get ("content");

      const jsonData = {
        title: title,
        content: content,
      };

      const jsonDataString = JSON.stringify(jsonData, null, 2)
      fs.writeFile(path.join(__dirname, "data.json"), jsonDataString, (err) => {
        if(err){
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8"})
          res.end('서버 자체 에러');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
        let jsonResonse = JSON.stringify({message: '데이터가 성공적을 저장됨'});
        res.end(jsonResonse);
      });
    });
    } else {
      res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"})
      res.end("404 code는 페이지를 찾을 수 없음")
    }
  } else {
    res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"})
    res.end("404 code는 페이지를 찾을 수 없음")
  }
});


//! 서버 실행
server.listen(8080, () => {
    console.log(`http://localhost:8080/`);
  }
);
