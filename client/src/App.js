/** @format */

import React from "react";
import "./App.css";
import Plotter from "./components/plotter";
function App() {
	// const [data, setData] = React.useState(null);

	// React.useEffect(() => {
	// 	fetch("/api")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<Plotter />
			</header>
		</div>
	);
}

export default App;
