import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectRedisServer } from "./redisClient.js";
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: "*",
});

let client;
const startRedis = async () => {
  client = await connectRedisServer();
  console.log("redis connected !!!");
};

startRedis();

io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomId, userName, roomInitBidValue }) => {
    socket.username = userName;
    socket.join(roomId);
    if (client != undefined && client.isOpen) {
      if ((await client.get(roomId)) == null) {
        await client.set(roomId, roomInitBidValue);
      }
    } else if (!client.isOpen) {
      client = await connectRedisServer();
      console.log("redis connected !!!");
      if ((await client.get(roomId)) == null) {
        await client.set(roomId, roomInitBidValue);
      }
    }
  });
  socket.on("c_updated_value", async ({ roomId }) => {
    let presentMaxValueInRoom = await client.get(roomId);

    for (let room of socket.rooms) {
      if (room !== socket.id) {
        io.to(room).emit("s_updated_value", presentMaxValueInRoom);
      }
    }
  });
  io.emit("online_users", { online_user: io.engine.clientsCount });

  socket.on("c_new_bid", async ({ userName, newPrice, roomId }) => {
    io.to(roomId).emit("s_new_bid", { userName, newPrice });
    await client.set(roomId, newPrice);
  });
  socket.on("disconnecting", () => {
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
