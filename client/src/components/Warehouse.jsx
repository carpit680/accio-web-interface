/** @format */

import Graph from "./graph";
import Robot from "../assets/pointer.svg";
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import "./graph.css";
// import $ from "jquery";

// const socket = io();

function Warehouse() {
	// const [robot, setRobot] = useState([
	// 	{
	// 		x: 40,
	// 		y: 40,
	// 	},
	// ]);
	// useEffect(() => {
	// 	socket.on("robot:state", (msg) => {
	// 		$(document).ready(function () {
	// 			const graph = document.getElementsByClassName("graph_img");
	// 			const graphRect = graph[0].getBoundingClientRect();
	// 			const graphLeft = graphRect.left;
	// 			// $(".robot1").css({
	// 			// 	top: robot.y + 23 + graphRect.top,
	// 			// 	left: robot.x + 15 + graphRect.left,
	// 			// });
	// 			setRobot({
	// 				x: msg.x + 15 + graphRect.left,
	// 				y: msg.y + 23 + graphRect.top,
	// 			});
	// 		});
	// 	});
	// }, []);

	// $(".robot1").css({
	// 	top: robot.y,
	// 	left: robot.x,
	// });

	return (
		<div>
			<Graph />
			<img className='robot1' src={Robot} alt='robot' />
		</div>
	);
}

export default Warehouse;
