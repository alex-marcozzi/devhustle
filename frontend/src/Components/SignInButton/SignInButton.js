import React from "react";
import "./SignInButton.modules.scss";

import GoogleLogin from "react-google-login";
import PopUp from "../PopUp/PopUp";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

//Import UserContext
import UserContext from "../../Context/UserContext";

const CustomButton = styled(Button)({
    fontSize: 12,
});

export default function SignInButton() {
    const [open, setOpen] = React.useState(false);
    const { setUserInfo } = React.useContext(UserContext);
    return (
        <>
            <PopUp open={open} setOpen={setOpen} title="Sign In 🔑">
                <GoogleLogin
                    clientId="669317400509-hun6uljkr5af23a4q0srhfftmu88temd.apps.googleusercontent.com"
                    buttonText="Sign In With Google (Dont Worries (¬_¬ ) We Just Need Your Name And Email)"
                    cookiePolicy={"single_host_origin"}
                    // ! How do I redirect and still got data
                    //uxMode="redirect"
                    //redirectUri="http://localhost:3000"
                    isSignedIn={true}
                    onFailure={(err) => console.log("fail", err)}
                    onSuccess={(res) => setUserInfo(res.profileObj)}
                />
            </PopUp>
            <CustomButton variant="contained" onClick={() => setOpen(!open)}>
                Sign In
            </CustomButton>
        </>
    );
}
