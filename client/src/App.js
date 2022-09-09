/** @format */

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Plotter from "./components/plotter";

function App() {
	const [time, setTime] = React.useState("fetching");
	React.useEffect(() => {
		const socket = io("http://localhost:3002");
		socket.on("connect", () => console.log(socket.id));
		socket.on("connect_error", () => {
			setTimeout(() => socket.connect(), 5000);
		});
		socket.on("time", (data) => setTime(data));
		socket.on("disconnect", () => setTime("server disconnected"));
	}, []);

	return (
		// <div className='App'>
		// 	<header className='App-header'>
		// 		<Plotter />
		// 	</header>
		// </div>
		<div className='App'>{time}</div>
	);
}

export default App;
