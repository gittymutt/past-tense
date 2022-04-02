import React from "react"
import "./Header.css"

export default function Header(props) {
    function search(e) {
        // console.log("search string:"+e.target.value)
        props.setSearchString(e.target.value)
    }
    
    return (
        <header>
            <h1>{props.isRegular ? "Regular" : "Irregular"} verbs</h1>
            <input onChange={props.chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
            <label className="regular-checkbox" htmlFor="regular">Regular Verbs</label><br />
            <input onChange={props.chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
            <label htmlFor="irregular">Irregular Verbs</label>
            <input onChange={search} placeholder="search" className="search-box" type="text"></input>
        </header>
    )
}