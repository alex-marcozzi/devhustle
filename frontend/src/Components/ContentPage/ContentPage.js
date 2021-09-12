import React from "react";
import "./ContentPage.modules.scss";
import SearchBar from "../SearchBar/SearchBar";
import PostCard from "../PostCard/PostCard";
import PopUp from "../PopUp/PopUp";
import AddForm from "../AddForm/AddForm";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

//Import UserContext
import UserContext from "../../Context/UserContext";

export default function ContentPage() {
    const [postCards, setPostCard] = React.useState([]);
    const [searchTags, setSearchTags] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const { userInfo, currPage, deleteAdd } = React.useContext(UserContext);

    React.useEffect(() => {
        const getData = async () => {
            const res = await axios.get(
                "https://devhustle.uc.r.appspot.com/" + "getCard"
            );
            console.log(res);

            if (res.status === 200) {
                setPostCard(res.data);
            } else {
                alert(
                    "Couldn't Fetch Data (Sorry,System Maintaining щ(゜ロ゜щ))"
                );
            }
        };
        getData();
    }, [deleteAdd]);

    function CheckRoutes(obj) {
        if (obj === null) {
            return false;
        }
        if (currPage === "My Posts 📜") {
            if (obj.OP === userInfo.email) {
                return true;
            }
            return false;
        } else {
            if (currPage === "Looking For Projects? 💻") {
                if (obj.type === "Projects") {
                    return true;
                }
                return false;
            } else {
                if (obj.type === "Teammates") {
                    return true;
                }
                return false;
            }
        }
    }

    function CheckTags(obj) {
        //obj is tags
        if (obj === null) {
            return false;
        } else {
            obj = obj.split(",");
            if (
                obj.filter((tag) =>
                    tag.toUpperCase().includes(searchTags.toUpperCase())
                ).length > 0
            ) {
                return true;
            }
            return false;
        }
    }

    return (
        <div className="ContentPage">
            <PopUp open={open} setOpen={setOpen} title="Add Post ➕">
                <AddForm setOpen={setOpen} />
            </PopUp>
            <SearchBar setSearchTags={setSearchTags} />
            <div className="PostGrid">
                {/* //* Here the way to do it. */}
                {/* <div className ={classes.PostGrid}> */}
                {postCards.length !== 0 &&
                    postCards
                        .filter((c) => CheckTags(c.tags))
                        .map((Card) => {
                            return (
                                <PostCard
                                    hide={!CheckRoutes(Card)}
                                    type={Card.type}
                                    projectTitle={Card.projectTitle}
                                    school={Card.school}
                                    timeZone={Card.timeZone}
                                    currentTeamSize={Card.currentTeamSize}
                                    lookingRoles={Card.lookingForRoles}
                                    descriptions={Card.descriptions}
                                    OP={Card.OP}
                                    id={Card.id}
                                    tags={Card.tags.split(",")}
                                />
                            );
                        })}
            </div>
            {currPage !== "My Posts 📜" && (
                <Fab
                    color="primary"
                    size="medium"
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
            )}
        </div>
    );
}
