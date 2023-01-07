import { Server } from "socket.io";

let authentication = null;

const io = new Server({
  cors: {
    origin: ['https://cv.digitalleman.com', 'https://cv.preview.quentinburgniard.com']
  },
  path: '/v1/'
});

io.on('connection', (socket) => {
  socket.on('function', (serviceName, parameters) => {
    service = null;
    switch (serviceName) {
      case 'screenshot':
        service = new Screenshot(authentication, service, parameters);
        break;
    }
    service.execute();
  });
});

io.use((socket, next) => {
  authentication = socket.handshake.auth.token;
  //const err = new Error("not authorized");
  //err.data = { content: "Please retry later" }; // additional details
  //next(err);
});

io.listen(80);