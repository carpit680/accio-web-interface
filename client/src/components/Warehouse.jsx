/** @format */

import Graph from "./graph";
import Robot from "../assets/pointer.svg";
import React, { Component } from "react";
import io from "socket.io-client";
import "./graph.css";
import $ from "jquery";

const socket = io();

class Warehouse extends Component {
	scale = (number, inMin, inMax, outMin, outMax) => {
		return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	};
	componentDidMount() {
		// get graph position
		const graph = $(".graph");
		const graphRect = graph[0].getBoundingClientRect();
		this.setState({ graphLeft: graphRect.left + 15 });
		this.setState({ graphTop: graphRect.top + 15 });
		this.setState({ graphWidth: graphRect.width - 46 });
		this.setState({ graphHeight: graphRect.height -46 });
		this.setState({ graphScalex: (graphRect.width - 46) / 100 });
		this.setState({ graphScaley: (graphRect.height -46) / 100 });
		
		socket.on("robot:state", (msg) => {
			this.setState({ graphLeft: graphRect.left + 15 });
			this.setState({ graphTop: graphRect.top + 15 });
			this.setState({ graphWidth: graphRect.width - 46 });
			this.setState({ graphHeight: graphRect.height - 46 });
			this.setState({ graphScalex: (graphRect.width - 46) / 100 });
			this.setState({ graphScaley: (graphRect.height - 46) / 100 });
			if (msg.robot_id === 0) {
				if (msg.position.x > this.state.prevx) {
					this.setState({
						degrees: 0,
					})
				} else if (msg.position.x < this.state.prevx) {
					this.setState({
						degrees: 180,
					})
				}
				if (msg.position.y > this.state.prevy) {
					this.setState({
						degrees: 90,
					})
				} else if (msg.position.y < this.state.prevy) {
					this.setState({
						degrees: 270,
					})
				}
				this.setState({
					newX: this.state.graphScalex * msg.position.x + this.state.graphLeft,
				});
				this.setState({
					newY: this.state.graphScaley * msg.position.y + this.state.graphTop,
				});
				this.setState({
					prevx: msg.position.x,
				});
				this.setState({
					prevy: msg.position.y,
				});
			}
		});
	}

	state = {
		graphWidth: 0,
		graphHeight: 0,
		prevx: 0,
		prevy: 0,
		newY: 433,
		newX: 794,
		graphScalex: 0,
		graphScaley: 0,
		degrees: 0,
	};

	render() {
		return (
			<div>
				<Graph />
				<img
					style={{
						transform: `rotate(${this.state.degrees}deg)`,
						position: `absolute`,
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
