import http from "http";
import fs from "fs";

const HOST = "localhost";
const PORT = 3000;

const html = fs.readFileSync("./example/index.html", cb);
const css = fs.readFileSync("./example/style.css", cb);

const requestListener = function (req, res) {
  res.writeHead(200);
  if (req.url === "/") {
    return res.end(html);
  }
  if (req.url === "/style.css") {
    return res.end(css);
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// --------------------

function cb(e) {
  if (e) throw e;
}
