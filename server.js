const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);


  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (roomCode) => {
      socket.join(roomCode);
      console.log(`Client joined room: ${roomCode}`);
    });

    socket.on('leaveRoom', (roomCode) => {
      socket.leave(roomCode);
      console.log(`Client left room: ${roomCode}`);
    });

    socket.on('chatMessage', (roomCode, messageData) => {
      const { user, message } = messageData;
      const completeMessage = {
        user,
        message,
      };
      io.to(roomCode).emit('chatMessage', completeMessage);
    });

    socket.on('guessMessage', (roomCode, guessData) => {
      const { user, message } = guessData;
      const completeGuess = {
        user,
        message,
      };
      io.to(roomCode).emit('guessMessage', completeGuess);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
