import React from "react";
import "./App.modules.scss";
import Nav from "../Nav/Nav";
import IntroPage from "../IntroPage/IntroPage";
import ContentPage from "../ContentPage/ContentPage";
import Footer from "../Footer/Footer";

//Import UserContext;
import UserContext from "../../Context/UserContext";

function App() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [currPage, setCurrPage] = React.useState("Looking For Projects 💻");

    return (
        <UserContext.Provider
            value={{ userInfo, setUserInfo, currPage, setCurrPage }}
        >
            <div className="app">
                <Nav />
                <ContentPage />
                {/* <IntroPage /> */}
                <Footer />
            </div>
        </UserContext.Provider>
    );
}
export default App;
