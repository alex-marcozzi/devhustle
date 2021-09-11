import React from "react";
import "./PopUp.modules.scss";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopUp(props) {
    function handleClose() {
        props.setOpen(!props.open);
    }
    return (
        <Dialog open={props.open} onClose={handleClose} className="PopUp">
            <DialogTitle>{props.title}</DialogTitle>
            {props.children}
        </Dialog>
    );
}
