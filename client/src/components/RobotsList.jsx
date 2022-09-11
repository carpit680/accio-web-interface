/** @format */

// listen to robot:state on socket.io and update the list of robots

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function RobotsList() {
	const [robot, setRobot] = useState([
		{
			robot_id: 0,
			available: false,
		},
	]);

	useEffect(() => {
		socket.on("robot:state", (msg) => {
			setRobot(msg);
		});
	}, []);

	return (
		<div>
			<h1>Online robots</h1>
			<ul>
				<li key={robot.robot_id}>
					<h2>Robot {robot.robot_id}</h2>
					<p>Available: {robot.available ? "Yes" : "No"}</p>
				</li>
				<li key={2}>
					<h2>Demo robot 2</h2>
					<p>Available: No</p>
				</li>
			</ul>
		</div>
	);
}

export default RobotsList;
