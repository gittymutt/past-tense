import React from "react"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import play from "./sounds/play.m4a"
// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    function speak(word) {
        console.log("filename: " + `./sounds/${word}.m4a`)
        let sound = new Audio(require(`./sounds/${word}.m4a`))
        sound.play()
    }

    return (
        <>
        <button onClick={() => speak("play")} >play</button>
        <button onClick={() => speak("played")}>played</button>
        
  </>
    )
}