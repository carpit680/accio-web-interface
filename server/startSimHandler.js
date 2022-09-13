/** @format */

function startSimHandler(socketio, socket, sim_pub) {
	const startSim = (start) => {
		console.log("start simulation: ", start);
		sim_pub.publish(start);
	};

	socket.on("sim:start", startSim);
}

export default startSimHandler;
