const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
  },
});
const users = {};
io.on("connection", (socket) => {
  socket.on("new-user", (myname) => {
    users[socket.id] = myname;
    socket.broadcast.emit("user-connected", myname);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      myname: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
