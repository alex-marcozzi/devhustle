import React from "react";
// import style from "./SignInButton.modules.scss";

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

    const onSuccess = (res) => {
        console.log("Success");
        //console.log(res.profileObj);
        setUserInfo(res.profileObj);
    };
    return (
        <>
            <PopUp open={open} setOpen={setOpen} title="Sign In 🔑">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID}
                    buttonText="Sign In With Google"
                    cookiePolicy={"single_host_origin"}
                    uxMode="redirect"
                    redirectUri="http://localhost:3000"
                    isSignedIn={true}
                    onFailure={(err) => console.log("fail", err)}
                    onSuccess={() => onSuccess}
                />

                <Button>Sign In With Github</Button>
            </PopUp>
            <CustomButton variant="contained" onClick={() => setOpen(!open)}>
                Sign In
            </CustomButton>
        </>
    );
}
