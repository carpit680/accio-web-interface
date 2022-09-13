/** @format */

import Graph from "./graph";
import Robot from "../assets/pointer.svg";
import React, { Component } from "react";
import io from "socket.io-client";
import "./graph.css";
import $ from "jquery";

const socket = io();

class Warehouse extends Component {
	scale = (number, outMin, outMax) => {
		return ((number - 0) * (outMax - outMin)) / (100 - 0) + outMin;
	};
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
			this.setState({
				newX:
					graphRect.left + this.scale(msg.position.x, 0, this.state.graphWidth),
			});
			this.setState({
				newY:
					graphRect.top + this.scale(msg.position.y, 0, this.state.graphHeight),
			});
		});
	}

	state = {
		graphWidth: 0,
		graphHeight: 0,
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
		);
	}
}

export default Warehouse;
