var sys = require('sys'), 
   http = require('http');

var resonses = [];


http.createServer(function (req, res) {
  
  if (req.uri.params.connect) {
    resonses.push(res);
    return;
  }

  if (req.uri.params.post) {
    for (var i = 0; i < resonses.length; i++) {
      resonses[i].sendHeader(200, {'Content-Type': 'text/plain', 'Connection': 'close'});
      resonses[i].sendBody(req.uri.params.post);
      resonses[i].finish();
    }
    res.sendHeader(204, {'Connection': 'close'});
    res.finish();
    return;
  }

}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');