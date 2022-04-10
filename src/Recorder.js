import React from "react"
import './Recorder.css'
import PlayIcon from "./svg/PlayIcon"
import RecordIcon from './svg/RecordIcon'

export default function Recorder(props) {
  
    const [recordOn, setRecordOn] = React.useState(false)
    const [isRecorded, setIsRecorded] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)
    
    const rec = React.useRef(null)

    const hasEndedListener = React.useRef(false)
    const audioElement = React.useRef()

    function handlerFunction() {

      if (!rec.current) rec.current = props.stream;


      rec.current.ondataavailable = e => {

        let audioChunks = []
        audioChunks.push(e.data);
        if (rec.current.state === "inactive"){

          hasEndedListener.current = false
          let blob = new Blob(audioChunks,{type:'audio/mp4'});
          sendData(blob)
        }
      }
    }
    function sendData(blob) {
      const audioUrl = URL.createObjectURL(blob)
      setIsRecorded(true)
      
      audioElement.current.src = audioUrl
      if (!hasEndedListener.current) {
          audioElement.current.addEventListener('ended', () => {
          setIsPlaying(false)
          hasEndedListener.current = true
          })
      }
    }

    let toggleRecord = () => {
      handlerFunction()
      if (recordOn) {
        rec.current.stop();
      } else {
        try {
          rec.current.start();
        } catch (error) {
          alert(`There has been an error. 
          Try refreshing your browser. 
          Error: ${error.message}`)
        }
      }
      setRecordOn((oldState) => !oldState)
    }

    function playSample() {
      setIsPlaying(true)
      audioElement.current.play()
    }

    
    return (
        <div key={props.id}>          
          <p className="button-container">
              <button  
                className={
                  `button-icon 
                  ${recordOn ? "record-on" : ""}`
                } 
                onClick={toggleRecord}
              >
                <RecordIcon />
                <span>{/* recordOn ? "Stop" : "Rec" */}</span>
              </button>
              <div></div>
              <button
                className={`button-icon ${isRecorded ? "" : "play-button-hide"}
                ${isPlaying ? "play-on" : ""}`} 
                onClick={playSample}>
                  <PlayIcon />
                  {/* isPlaying ? "..." : "Play" */}
              </button>

              <audio ref={audioElement} className={props.id}></audio>
              </p>
        </div>
    )
}