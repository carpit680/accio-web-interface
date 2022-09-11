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

