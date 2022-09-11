/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./fulfilled.css";

const socket = io();

function OrderFulfilled() {
	const [orders, setFulfilled] = useState([]);

	useEffect(() => {
		socket.on("orders:fulfilled", (msg) => {
			console.log(msg);
			setFulfilled(msg);
		});
	}, []);

	return (
		<div className='fulfilled'>
			<h1 className='fulfilled-heading'>Fulfilled Order(s)</h1>
			<ul className='fulfilled-list'>
				{orders.length > 0 ? (
					orders.map((order) => {
						return <li className='fulfilled-list-item'>{order}</li>;
					})
				) : (
					<li className='fulfilled-list-item'>None</li>
				)}
			</ul>
		</div>
	);
}

export default OrderFulfilled;
