/** @format */

const node = new rclnodejs.Node("robot_subscriber");
const sub = node.createSubscription(
    "accio_interfaces/msg/Robot",
    "robot",
    (msg) => {
        console.log(msg);
    }
);

rclnodejs.spin(node);
