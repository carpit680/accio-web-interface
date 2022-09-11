/** @format */

import rclnodejs from "rclnodejs";
rclnodejs.init();

const nodeSim = new rclnodejs.Node("sim_starter");
const nodeRobot = new rclnodejs.Node("robot_subscriber");

const pub = nodeSim.createPublisher("std_msgs/msg/Bool", "start_simulation");
const sub = nodeRobot.createSubscription(
	"accio_interfaces/msg/Robot",
	"robot",
	(msg) => {
		console.log(msg);
	}
);

function startSimHandler(io, socket) {
	const startSim = (start) => {
		console.log("start simulation: ", start);
		pub.publish(start);
		rclnodejs.spin(nodeSim);
		rclnodejs.spin(nodeRobot);
	};

	socket.on("sim:start", startSim);

	socket.on("disconnect", () => {
		console.log("client disconnected: ", socket.id);
	});
}

export default startSimHandler;
