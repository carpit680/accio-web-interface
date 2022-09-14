/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./robotList.css";
const socket = io();

function RobotsList() {
	const [robot0, setRobot0] = useState([
		{
			robot_id: 0,
			available: true,
		},
	]);
	const [robot1, setRobot1] = useState([
		{
			robot_id: 1,
			available: true,
		},
	]);
	const [robot2, setRobot2] = useState([
		{
			robot_id: 2,
			available: true,
		},
	]);
	const [robot3, setRobot3] = useState([
		{
			robot_id: 3,
			available: true,
		},
	]);
	const [robot4, setRobot4] = useState([
		{
			robot_id: 4,
			available: true,
		},
	]);

	useEffect(() => {
		socket.on("robot:state", (msg) => {
			if (msg.robot_id === 0) {
				setRobot0(msg);
			}
			else if (msg.robot_id === 1) {
				setRobot1(msg);
			}
			else if (msg.robot_id === 2) {
				setRobot2(msg);
			}
			else if (msg.robot_id === 3) {
				setRobot3(msg);
			}
			else if (msg.robot_id === 4) {
				setRobot4(msg);
			}
		});
	}, []);

	return (
		<div className='robot-list'>
			<h1 className='list-heading'>Online robots</h1>
			<ul>
				<li className='list-item' key={0}>
					<h2>Robot ID: {robot0.robot_id === 0 ? 0 : "N/A"}</h2>
					<p>Available: {robot0.available ? "Yes" : "No"}</p>
				</li>
				<li className='list-item' key={1}>
					<h2>Robot ID: {robot1.robot_id ? robot1.robot_id : "N/A"}</h2>
					<p>Available: {robot1.available ? "Yes" : "No"}</p>
				</li>
				<li className='list-item' key={2}>
					<h2>Robot ID: {robot2.robot_id ? robot1.robot_id : "N/A"}</h2>
					<p>Available: {robot2.available ? "Yes" : "No"}</p>
				</li>
				<li className='list-item' key={3}>
					<h2>Robot ID: {robot3.robot_id ? robot1.robot_id : "N/A"}</h2>
					<p>Available: {robot3.available ? "Yes" : "No"}</p>
				</li>
				<li className='list-item' key={4}>
					<h2>Robot ID: {robot4.robot_id ? robot1.robot_id : "N/A"}</h2>
					<p>Available: {robot4.available ? "Yes" : "No"}</p>
				</li>
			</ul>
		</div>
	);
}

export default RobotsList;
