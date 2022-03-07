import React from "react"

export default function Recorder() {
    const [recordOn, setRecordOn] = React.useState(false)
    const recordedAudio = React.useRef(null)
    const rec = React.useRef(null)
    const audio = React.useRef(null)

    React.useEffect(() => {
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {handlerFunction(stream)})
        
        function handlerFunction(stream) {
            rec.current = new MediaRecorder(stream);
            rec.current.ondataavailable = e => {
              let audioChunks = []
              audioChunks.push(e.data);
              if (rec.current.state === "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                sendData(blob)
              }
            }
        }

        function sendData(blob) {
          const audioUrl = URL.createObjectURL(blob)
          audio.current = new Audio(audioUrl);
          audio.current.play();

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
      audio.current.play()
    }

    return (
        <>
          <p>
              <button onClick={toggleRecord}>
                {recordOn ? "Click to Stop Recording" : "Click to start recording"}
              </button>
              <button onClick={playSample}>Play</button>
          </p>
        </>
    )
}