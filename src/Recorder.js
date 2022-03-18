import React from "react"
import './Recorder.css'

export default function Recorder(props) {
    const [recordOn, setRecordOn] = React.useState(false)
    const [isRecorded, setIsRecorded] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)

    const recordedAudio = React.useRef(null)
    const rec = React.useRef(null)
    const audio = React.useRef(null)

    React.useEffect(() => {

      navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {handlerFunction(stream)})
        .catch(e => alert("There was an error with the audio: " + e.name +
              "\n" + e.message))
        
        function handlerFunction(stream) {
            rec.current = new MediaRecorder(stream);
            rec.current.ondataavailable = e => {
              let audioChunks = []
              audioChunks.push(e.data);
              if (rec.current.state === "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mp3'});
                sendData(blob)
              }
            }
        }

        function sendData(blob) {
          const audioUrl = URL.createObjectURL(blob)
          setIsRecorded(true)
          audio.current = new Audio(audioUrl);
          audio.current.addEventListener('ended', () => {
            setIsPlaying(false)
          })

          // audio.current.play();
          // setIsPlaying(true)
        }
    }, [])

    let toggleRecord = () => {
      if (recordOn) {
        rec.current.stop();
      } else {
          rec.current.start();
      }
      setRecordOn((oldState) => !oldState)
    }

    function playSample() {
      setIsPlaying(true)
      audio.current.play()
      
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
                
                <svg fill="#AB7C94" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 384 512"><path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z"/></svg>
                <span>{recordOn ? "Stop" : "Record"}</span>
              </button>
              <button
                className={`button-icon ${isRecorded ? "" : "play-button-hide"}
                ${isPlaying ? "play-on" : ""}`} 
                onClick={playSample}>
                   <svg  xmlns="http://www.w3.org/2000/svg" viewBox="10 0 384 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>
                  {isPlaying ? "Playing..." : "Play"}
              </button>
          </p>
        </div>
    )
}