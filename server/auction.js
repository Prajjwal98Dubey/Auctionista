import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: "*",
});

const roomMaxValue = {};

io.on("connection", (socket) => {
  console.log("user connected!!");
  socket.on("join-room", ({ roomId, userName, roomInitBidValue }) => {
    socket.username = userName;
    socket.join(roomId);
    roomMaxValue[roomId] = roomInitBidValue;
  });
  socket.on("c_updated_value", () => {
    for (let room of socket.rooms) {
      if (room !== socket.id) {
        io.to(room).emit("s_updated_value", roomMaxValue[room]);
      }
    }
  });
  io.emit("online_users", { online_user: io.engine.clientsCount });

  socket.on("c_new_bid", ({ userName, newPrice, roomId }) => {
    io.to(roomId).emit("s_new_bid", { userName, newPrice });
    roomMaxValue[roomId] = roomMaxValue[roomId]
      ? Math.max(roomMaxValue, newPrice)
      : newPrice;
  });
  socket.on("disconnecting", () => {
    console.log(socket.rooms);
    for (let room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("room_details", "user disconnected");
      }
    }
    io.emit("online_users", { online_user: io.engine.clientsCount });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected !!!");
  });
});

httpServer.listen(5002, () =>
  console.log("auction server running at 5002 !!!")
);
