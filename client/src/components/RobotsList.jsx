/** @format */

// listen to robot:state on socket.io and update the list of robots

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./robotList.css";
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
		<div className="robot-list">
			<h1 className="list-heading">Online robots</h1>
			<ul>
				<li className="list-item" key={robot.robot_id}>
					<h2>Robot {robot.robot_id}</h2>
					<p>Available: {robot.available ? "Yes" : "No"}</p>
				</li>
				{/* <li className="list-item" key={2}>
					<h2></h2>
					<p>Available: NA</p>
				</li> */}
			</ul>
		</div>
	);
}

export default RobotsList;
