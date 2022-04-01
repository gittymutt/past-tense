import React from "react"
import "./Header.css"

export default function Header(props) {

    
    return (
        <header>
            <h1>{props.isRegular ? "Regular" : "Irregular"} verbs</h1>
            <input onChange={props.chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
            <label className="regular-checkbox" htmlFor="regular">Regular Verbs</label>
            <input onChange={props.chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
            <label htmlFor="irregular">Irregular Verbs</label>
            <button>Search</button>
            <ul className="letter-list">
                <li>a</li>
                <li>b</li>
                <li>c</li>
                <li>d</li>
                <li>e</li>
            </ul>
        </header>
    )
}