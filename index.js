import PDF from './pdf.js';
import Screenshot from './screenshot.js';
import { Server } from 'socket.io';

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
      case 'pdf':
        service = new PDF(socket.authentication, serviceName, parameters);
        break;
      case 'screenshot':
        service = new Screenshot(socket.authentication, serviceName, parameters);
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
  socket.authentication = {
    api: socket.handshake.auth.token,
    socket: socket.id
  }
  next();
});

io.listen(80);