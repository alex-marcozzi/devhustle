import React from "react";
import "./SearchBar.modules.scss";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export default function SearchBar(props) {
    return (
        <div className="SearchBar">
            <div className="SearchInput">
                <ManageSearchIcon className="InputIcon" />
                <input
                    onChange={(e) => props.setSearchTags(e.target.value)}
                    className="Input"
                    type="search"
                    placeholder="Search For Tags !"
                />
            </div>
        </div>
    );
}
