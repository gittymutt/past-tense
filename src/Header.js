import React from "react"
import "./Header.css"

export default function Header(props) {
    function search(e) {
        props.setSearchString(e.target.value)
    }
    
    return (
        <header>
            <h1>Simple Past {props.isRegular ? "Regular (-ed)" : "Irregular"} Verbs</h1>
            <div className="controls-container">
                <div>
                    <input onChange={props.chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
                    <label className="regular-checkbox" htmlFor="regular">-ed Verbs</label><br />
                    <input checked onChange={props.chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
                    <label htmlFor="irregular">Irregular Verbs </label>
                </div>
                <input onChange={search} placeholder="search" className="search-box" type="text"></input>
            </div>
        </header>
    )
}