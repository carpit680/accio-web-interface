/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function OrderQueue() {
	const [orders, setPending] = useState([]);

	useEffect(() => {
		socket.on("orders:pending", (msg) => {
			setPending(msg);
		});
	}, []);

	return (
		<div>
			<h1>Pending Orders</h1>
			<ul>
				{orders.length > 0 ? (
					orders.map((order) => {
						return <li>{order.order_id}</li>;
					})
				) : (
					<li>None</li>
				)}
			</ul>
		</div>
	);
}

export default OrderQueue;
