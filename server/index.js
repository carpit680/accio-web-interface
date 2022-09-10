/** @format */

import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3001;

import startSimHandler from "./startSimHandler.js";

io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  
  startSimHandler(io, socket);
})

httpServer.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port ", PORT);
});
