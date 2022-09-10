// create a button at the top of the screen that will start the simulation
// when clicked, the button will change to a stop button
// when clicked again, the button will change back to a start button

import React from "react";
import Button from "@mui/material/Button";

export default function SimStart(props) {
    return (
        <div>
        <Button variant="contained" onClick={props.onClick}>
            {props.text}
        </Button>
        </div>
    );
    }

