/** @format */

import rclnodejs from "rclnodejs";

rclnodejs.init();

const node = new rclnodejs.Node("sim_starter");
const pub = node.createPublisher("std_msgs/msg/Bool", "start_simulation");

function startSimHandler(io, socket) {
	const startSim = (start) => {
		console.log("start simulation: ", start);
		pub.publish(start);
		rclnodejs.spinOnce(node);
	};

	socket.on("sim:start", startSim);

	socket.on("disconnect", () => {
		console.log("client disconnected: ", socket.id);
	});
}

export default startSimHandler;
