/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./pending.css";

const socket = io();

function OrderQueue() {
	const [orders, setPending] = useState([]);

	useEffect(() => {
		socket.on("orders:pending", (msg) => {
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
						var pick_list = [];
						for (var i = 0; i < order.picklist.length; i++) {
							pick_list.push(order.picklist[i]);
						}
						return (
							<li key={order.orderid} className='pending-list-item'>
								<>
									<h3 className='pending-order-heading'> Order ID</h3>{" "}
									{order.orderid}
								</>
								{/* <h2 className='pending-order-heading'>Pick list</h2>
								<ul className='pending-tote-list'>
									{order.picklist.forEach(toteid => {
										console.log(toteid);
										return (
											<li key={toteid} className='pending-tote'>
												{toteid}
											</li>
										);
									})}
								</ul> */}
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
