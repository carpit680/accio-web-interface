/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import RobotsList from "./components/RobotsList";
// import Warehouse from "./components/Warehouse";
import OrderQueue from "./components/OrderQueue";
import OrdersFulfilled from "./components/OrdersFulfilled";
import Console from "./components/Console";

const socket = io();

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [start, setStart] = useState(false);

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, []);

	const startSim = (e) => {
		e.preventDefault();
		socket.emit("sim:start", !start);
		setStart(!start);
	};
	return (
		<div className='App'>
			<Console
				onClick={startSim}
				isConnected={isConnected}
				text={start ? "Stop" : "Start"}
			/>
			<RobotsList />
			{/* <Warehouse /> */}
			<OrderQueue />
			<OrdersFulfilled />
		</div>
	);
}

export default App;
