/** @format */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import startSimHandler from "./startSimHandler.js";
import rclnodejs from "rclnodejs";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3001;

rclnodejs.init();

const nodeSim = new rclnodejs.Node("sim_starter");
const nodeRobot = new rclnodejs.Node("robot_subscriber");
const nodePending = new rclnodejs.Node("pending_subscriber");
const nodeFulfilled = new rclnodejs.Node("fulfilled_subscriber");

const sim_pub = nodeSim.createPublisher(
	"std_msgs/msg/Bool",
	"start_simulation"
);

nodeRobot.createSubscription("accio_interfaces/msg/Robot", "robot", (msg) => {
	io.sockets.emit("robot:state", msg);
});

nodePending.createSubscription(
	"accio_interfaces/msg/Orders",
	"orders_queued",
	(msg) => {
		var order_list = [];
		for (var i = 0; i < msg.orders.length; i++) {
			order_list.push(msg.orders[i]);
		}

		io.sockets.emit("orders:pending", order_list);
	}
);
nodeFulfilled.createSubscription(
	"accio_interfaces/msg/OrdersFulfilled",
	"orders_fulfilled",
	(msg) => {
		var order_list = [];
		for (var i = 0; i < msg.orders.length; i++) {
			order_list.push(msg.orders[i]);
		}
		io.sockets.emit("orders:fulfilled", order_list);
	}
);


rclnodejs.spin(nodeSim);
rclnodejs.spin(nodeRobot);
rclnodejs.spin(nodePending);
rclnodejs.spin(nodeFulfilled);

io.on("connection", (socket) => {

	startSimHandler(io, socket, sim_pub);

	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
	});
});

httpServer.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port ", PORT);
});
