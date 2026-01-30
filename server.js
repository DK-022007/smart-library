const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8000;
const mime = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.json':'application/json',
  '.ico':'image/x-icon',
  '.txt':'text/plain'
};
http.createServer((req,res)=>{
  try{
    let reqPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
    let filePath = path.join(process.cwd(), reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const ctype = mime[ext] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': ctype});
    fs.createReadStream(filePath).pipe(res);
  } catch(e){
    res.writeHead(404); res.end('Not found');
  }
}).listen(port, ()=>console.log(`Serving http://localhost:${port}`));
