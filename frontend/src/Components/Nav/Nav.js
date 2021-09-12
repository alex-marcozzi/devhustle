import React from "react";
import "./Nav.modules.scss";
import Logo from "../../Assets/Logo.svg";
import SignInButton from "../SignInButton/SignInButton";

import clsx from "clsx";

//Import UserContext
import UserContext from "../../Context/UserContext";

const navRoutes = [
    "Looking For Projects? 💻",
    "Looking For Teammates? 👨‍💻👩‍💻",
    "My Posts 📜",
];

export default function Nav() {
    const { userInfo, currPage, setCurrPage } = React.useContext(UserContext);

    return (
        <div className="Nav">
            <div className="Title_Logo">
                <h2>DevHustle</h2>
                <img src={Logo} alt="Logo" className="Logo" />
            </div>

            <div className="Nav_Buttons">
                {userInfo !== null ? (
                    <>
                        <h3>Welcome {userInfo.givenName} ! </h3>
                        {navRoutes.map((route) => {
                            return (
                                <div
                                    key={route}
                                    className={clsx({
                                        NavRoutes: true,
                                        Selected: currPage === route,
                                    })}
                                    onClick={() => setCurrPage(route)}
                                >
                                    {route}
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <SignInButton />
                )}
            </div>
        </div>
    );
}
