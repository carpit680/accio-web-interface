/** @format */

import React from "react";
import Button from "@mui/material/Button";


const Console = (props) => {
	

	return (
		<div className='console'>
			<Button variant='contained' onClick={props.onClick}>
				{props.text}
			</Button>
			<p>Connected: {"" + props.isConnected}</p>
		</div>
	);
};

export default Console;
