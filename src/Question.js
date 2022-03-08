import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";

import data from "./data.js"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    const [qNo, setQNo] = React.useState(0)

    function speak(word) {
        let sound = new Audio(require(`./sounds/${word}`))
        sound.play()
    }

    function nextQuestion() {
        setQNo((oldValue) => oldValue+1)
    }
    
    let questionData = data.map((d) =>{
        console.log(d.baseForm)
        let id = nextId("q")
        
        return (
            <>
            <section key={id} className="question">
                <button onClick={() => speak(d.baseFormSf)} >{d.baseForm}</button>
                <button onClick={() => speak(d.pastFormSf)}>{d.pastForm}</button>
                <Recorder />
            </section>
            <button onClick={nextQuestion}>Next</button>
            </>
        )
    })
    let currentQuestion = questionData[qNo]
    return (<>
    <p>Question number {qNo}</p>
    {currentQuestion}</>   )
}