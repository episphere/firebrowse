const http = require('http');
const axios = require('axios');

//const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(req.url.length>15){
    console.log(`call from ${req.headers.origin} at ${Date()}`)
    let url = decodeURIComponent(req.url.slice(2))
    let doIt = false
    if(url.match(/^http:\/\/firebrowse\.org\/api/)){doIt=true}
    if(doIt){
      axios.get(url)
        .then(function (x) {
          res.end(JSON.stringify(x.data,null,3));
        })
        .catch(function (err) {
          res.end(JSON.stringify(err,null,3))
        });
    }else{
      res.end(JSON.stringify({error:`calling ${url} not allowed`},null,3))
    }
  }else{
      res.end(JSON.stringify({},null,3))
  }
});

server.listen(port);
console.log(`server listening to port ${port} since ${Date()}`)