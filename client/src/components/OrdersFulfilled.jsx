/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./fulfilled.css";

const socket = io();

function OrderFulfilled() {
	const [orders, setFulfilled] = useState([]);

	useEffect(() => {
		socket.on("orders:fulfilled", (msg) => {
			// console.log(msg);
			setFulfilled(msg);
		});
	}, []);

	return (
		<div className='fulfilled'>
			<h1 className='fulfilled-heading'>Fulfilled Order(s)</h1>
			<br/>
			<ul className='fulfilled-list'>
				{orders.length > 0 ? (
					orders.map((order) => {
						return (
							<li className='fulfilled-list-item' key={order}>
								Order ID: <p>{order}</p>
							</li>
						);
					})
				) : (
					<li className='fulfilled-list-item'>No completed orders. </li>
				)}
			</ul>
		</div>
	);
}

export default OrderFulfilled;
