import React from "react"

export default function Recorder() {
    const [recordOn, setRecordOn] = React.useState(false)
    // const [recordedAudio, setRecordedAudio] = React.useState({})
    const recordedAudio = React.useRef(null)
    const rec = React.useRef(null)
    const audio = React.useRef(null)
    // let audioChunks = []
    const [recButtonLabel, setRecButtonLabel] = React.useState("Start Recording")

    React.useEffect(() => {
      
        // let record = document.getElementById("record")
        // let stopRecord = document.getElementById("stopRecord")
        // let rec
        // setRecordedAudio((oldData) => { 
        //   // return {...oldData, src: document.getElementById("recordedAudio")}
        //   return document.getElementById("recordedAudio")
        // })

        navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream)})
        
        // audioChunks = []
        function handlerFunction(stream) {
          // console.log("recordedaution: " + recordedAudio.current)
            rec.current = new MediaRecorder(stream);
            rec.current.ondataavailable = e => {
              let audioChunks = []
              audioChunks.push(e.data);
              if (rec.current.state === "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                // console.log("recordedaudio: " + recordedAudio)
                // let url = URL.createObjectURL(blob);
                // recordedAudio.current.src = URL.createObjectURL(blob);
                // recordedAudio.current.controls=true;
                // recordedAudio.current.autoplay=true;
                sendData(blob)
              }
            }
        }

        function sendData(blob) {
          const audioUrl = URL.createObjectURL(blob)
          audio.current = new Audio(audioUrl);
          audio.current.play();

        }

          
        //   record.onclick = e => {
        //   record.disabled = true;
        //   record.style.backgroundColor = "blue"
        //   stopRecord.disabled=false;
        //   audioChunks = [];
        //   rec.current.start();
        // }
        
        // stopRecord.onclick = e => {
        //   record.disabled = false;
        //   stopRecord.disabled=true;
        //   record.style.backgroundColor = "red"
        //   rec.current.stop();
        // }

        




    }, [])

    let toggleRecord = () => {
      console.log(recordOn)
      if (recordOn) {
        setRecButtonLabel("Start Recording")
        // toggleRecord.style.backgroundColor = "red"
        console.log("record on" + rec.current.play)
        rec.current.stop();

        // setRecordOn(false)
      } else {
        console.log("record off")
        // audioChunks = [];
          rec.current.start();
          setRecButtonLabel("Stop Recording")
        // recordedAudio.current.stop()
        // setRecordOn(true)
      }
      setRecordOn((oldState) => !oldState)
    }

    function playSample() {
      audio.current.play()
    }

    return (
        <>
            <p>

              {/*
                <button id="record">record</button>
    <button id="stopRecord" disabled>Stop</button> */}
                <button onClick={toggleRecord}>{recButtonLabel}</button>
                <button onClick={playSample}>Play</button>
            </p>
            {/* 
            <p>
               <audio ref={recordedAudio} id="recordedAudio"></audio>
            </p>
    */}
        </>
    )
}