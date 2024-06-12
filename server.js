const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const roomParticipants = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (roomCode, user) => {
      socket.join(roomCode);
      if (!roomParticipants[roomCode]) {
        roomParticipants[roomCode] = [];
      }
      roomParticipants[roomCode].push(user);
      io.to(roomCode).emit('participants', roomParticipants[roomCode]);
      console.log(`Client joined room: ${roomCode}`);
    });

    socket.on('leaveRoom', (roomCode, user) => {
      socket.leave(roomCode);
      if (roomParticipants[roomCode]) {
        roomParticipants[roomCode] = roomParticipants[roomCode].filter(participant => participant._id !== user._id);
        io.to(roomCode).emit('participants', roomParticipants[roomCode]);
      }
      console.log(`Client left room: ${roomCode}`);
    });

    socket.on('startGame', (roomCode) => {
      const participants = roomParticipants[roomCode];
      if (participants && participants.length > 1) {
        const roles = {};
        participants.forEach((participant, index) => {
          roles[participant.username] = index % 2 === 0 ? "narrator" : "listener";
        });
        io.to(roomCode).emit('assignRoles', roles);
        io.to(roomCode).emit('startGame', participants);
      }
    });

    socket.on('assignRoles', (roomCode, roles) => {
      io.to(roomCode).emit('assignRoles', roles);
    });

    socket.on('chatMessage', (roomCode, messageData) => {
      const { user, message } = messageData;
      const completeMessage = { user, message };
      io.to(roomCode).emit('chatMessage', completeMessage);
    });

    socket.on('guessMessage', (roomCode, guessData) => {
      const { user, message } = guessData;
      const completeGuess = { user, message };
      io.to(roomCode).emit('guessMessage', completeGuess);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
