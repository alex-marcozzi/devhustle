import React from "react";
import "./IntroPage.modules.scss";

import computerImg from "../../Assets/ComputerCartoon.jpg";

export default function IntroPage() {
    return (
        <div className="Body">
            <div className="TopSection">
                <div className="Caption">
                    <h2 className="CaptionTitle">
                        Having Trouble Finding A Teammate For Side Project😩?
                    </h2>
                    <h3 className="Description">
                        You Are In The Right Place ! Sign In and Check Out
                        Different Opportunities!🎉
                    </h3>
                </div>
                <img src={computerImg} alt="Pic" />
            </div>
            {/* <div className="BotSection">
                <div className="IconStatements">
                    
                    <pre>Expand Your Connections</pre>
                </div>
                <div className="IconStatements">
                    
                    <pre>Expand Your Connections</pre>
                </div>
                <div className="IconStatements">
                    
                    <pre>Expand Your Connections</pre>
                </div>
            </div> */}
        </div>
    );
}
