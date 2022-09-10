/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import Plotter from "./components/plotter";
import SimStart from "./components/simStart";

// function App() {

// 	const startSim = (e) => {
// 		e.preventDefault();
// 		socket.emit("sim:start", !start);
// 		setStart(!start);
// 	};
// 	return (
// 		<div className='App'>
// 			<SimStart text={start ? "Stop" : "Start"} onClick={startSim} />
// 			<Plotter />
// 		</div>
// 	);
// }


const socket = io();

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [start, setStart] = useState(false);
	

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });



    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const startSim = (e) => {
		e.preventDefault();
		socket.emit("sim:start", !start);
		setStart(!start);
	};

  return (
		<div className='App'>
			<p>Connected: {"" + isConnected}</p>
			<SimStart text={start ? "Stop" : "Start"} onClick={startSim} />
			<Plotter />
		</div>
	);
}

export default App;
