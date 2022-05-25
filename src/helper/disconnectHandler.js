const serverStore = require('../serverStore');

const disconnectHandler = async (socket) => {
  serverStore.removeConnectedUser({ socketId: socket.id });
};

module.exports = disconnectHandler;
