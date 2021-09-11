import React from "react";
// import style from "./SignInButton.modules.scss";

import PopUp from "../PopUp/PopUp";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
    fontSize: 12,
});

export default function SignInButton() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <PopUp open={open} setOpen={setOpen} title="Sign In">
                <Button>Sign In With Google</Button>
                <Button>Sign In With Github</Button>
            </PopUp>
            <CustomButton variant="contained" onClick={() => setOpen(!open)}>
                Sign In
            </CustomButton>
        </>
    );
}
