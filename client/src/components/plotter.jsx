/** @format */

import Graph from "./graph";
import Pointer from "../assets/pointer.svg";
import React from "react";
import "./graph.css";
import $ from "jquery";


function Plotter() {
	$(document).ready(function () {
		const graph = document.getElementsByClassName("graph_img");
		// console.log(graph[0]);
		const graphRect = graph[0].getBoundingClientRect();
		// console.log(graphRect);
		// const graphTop = graphRect.top;
		const graphLeft = graphRect.left;
		// console.log(graphTop, graphLeft);
		const initialState = {
			x: graphRect.left,
			y: graphRect.top,
		};
		// set pointer to initial position
		$(".pointer1").css({
			top: initialState.y + 23,
			left: initialState.x + 15,
		});
		// when graph is hovered, pointer translates on x axis by half of the graph width
		$(".graph_img").hover(
			function () {
				$(".pointer1").css({
					left: graphLeft + graphRect.width / 2,
				});
			}
		);

	});

	return (
		<div className="plotter" >
			<Graph />
			<img className='pointer1' src={Pointer} alt='pointer' />
		</div>
	);
}

export default Plotter;
