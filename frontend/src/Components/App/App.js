import React from "react";
import "./App.modules.scss";
import Nav from "../Nav/Nav";
import IntroPage from "../IntroPage/IntroPage";
import ContentPage from "../ContentPage/ContentPage";
import Footer from "../Footer/Footer";

//Import UserContext;
import UserContext from "../../Context/UserContext";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const CustomMuiAlert = styled(MuiAlert)({
    height: "48px",
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <CustomMuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    );
});

function App() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [currPage, setCurrPage] = React.useState("Looking For Projects? 💻");
    const [deleteAdd, setDeleteAdd] = React.useState(null);
    const [alert, setAlert] = React.useState({
        open: false,
        type: null,
        msg: null,
    });

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                currPage,
                setCurrPage,
                deleteAdd,
                setDeleteAdd,
                alert,
                setAlert,
            }}
        >
            <div className="app">
                <Snackbar
                    open={alert.open}
                    autoHideDuration={3000}
                    onClose={() =>
                        setAlert({ open: false, type: null, msg: null })
                    }
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={() =>
                            setAlert({ open: false, type: null, msg: null })
                        }
                        severity={alert.type}
                    >
                        {alert.msg}
                    </Alert>
                </Snackbar>
                <Nav />
                {userInfo !== null ? <ContentPage /> : <IntroPage />}
                <Footer />
            </div>
        </UserContext.Provider>
    );
}
export default App;
