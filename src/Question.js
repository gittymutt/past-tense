import React from "react"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import play from "./sounds/play.m4a"
import Recorder from "./Recorder"
// import data from "./data.js"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    function speak(word) {
        let sound = new Audio(require(`./sounds/${word}.m4a`))
        sound.play()
    }
    let data = [1, 2]
    let questionData = data.map((d) =>{
        return (
            <section className="question">
                <button onClick={() => speak("play")} >play</button>
                <button onClick={() => speak("played")}>played</button>
                <Recorder />
            </section>
        )
    })

    return (<>{questionData}</>   )
}