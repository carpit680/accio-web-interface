// show map image at the centre of the screen at half the size
import map from "../assets/map.webp";
import React from "react";
import "./graph.css";

function Graph() {
    return (
        <div className="graph">
            <img className="graph_img" src={map} alt="map"/>
        </div>
    );
}

export default Graph;