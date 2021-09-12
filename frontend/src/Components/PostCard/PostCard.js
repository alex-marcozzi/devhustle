import React from "react";
import "./PostCard.modules.scss";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";
import axios from "axios";

//Import UserContext
import UserContext from "../../Context/UserContext";

const CustomConnectButton = styled(Button)({
    fontSize: 12,
    color: "blue",
    borderColor: "lightblue",
    margin: "4px",
});

const CustomDeleteButton = styled(Button)({
    fontSize: 12,
    color: "red",
    borderColor: "red",
    margin: "4px",
});

export default function PostCard(props) {
    const { userInfo, setDeleteAdd, setAlert } = React.useContext(UserContext);

    //Boolean
    const owner = userInfo.email === props.OP;

    //functions

    async function deletePost() {
        const res = await axios.delete(
            "https://devhustle.uc.r.appspot.com/" + "deleteCard",
            {
                data: {
                    id: props.id,
                },
            }
        );
        if (res.status === 200) {
            setAlert({
                open: true,
                type: "success",
                msg: "Successfully Deleted!",
            });
            var d = new Date();
            setDeleteAdd("D" + d.valueOf());
        } else {
            setAlert({
                open: true,
                type: "error",
                msg: "Sorry,System Maintaining щ(゜ロ゜щ))",
            });
        }
    }

    async function sendEmail() {
        const res = await axios.post(
            "https://devhustle.uc.r.appspot.com/" + "sendEmail",
            {
                to: props.OP,
                name: "[From DevHustle] " + userInfo.givenName,
                html:
                    "Hi,<br/><br/>" +
                    userInfo.givenName +
                    ' was interested about your post! <br/><br/> Contact Information Below:<br/><br/> <a href="mailto:' +
                    userInfo.email +
                    '">' +
                    userInfo.email +
                    "</a> <br/><br/> Best, <br/> DevHustle Team",
            }
        );
        if (res.status === 200) {
            setAlert({
                open: true,
                type: "success",
                msg: "Successfully Sent Email!",
            });
        } else {
            setAlert({
                open: true,
                type: "error",
                msg: "Sorry,System Maintaining щ(゜ロ゜щ))",
            });
        }
    }

    return (
        <div className={clsx({ PostCard: true, Hide: props.hide })}>
            <div className="PostCardContent">
                <h2 className="ProjectTitle">
                    {props.type === "Projects"
                        ? props.projectTitle + " 💻"
                        : "Looking For Team To Join 🔎"}
                </h2>

                <div className="Descriptions">
                    <pre>{props.descriptions}</pre>
                </div>

                <h4>Poster's 💁‍♂️/💁‍♀️ Info 👇</h4>
                <div className="School">
                    From🏫 : <b>{props.school}</b>
                </div>
                <div className="TimeZone">
                    Timezone🕛 : <b>{props.timeZone}</b>
                </div>

                {props.type === "Projects" && (
                    <>
                        <div className="CurrentTeamSize">
                            Current Team Size👨‍💻👩‍💻 : {props.currentTeamSize}{" "}
                        </div>
                        <h4>Project's 📓 Info 👇</h4>
                    </>
                )}
                <div className="LookingRoles">
                    {props.type === "Projects" ? "Seeking 🔍" : "I am a ⌨ "} :{" "}
                    <b>{props.lookingRoles} Hack</b>
                </div>

                <div className="Tags">
                    {props.tags.map((tag, idx) => {
                        return (
                            <div className="TagsItem" key={tag + "_" + idx}>
                                {tag}
                            </div>
                        );
                    })}
                </div>

                <CustomConnectButton
                    disabled={owner}
                    variant="outlined"
                    startIcon={<ConnectWithoutContactIcon />}
                    onClick={() => sendEmail()}
                >
                    Connect
                </CustomConnectButton>

                {owner === true ? (
                    <CustomDeleteButton
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deletePost()}
                    >
                        Delete Post
                    </CustomDeleteButton>
                ) : null}
            </div>
        </div>
    );
}
