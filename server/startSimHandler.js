/** @format */

import rclnodejs from "rclnodejs";
// import Node

rclnodejs.init();

const node = new rclnodejs.Node("sim_starter");
const pub = node.createPublisher("std_msgs/msg/Bool", "start_simulation");

// module.exports = (io, socket) => {
// 	const startSim = (start) => {
//         console.log("start simulation: ", start);
//         pub.publish(start);
//         rclnodejs.spinOnce(node);
//         // rclnodejs.spinOnce(node, 1000);

// 	};

// };

function startSimHandler(io, socket) {
	const startSim = (start) => {
		console.log("start simulation: ", start);
		pub.publish(start);
		rclnodejs.spinOnce(node);
		// rclnodejs.spinOnce(node, 1000);
	};

	socket.on("sim:start", startSim);

	socket.on("disconnect", () => {
		console.log("client disconnected: ", socket.id);
	});
}

export default startSimHandler;
