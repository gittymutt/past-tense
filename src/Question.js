import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";
import './Question.css'
import data from "./data.js"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    const [qNo, setQNo] = React.useState(0)
    const noQuestions = React.useRef(0)

    function speak(word) {
        let sound = new Audio(require(`./sounds/${word}`))
        sound.play()
    }

    function nextQuestion() {
        setQNo((oldValue) => {
            if (oldValue < noQuestions.current-1) {
                return oldValue+1
            } else {
                return oldValue
            }
        })
           
    }

    function previousQuestion() {
        setQNo((oldValue) => {
            if (qNo >= 1) {
                return oldValue-1
            } else {
                return oldValue
            }
        })
    }

    function removeEd(word) {
        return word.pastForm.trim().slice(-2) === "ed"
    }

    let filteredData = data.filter(removeEd)
    noQuestions.current = filteredData.length

    let questionData = filteredData.map((d) => {
    let id = nextId("q")
        
    return (
        <>
        <p>Question number {qNo+1}</p>
        <div className="next-buttons-group">
            <button 
                className={`next-buttons ${qNo >= 1 ? "" : "hide-button"}`} 
                onClick={previousQuestion}
            >&lt; Back</button>
            {<button 
                className={`next-buttons ${qNo < noQuestions.current-1 ? "" : "hide-button"}`}  
                onClick={nextQuestion}
                >Next &gt;</button>
            }
            
        </div>
        <section key={id} className="question">
            <button onClick={() => speak(d.baseFormSf)} >{d.baseForm}</button>
            <button onClick={() => speak(d.pastFormSf)}>{d.pastForm}</button>
            <Recorder />
        </section>
        
        
        </>
    )
    })

    

    

    let currentQuestion = questionData[qNo]
    return (
        <>
            {currentQuestion}
        </>
    )
}