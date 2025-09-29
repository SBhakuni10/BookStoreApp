import http from "http";


const PORT = 55000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Test server is running ");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(` Test server listening on http://localhost:${PORT}`);
});

