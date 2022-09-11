/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./pending.css";

const socket = io();

function OrderQueue() {
	const [orders, setPending] = useState([]);

	useEffect(() => {
		socket.on("orders:pending", (msg) => {
			console.log(msg);
			setPending(msg);
		});
	}, []);

	return (
		<div className='pending'>
			<h1 className="pending-heading">Pending Order(s)</h1>
			<ul className='pending-list'>
				{orders.length > 0 ? (
					orders.map((order) => {
						return <li className='pending-list-item'>{order}</li>;
					})
				) : (
					<li className='pending-list-item'>None</li>
				)}
			</ul>
		</div>
	);
}

export default OrderQueue;
