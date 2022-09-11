/** @format */

function startSimHandler(socketio, socket, sim_pub) {
	const startSim = (start) => {
		console.log("start simulation: ", start);
		sim_pub.publish(start);
	};

	socket.on("sim:start", startSim);
	socket.on("disconnect", () => {
		console.log("client disconnected: ", socket.id);
	});
}

export default startSimHandler;
