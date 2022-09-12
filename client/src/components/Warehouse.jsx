/** @format */

import Graph from "./graph";
import Robot from "../assets/pointer.svg";
// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import io from "socket.io-client";
import "./graph.css";
// import $ from "jquery";

const socket = io();

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

// return (
// 	<div>
// 		<Graph />
// 		<img className='robot1' src={Robot} alt='robot' />
// 	</div>
// );

socket.on("robot:state", (msg) => {
	console.log(msg);
});
class Warehouse extends Component {
	// Create state
	state = {
		xoffset: 50,
		yoffset: 50,
		delta: 1,
		prevx: 0,
		prevy: 0,
	};

	moveTitleToDown = () => {
		this.setState({ yoffset: this.state.yoffset + this.state.delta });
	};
	moveTitleToRight = () => {
		this.setState({ xoffset: this.state.xoffset + this.state.delta });
	};
	moveTitleToLeft = () => {
		this.setState({ xoffset: this.state.xoffset - this.state.delta });
	};
	moveTitleToUp = () => {
		this.setState({ yoffset: this.state.yoffset - this.state.delta });
	};

	render() {
		return (
			<div>
				<div>
					<Graph />
					<img
						style={{
							position: "fixed",
							left: `${this.state.xoffset}%`,
							top: `${this.state.yoffset}%`,
						}}
						className='robot1'
						src={Robot}
						alt='robot'
					/>
				</div>
				{/* Move Controls */}
				<div style={{ marginTop: "80px" }}>
					<button onClick={this.moveTitleToRight}>Move Title To Right</button>
					<button onClick={this.moveTitleToDown}>Move Title To Down</button>
					<button onClick={this.moveTitleToLeft}>Move Title To Left</button>
					<button onClick={this.moveTitleToUp}>Move Title To Up</button>
				</div>
			</div>
		);
	}
}

export default Warehouse;
