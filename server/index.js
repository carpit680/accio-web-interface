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


// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "../client/build")));

// // Handle GET requests to /api route
// app.get("/api", (req, res) => {
// 	res.json({ message: "Hello from server!" });
// });

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

httpServer.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port ", PORT);
});
