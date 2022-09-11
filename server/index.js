/** @format */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import startSimHandler from "./startSimHandler.js";
import rclnodejs from "rclnodejs";
import io from "socket.io-client";

const app = express();
const httpServer = createServer(app);
const socketio = new Server(httpServer);
const PORT = process.env.PORT || 3001;
const socket = io();

rclnodejs.init();

var robot_msg = {
	robot_id: "2.0",
	available: "True",
};

socketio.on("connection", (socket) => {
	console.log("client connected: ", socket.id);

	const nodeSim = new rclnodejs.Node("sim_starter");
	const nodeRobot = new rclnodejs.Node("robot_subscriber");
	const nodePending = new rclnodejs.Node("pending_subscriber");
	const nodeFulfilled = new rclnodejs.Node("fulfilled_subscriber");
	const sim_pub = nodeSim.createPublisher(
		"std_msgs/msg/Bool",
		"start_simulation"
	);

	const robot_sub = nodeRobot.createSubscription(
		"accio_interfaces/msg/Robot",
		"robot",
		(msg) => {
			// console.log(msg);
			socket.emit("robot:state", msg);
		}
	);

	const pending_sub = nodePending.createSubscription(
		"accio_interfaces/msg/Orders",
		"orders_queued",
		(msg) => {
			var array = [];
			for (var i = 0; i < msg.orders.length; i++) {
				array.push(msg.orders[i]);
			}
			socket.emit("orders:pending", array);
		}
	);
	const fulfilled_sub = nodeFulfilled.createSubscription(
		"accio_interfaces/msg/Orders",
		"orders_fulfilled",
		(msg) => {
			// convert msg to array
			var array = [];
			for (var i = 0; i < msg.orders.length; i++) {
				array.push(msg.orders[i]);
			}
			socket.emit("orders:fulfilled", array);
		}
	);

	rclnodejs.spin(nodeSim);
	rclnodejs.spin(nodeRobot);
	rclnodejs.spin(nodePending);

	socket.on("disconnect", () => {
		console.log("client disconnected: ", socket.id);
		nodeSim.destroy();
		nodeRobot.destroy();
		nodePending.destroy();
		nodeFulfilled.destroy();
	});

	startSimHandler(socketio, socket, sim_pub);
	socket.emit("robot:state", robot_msg);
});

httpServer.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port ", PORT);
});
