// import logo from './logo.svg';
import './App.css';
import Question from './Question';
import React from "react"

function App() {
  // let stream = null
  const [stream, setStream] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  

  React.useEffect(() => {
    getMedia({audio: true})
    console.log("Useaffecting in App.js")
  }, [])


  const getMedia = async (constraints) => {
    try {
      const tempStream = await navigator.mediaDevices.getUserMedia(constraints)
      const mediaStream = new MediaRecorder(tempStream)
      setStream(mediaStream)
      setIsLoading(false)
      /* use the stream */
      // console.log("Stream from getmedia: " + stream);
      // return stream;
    } catch (err) {
      /* handle the error */
      alert("Error: " + err.name);
    }
  }
  
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      </head>
      <section className="App">
      
        {isLoading && <h1 className='loading-sign'>Finding Recording Device...</h1>}
        <Question stream={stream} />
      </section>
    </>
  );
}

export default App;
