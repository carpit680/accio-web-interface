/** @format */

// listen to robot:state on socket.io and update the list of robots

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./robotList.css";
const socket = io();

function RobotsList() {
	const [robot, setRobot] = useState([
		
			[{
				robot_id: 0,
				available: false,
			}],
	]);

	useEffect(() => {
		socket.on("robot:state", (msg, robot_id_list) => {
			var robots = [];
			for (var i = 0; i < robot_id_list.length; i++) {
				var robot = {
					robot_id: robot_id_list[i],
					available: msg[i],
				};
				robots.push(robot);
			}
			setRobot(robots);
		});
	}, []);

	return (
		<div className="robot-list">
			<h1 className="list-heading">Online robots</h1>
			<ul>
				{robot.map((robo) => {
					return (
						<li className='list-item' key={robo.robot_id}>
							<h2>Robot ID: {robo.robot_id}</h2>
							<p>Available: {robo.available ? "Yes" : "No"}</p>
						</li>
					);
				}) }
			</ul>
		</div>
	);
}

export default RobotsList;
