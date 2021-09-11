import React from "react";
import "./Nav.modules.scss";
import SignInButton from "../SignInButton/SignInButton";

export default function Nav() {
    return (
        <div className="Nav">
            <h2>DevHustle</h2>
            <SignInButton />
        </div>
    );
}
