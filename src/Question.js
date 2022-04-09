import React from "react"
import Recorder from "./Recorder"
import nextId from "react-id-generator";
import './Question.css'
import data from "./data.js"
import SpeakerIcon from "./svg/SpeakerIcon";
import Header from "./Header"

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default function Question(props) {
    const [isRegular, setIsRegular] = React.useState(false)
    const noQuestions = React.useRef(0)
    const [searchString, setSearchString] = React.useState("")
    const [numFound, setNumfound] = React.useState(0)

    function chooseVerbType(e) {
        console.log(e.target.name, e.target.value)
        if (e.target.value ==="regular") {
            setIsRegular(true)
        } else {
            setIsRegular(false)
        }
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

    function filterWords(words) {
        // return words.filter(word => word.baseForm.includes(searchString) ||
        //                             word.pastForm.includes(searchString))
        return words.filter(word => word.baseForm.match(`^${searchString.toLowerCase()}`) ||
                                    word.pastForm.match(`^${searchString.toLowerCase}`))
}

    function playAudioElement(e) {
        e.play()
    }

    let filteredData = data.filter(removeEd)
    filteredData = alphabetize(filteredData)
    filteredData = filterWords(filteredData)

    noQuestions.current = filteredData.length
    // setNumfound(filteredData.length)

    let questionData = filteredData.map((d) => {
    const id = nextId("q")
    const baseId = id+"base"
    const pastId = id+"past"
    const recId = id+"rec"

    return (
        <div key={id}>
        <section  className="question">
            <button 
                className="verb-button"
                onClick={() => playAudioElement(document.getElementsByClassName(baseId)[0])} 
            >
               {d.baseForm} <SpeakerIcon />
            </button>
            <button
                className="verb-button"
                onClick={() => playAudioElement(
                    document.getElementsByClassName(pastId)[0])} 
            >
               {d.pastForm} <SpeakerIcon />
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
                chooseVerbType={chooseVerbType}
                setSearchString={setSearchString}
                noFound={noQuestions}
            />
           
            <div className="question-container">
                <h1>{currentQuestion < 1 ? "No words found. Please change your search." : ""}</h1>
                {currentQuestion}
            </div>
        </>
    )
}