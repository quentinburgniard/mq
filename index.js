const { Server } = require('socket.io');

const io = new Server({
  allowRequest: (req, callback) => {
    console.log(req);
    const isOriginValid = check(req);
    callback(null, isOriginValid);
  },
  path: '/v1/'
});

io.on('connection', (socket) => {
  socket.on('function', (parameters) => {
    console.log(parameters);
  });
});

io.listen(80);