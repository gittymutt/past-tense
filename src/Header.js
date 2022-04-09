import React from "react"
import "./Header.css"

export default function Header(props) {
    function search(e) {
        props.setSearchString(e.target.value)
        console.log("no found: " + props.noFound)
    }
    
    return (
        <header>
            <h1>Simple Past {props.isRegular ? "Regular (-ed)" : "Irregular"} Verbs</h1>
            <div className="controls-container">
                <div>
                    <input onChange={props.chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
                    <label className="regular-checkbox" htmlFor="regular">-ed Verbs</label><br />
                    <input  onChange={props.chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
                    <label htmlFor="irregular">Irregular Verbs </label>
                </div>
                <div>
                    <input onChange={search} placeholder="search" className="search-box" type="text"></input>
                    <p> <strong>{props.noFound.current}</strong>&nbsp;verb{props.noFound.current === 1 ? "" : "s"} found.</p>
                </div>
            </div>
        </header>
    )
}