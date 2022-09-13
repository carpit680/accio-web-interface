/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./pending.css";

const socket = io();

function OrderQueue() {
	const [orders, setPending] = useState([]);

	useEffect(() => {
		// reset orders
		
		socket.on("orders:pending", (msg) => {
			console.log(msg);
			setPending([]);
			setPending(msg);
		});
	}, []);

	return (
		<div className='pending'>
			<h1 className='pending-heading'>Pending Order(s)</h1>
			<br />
			<ul className='pending-list'>
				{orders.length > 0 ? (
					orders.map((order) => {
						return (
							<li key={order.orderid} className='pending-list-item'>
								<p>
									<p className='pending-order-heading'> Order ID</p>{" "}
									{order.orderid}
								</p>
								<ul className='pending-tote-list'>
									<h2 className='pending-order-heading'>Pick list</h2>
									{order.picklist.map((toteid) => {
										return (
											<li key={toteid} className='pending-tote'>
												{toteid}
											</li>
										);
									})}
								</ul>
							</li>
						);
					})
				) : (
					<li className='pending-list-item'>No pending orders</li>
				)}
			</ul>
		</div>
	);
}

export default OrderQueue;
