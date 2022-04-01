import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";
import './Question.css'
import data from "./data.js"
import PlayIcon from "./svg/PlayIcon";
import Header from "./Header"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question(props) {
    const [qNo, setQNo] = React.useState(0)
    const [isRegular, setIsRegular] = React.useState(true)
    const noQuestions = React.useRef(0)

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

    function alphabetize(words) {
        return words.sort(function(a, b) {
            let nameA = a.baseForm.toUpperCase(); // ignore upper and lowercase
            let nameB = b.baseForm.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0;  // names must be equal
          })
    } 

    function playAudioElement(e) {
        e.play()
    }

    let filteredData = data.filter(removeEd)
    filteredData = alphabetize(filteredData)

    noQuestions.current = filteredData.length

    let questionData = filteredData.map((d) => {
    const id = nextId("q")
    const baseId = id+"base"
    const pastId = id+"past"
    const recId = id+"rec"

    return (
        <div key={id}>
        <section  className="question">
            <button 
                className="baseform-button"
                onClick={() => playAudioElement(document.getElementsByClassName(baseId)[0])} 
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
            
            <Recorder id={recId} stream={props.stream} />
        </section>
        
                
        </div>
    )
    })

    // let currentQuestion = questionData[qNo]
    let currentQuestion = questionData
    return (
        <>
            <Header 
                isRegular={isRegular}

            />

            <input onChange={chooseVerbType} type="radio" id="regular" name="isRegular" value="regular" />
            <label className="regular-checkbox" htmlFor="regular">Regular Verbs</label>
            <input onChange={chooseVerbType} type="radio" id="irregular" name="isRegular" value="irregular" />
            <label htmlFor="irregular">Irregular Verbs</label>
            {currentQuestion}
        </>
    )
}