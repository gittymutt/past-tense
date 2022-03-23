import logo from './logo.svg';
import './App.css';
import Question from './Question';
import React from "react"

function App() {
  // let stream = null
  const [stream, setStream] = React.useState(null)

  

  React.useEffect(() => {
    getMedia({audio: true})
    console.log("Useaffecting in App.js")
  }, [])


  const getMedia = async (constraints) => {


    try {
      setStream(await navigator.mediaDevices.getUserMedia(constraints))
      /* use the stream */
      // console.log("Stream from getmedia: " + stream);
      // return stream;
    } catch (err) {
      /* handle the error */
      alert("Error: " + err.name);
    }
  }
  
  return (
    <div className="App">
      <Question stream={stream} />
    </div>
  );
}

export default App;
