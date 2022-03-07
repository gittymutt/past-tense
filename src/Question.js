import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";

// import data from "./data.js"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    function speak(word) {
        let sound = new Audio(require(`./sounds/${word}.m4a`))
        sound.play()
    }
    let data = [1, 2]

    let questionData = data.map((d) =>{
        let id = nextId("q")
        return (
            <section key={id} className="question">
                <button onClick={() => speak("play")} >play</button>
                <button onClick={() => speak("played")}>played</button>
                <Recorder />
            </section>
        )
    })

    return (<>{questionData}</>   )
}