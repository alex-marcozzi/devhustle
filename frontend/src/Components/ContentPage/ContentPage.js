import React from "react";
import "./ContentPage.modules.scss";
import SearchBar from "../SearchBar/SearchBar";
import PostCard from "../PostCard/PostCard";

// todo Call API For Data Filter base On current page

export default function ContentPage() {
    const [searchTags, setSearchTags] = React.useState("");

    return (
        <div className="ContentPage">
            <SearchBar setSearchTags={setSearchTags} />
            <div className="PostGrid">
                <PostCard
                    type="Project"
                    projectTitle="Stock Simulator Apps"
                    school="UPenn"
                    timeZone="EST."
                    currentTeamSize={3}
                    lookingRoles="Front End"
                    descriptions="We try to build a stock simulator Apps"
                    tags={["Stock", "Financial", "1", "23", "$546"]}
                />
                <PostCard
                    type="Teammate"
                    projectTitle="Stock Simulator Apps"
                    school="UPenn"
                    timeZone="EST."
                    currentTeamSize={3}
                    lookingRoles="Front End"
                    descriptions="We try to build a stock simulator Apps"
                    tags={["Stock", "Financial"]}
                />
                <PostCard
                    type="Teammate"
                    projectTitle="Stock Simulator Apps"
                    school="UPenn"
                    timeZone="EST."
                    currentTeamSize={3}
                    lookingRoles="Front End"
                    descriptions="We try to build a stock simulator Apps"
                    tags={["Stock", "Financial"]}
                />
                <PostCard
                    type="Teammate"
                    projectTitle="Stock Simulator Apps"
                    school="UPenn"
                    timeZone="EST."
                    currentTeamSize={3}
                    lookingRoles="Front End"
                    descriptions="We try to build a stock simulator Apps"
                    tags={["Stock", "Financial"]}
                />
                <PostCard
                    type="Teammate"
                    projectTitle="Stock Simulator Apps"
                    school="UPenn"
                    timeZone="EST."
                    currentTeamSize={3}
                    lookingRoles="Front End"
                    descriptions="We try to build a stock simulator Apps"
                    tags={["Stock", "Financial"]}
                />
            </div>
        </div>
    );
}
