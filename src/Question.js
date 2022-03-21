import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";
import './Question.css'
import data from "./data.js"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question() {
    const [qNo, setQNo] = React.useState(0)
    const [isRegular, setIsRegular] = React.useState(true)
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

    function chooseVerbType(e) {
        console.log(e.target.name, e.target.value)
        if (e.target.value ==="regular") {
            setIsRegular(true)
        } else {
            setIsRegular(false)
        }
        setQNo(0)
    }

    function removeEd(word) {
        if (isRegular) {
            return word.pastForm.trim().slice(-2) === "ed" &&
                word.pastForm.trim().slice(-3) !== "fed"
        } else {
            return word.pastForm.trim().slice(-3) === "fed" ||
                word.pastForm.trim().slice(-2) !== "ed" 
        }
    }

    function playAudioElement(e) {
        console.log(e)
        e.play()
    }

    let filteredData = data.filter(removeEd)
    noQuestions.current = filteredData.length

    let questionData = filteredData.map((d) => {
    const id = nextId("q")
    const baseId = id+"base"
    const pastId = id+"past"
    const recId = id+"rec"

    return (
        <div key={id}>
        <h1>Question {qNo+1}</h1>
        <p>{isRegular ? "Regular" : "Irregular"} verbs</p>
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
        <section  className="question">
            <button 
                onClick={() => playAudioElement(
                    document.getElementsByClassName(baseId)[0])} 

            >
                {d.baseForm}
            </button>
            <button 
                onClick={() => playAudioElement(
                    document.getElementsByClassName(pastId)[0])} 
            >
                {d.pastForm}
            </button>
            <audio 
                className={baseId}

                src={require(`./sounds/${d.baseFormSf}`)} 
            >
            </audio>
            <audio 
                className={pastId}
                src={require(`./sounds/${d.pastFormSf}`)} 
            >
            </audio>
            
                   
            <Recorder id={recId}/>
        </section>
        <input onChange={chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
        <label htmlFor="regular">Regular Verbs</label>
        <input onChange={chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
        <label htmlFor="irregular">Irregular</label>
                
        </div>
    )
    })

    

    

    // let currentQuestion = questionData[qNo]
    let currentQuestion = questionData
    return (
        <>
            {currentQuestion}
        </>
    )
}