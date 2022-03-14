import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";
import './Question.css'
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
            // console.log(oldValue, data.length-2)
        //     if (oldValue < data.length) return oldValue+1 
        // })
    }

    function previousQuestion() {
        setQNo((oldValue) => oldValue-1)
    }
    
    let questionData = data.map((d) =>{
        let id = nextId("q")
        
        return (
            <>
            <p>Question number {qNo+1}</p>
            <footer>
                {qNo >= 1 && <button className="next-buttons" onClick={previousQuestion}>Back</button>}
                {qNo < data.length-1 && <button className="next-buttons" onClick={nextQuestion}>Next</button>}
            </footer>
            <section key={id} className="question">
                <button onClick={() => speak(d.baseFormSf)} >{d.baseForm}</button>
                <button onClick={() => speak(d.pastFormSf)}>{d.pastForm}</button>
                <Recorder />
            </section>
            
            
            </>
        )
    })
    let currentQuestion = questionData[qNo]
    return (<>
    
    {currentQuestion}</>   )
}