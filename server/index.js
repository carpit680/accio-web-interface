const path = require('path');
const express = require('express');
const rclnodejs = require('rclnodejs');
const PORT = process.env.PORT || 3001;

const app = express();

rclnodejs.init().then(() => {
	const node = rclnodejs.createNode("publisher_example_node");
	const publisher = node.createPublisher("std_msgs/msg/String", "topic");

	let counter = 0;
	setInterval(() => {
		console.log(`Publishing message: Hello ROS ${counter}`);
		publisher.publish(`Hello ROS ${counter++}`);
	}, 1000);

	rclnodejs.spin(node);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});