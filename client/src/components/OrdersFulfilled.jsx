/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function OrderFulfilled() {
	const [orders, setFulfilled] = useState([]);

	useEffect(() => {
		socket.on("orders:fulfilled", (msg) => {
			setFulfilled(msg);
		});
	}, []);

	return (
		<div>
			<h1>Fulfilled Orders</h1>
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

export default OrderFulfilled;
