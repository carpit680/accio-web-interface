/** @format */

import Graph from "./graph";
import Robot from "../assets/pointer.svg";
// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import io from "socket.io-client";
import "./graph.css";
import $ from "jquery";

const socket = io();

class Warehouse extends Component {
	componentDidMount() {
		
		// get graph position
		const graph = $(".graph");
		const graphRect = graph[0].getBoundingClientRect();
		this.setState({ graphLeft: graphRect.left });
		this.setState({ graphTop: graphRect.top });
		this.setState({ graphWidth: graphRect.right - graphRect.left });
		this.setState({ graphHeight: graphRect.bottom - graphRect.top });
		this.setState({ prevx: graphRect.right - graphRect.left });
		this.setState({ prevy: graphRect.bottom - graphRect.top });
		socket.on("robot:state", (msg) => {
			this.setState({ newX: graphRect.left + msg.position.x });
			this.setState({ newY: graphRect.top + msg.position.y });
			console.log(this.state.newX);
		});
	}

	state = {
		graphWidth: 0,
		graphHeight: 0,
		graphLeft: 0,
		graphTop: 0,
		delta: 1,
		prevx: 0,
		prevy: 0,
		x: 0,
		y: 0,
		newY: 0,
		newX: 0,
	};

	moveTitleToDown = () => {
		this.setState({ y: this.state.newY });
	};
	moveTitleToRight = () => {
		this.setState({ x: this.state.newX });
	};
	moveTitleToLeft = () => {
		this.setState({ x: this.state.newX });
	};
	moveTitleToUp = () => {
		this.setState({ y: this.state.newY });
	};

	render() {
		return (
			<div>
				<div>
					<Graph />
					<img
						style={{
							position: "fixed",
							left: `${this.state.newX}px`,
							top: `${this.state.newY}px`,
						}}
						className='robot1'
						src={Robot}
						alt='robot'
					/>
				</div>
				{/* Move Controls */}
				<div>
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
