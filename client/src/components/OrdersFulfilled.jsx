// create a list of orders that have been fulfilled

import React from 'react';
import { useSelector } from 'react-redux';

const OrdersFulfilled = () => {
    const orders = useSelector((state) => state.ordersFulfilled);
    // show "no completed orders" if there are no orders
    if (orders.length === 0) {
        return <div className="orders-fulfilled">No completed orders</div>;
    }
    else {
    
        return (
            <div>
                <h2>Orders Fulfilled</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>{order.id}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
    
export default OrdersFulfilled;