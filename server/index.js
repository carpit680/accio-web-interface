/** @format */

const path = require("path");
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const rclnodejs = require("rclnodejs");
const PORT = process.env.PORT || 3005;

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("client connected: ", socket.id);

	socket.join("clock-room");

	socket.on("disconnect", (reason) => {
		console.log(reason);
	});
});

setInterval(() => {
	io.to("clock-room").emit("time", new Date());
}, 1000);

rclnodejs
	.init()
	.then(() => {
		const node = rclnodejs.createNode("robot_subscriber");
		let count = 0;

		node.createSubscription(
			"accio_interfaces/msg/Robot",
			"robot",
			(state) => {
				console.log(`Received message No. ${++count}: `, state);
			}
		);

		rclnodejs.spin(node);
	})
	.catch((e) => {
		console.log(e);
	});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', PORT)
})
