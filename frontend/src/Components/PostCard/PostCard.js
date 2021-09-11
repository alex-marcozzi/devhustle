import React from "react";
import "./PostCard.modules.scss";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const CustomButton = styled(Button)({
    fontSize: 12,
});

export default function PostCard(props) {
    return (
        <div className="PostCard">
            <div className="PostCardContent">
                <h2 className="ProjectTitle">
                    {props.type === "Project"
                        ? props.projectTitle + " 💻"
                        : "Looking For Team To Join 🔎"}
                </h2>
                <h4>Poster's 💁‍♂️/💁‍♀️ Info 👇</h4>
                <div className="School">
                    From : 🏫 <b>{props.school}</b>
                </div>
                <div className="TimeZone">
                    Timezone : 🕛 <b>{props.timeZone}</b>
                </div>

                {props.type === "Project" && (
                    <>
                        <div className="CurrentTeamSize">
                            Current Team Size : 👨‍💻👩‍💻 {props.currentTeamSize}{" "}
                        </div>
                        <h4>Project's 📓 Info 👇</h4>
                        <div className="LookingRoles">
                            Seeking : 🔍 <b>{props.lookingRoles} Hack</b>
                        </div>
                    </>
                )}

                <div className="Descriptions">
                    {/* Descriptions : 📒 */}
                    <pre>{props.descriptions}</pre>
                </div>
                <div className="Tags">
                    {props.tags.map((tag) => {
                        return <div className="TagsItem">{tag}</div>;
                    })}
                </div>
                <CustomButton
                    variant="outlined"
                    startIcon={<ConnectWithoutContactIcon />}
                >
                    Connect
                </CustomButton>
            </div>
        </div>
    );
}
