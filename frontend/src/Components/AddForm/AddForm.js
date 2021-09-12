import React from "react";
import "./AddForm.modules.scss";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

import axios from "axios";

//Import UserContext
import UserContext from "../../Context/UserContext";

const timeZones = [
    {
        value: "Eastern Time",
        label: "Eastern Time (UTC -05:00)",
    },
    {
        value: "Central Time",
        label: "Central Time (UTC -06:00)",
    },
    {
        value: "Mountain Time",
        label: "Mountain Time (UTC -07:00)",
    },
    {
        value: "Pacific Time",
        label: "Pacific Time (UTC -08:00)",
    },
    {
        value: "Alaskan Standard Time",
        label: "Alaskan Standard Time (UTC -09:00)",
    },
    {
        value: "Hawaiian Standard Time",
        label: "Hawaiian Standard Time (UTC -10:00)",
    },
];

export default function AddForm(props) {
    const projectTitleRef = React.useRef();
    const descriptionsRef = React.useRef();
    const schoolRef = React.useRef();
    const timeZoneRef = React.useRef();
    const currentTeamSizeRef = React.useRef();
    const lookingForRolesRef = React.useRef();
    const tagsRef = React.useRef();

    const { userInfo, currPage, setDeleteAdd, setAlert } =
        React.useContext(UserContext);

    const [tz, setTz] = React.useState("Eastern Time");

    async function addPost() {
        const res = await axios.post(
            "https://devhustle.uc.r.appspot.com/" + "addCard",
            {
                type:
                    currPage === "Looking For Projects? 💻"
                        ? "Projects"
                        : "Teammates",
                OP: userInfo.email,

                projectTitle:
                    currPage === "Looking For Projects? 💻"
                        ? projectTitleRef.current.value
                        : null,

                descriptions: descriptionsRef.current.value,
                school: schoolRef.current.value,
                timeZone: tz,

                currentTeamSize:
                    currPage === "Looking For Projects? 💻"
                        ? currentTeamSizeRef.current.value
                        : null,

                lookingForRoles: lookingForRolesRef.current.value,
                tags:
                    tagsRef.current.value +
                    "," +
                    schoolRef.current.value +
                    "," +
                    tz +
                    "," +
                    lookingForRolesRef.current.value,
            }
        );
        if (res.status === 200) {
            setAlert({
                open: true,
                type: "success",
                msg: "Successfully Added!",
            });
            var d = new Date();
            setDeleteAdd("A" + d.valueOf());
        } else {
            setAlert({
                open: true,
                type: "error",
                msg: "Sorry,System Maintaining щ(゜ロ゜щ))",
            });
        }
        props.setOpen(false);
    }

    return (
        <div className="AddForm">
            {currPage === "Looking For Projects? 💻" && (
                <TextField
                    disabled={currPage !== "Looking For Projects? 💻"}
                    required
                    label="Project Title 💻"
                    inputRef={projectTitleRef}
                />
            )}
            <TextField
                required
                multiline
                placeholder="For Examples: 
                We are working on a stock simulator apps
                We need a frontend hacks
                Join Us!"
                rows={5}
                label="Descriptions 📝"
                inputRef={descriptionsRef}
            />
            <TextField required label="School 🏫" inputRef={schoolRef} />
            <TextField
                select
                value={tz}
                onChange={(e) => setTz(e.target.value)}
                required
                label="Current Time Zone 🕕"
                inputRef={timeZoneRef}
            >
                {timeZones.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            {currPage === "Looking For Projects? 💻" && (
                <TextField
                    required
                    disabled={currPage !== "Looking For Projects? 💻"}
                    inputProps={{ type: "number", min: "1" }}
                    label="Current Team Size 👨‍💻👩‍💻"
                    inputRef={currentTeamSizeRef}
                />
            )}
            <TextField
                required
                label={
                    currPage === "Looking For Projects? 💻"
                        ? "Looking For Roles 🔍"
                        : "I am a ⌨ "
                }
                inputRef={lookingForRolesRef}
            />
            <TextField
                required
                label="Tags🔖 "
                inputRef={tagsRef}
                placeholder="Please Use , To Separate Tags"
            />
            <Button onClick={() => addPost()} variant="contained">
                Add
            </Button>
        </div>
    );
}
