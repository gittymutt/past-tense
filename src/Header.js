import React from "react"

export default function Header(props) {
    return (
        <>
        <h1>{props.isRegular ? "Regular" : "Irregular"} verbs</h1>
            <input onChange={props.chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
            <label className="regular-checkbox" htmlFor="regular">Regular Verbs</label>
            <input onChange={props.chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
            <label htmlFor="irregular">Irregular Verbs</label>
        </>
    )
}