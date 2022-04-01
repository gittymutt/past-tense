import React from "react"

export default function Header(props) {
    return (
        <h1>{props.isRegular ? "Regular" : "Irregular"} verbs</h1>
    )
}