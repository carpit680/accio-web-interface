/** @format */

import React from "react";
import Button from "@mui/material/Button";
import "./Console.css"

const Console = (props) => {
	

	return (
		<div className='console'>
			<Button className='button' variant='contained' onClick={props.onClick}>
				{props.text}
			</Button>
			<p className="console-text">Connected: {"" + props.isConnected ? "Absolutely!" : "Not really :("}</p>
		</div>
	);
};

export default Console;
