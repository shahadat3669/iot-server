const verifyTokenSocket = require('./middleware/authSocket.middleware');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');

const registerSocketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });
};

module.exports = {
  registerSocketServer
};
