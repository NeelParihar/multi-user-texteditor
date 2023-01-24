"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io")(process.env.PORT || 8080, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});
let defaultValue = "";
io.on("connection", (socket) => {
    socket.on("get-text", () => {
        socket.join("room");
        socket.emit("load-text", defaultValue);
        socket.on("save-text", (text) => {
            defaultValue = text;
        });
        socket.on("send-changes", (delta) => {
            socket.broadcast.to("room").emit("receive-changes", delta);
        });
    });
});
