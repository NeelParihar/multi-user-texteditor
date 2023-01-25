import { Socket } from "socket.io";

const io = require("socket.io")(process.env.PORT ||3001, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
});

let defaultValue = "";

io.on("connection", (socket: Socket) => {

  socket.on("get-text", () => {
    socket.join("room");
    socket.emit("load-text", defaultValue);

    socket.on("save-text", (text: string) => {
      defaultValue = text;
    });

    socket.on("send-changes", (delta: any) => {
      socket.broadcast.to("room").emit("receive-changes", delta);
    });
  });
});
