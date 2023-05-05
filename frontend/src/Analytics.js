import React, { useState, useEffect } from "react"

import heatmap from './assets/IMG_BAFF75C22EF9-1.jpeg';

const Analytics = () => {
    return(
            <div className = "section">
                <h1 className = "title" style = {{marginBottom: "40px",padding: "15px" }}>
                    Analytics
                </h1>
                <div style={{ display: "grid", gridTemplateColumns: "20% 60%", gridGap: 5 }}>
                    <div style={{height: "55px", color: "drakgrey", marginLeft:"auto", marginRight: "auto", padding: "15px",
            backgroundColor: "lightgrey", display: "flex", justifyContent: "center",  borderRadius: "25px", alignItems: "right", width:"50%"}} >
                        <h5 className = "subtitle is-6">
                            Heat Map
                        </h5>
                    </div>
                    <div class = "center" style={{display: "block", width: "50%", marginLeft:"auto", marginRight: "auto"}} >  
                        <img src={heatmap} alt="Heat Map" style={{ width: 425, height: 500}} />
                    </div>
                </div>

                </div>

    );
};

export default Analytics;

// TODO: get and display images from web with an interactive button. (for makeers day)
// TODO: get and display images from /backend API with an interactive button. (for startup systems)