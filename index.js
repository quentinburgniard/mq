import Screenshot from './screenshot.js';
import { Server } from 'socket.io';

let authentication = null;

const io = new Server({
  cors: {
    origin: ['https://cv.digitalleman.com', 'https://cv.preview.quentinburgniard.com']
  },
  path: '/v1/'
});

io.on('connection', (socket) => {
  socket.on('function', (serviceName, parameters, callback) => {
    let service = null;
    switch (serviceName) {
      case 'screenshot':
        service = new Screenshot(authentication, serviceName, parameters);
        break;
    }
    service.create().then(() => {
      service.execute().then((response) => {
        callback(response);
      })
    });
  });
});

io.use((socket, next) => {
  authentication = socket.handshake.auth.token;
  //const err = new Error("not authorized");
  //err.data = { content: "Please retry later" }; // additional details
  next();
});

io.listen(80);