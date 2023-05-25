const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    let reqUrl = url.parse(req.url);
    let filePath =
      "." + (reqUrl.pathname === "/" ? "/index" : reqUrl.pathname) + ".html";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile("./404.html", (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data);
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  })
  .listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
  });
