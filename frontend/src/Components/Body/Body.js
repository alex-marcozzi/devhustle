import React from "react";
import "./Body.modules.scss";

import computerImg from "../../Assets/ComputerCartoon.jpg";

export default function Body() {
    return (
        <div className="Body">
            <div className="Caption">
                <h2 className="CaptionTitle">
                    Having Trouble Finding A Teammate For Side Project?
                </h2>
                <h3 className="Description">
                    You Are In The Right Place ! Sign In and Check Out Different
                    Opportunities!
                </h3>
            </div>
            <img
                src={computerImg}
                alt="Pic"
                style={{ width: "40%", height: "50%" }}
            />
        </div>
    );
}
