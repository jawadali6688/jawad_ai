import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import TextToSpeech from "./components/TextToSpeech"
import VoiceCloning from "./components/VoiceCloning"
import { Toaster } from "react-hot-toast"
import Instructions from "./components/Instructions"
import MyFooter from "./components/MyFooter"


function App() {
  const [clonedVoices, setClonedVoices] = useState([])
  const [tab, setTab] = useState("text_to_speech")


  return (
   <div className="w-[98%] md:w-[90%] lg:w-[85%] mx-auto">
    <Toaster
  position="top-center"
/>
  <div className="mb-10">
  <Navbar tab={tab} setTab={setTab} />
  </div>
    {
      tab === "text_to_speech" && (
        <TextToSpeech />
      )
    }
    {
      tab === "clone_voice" && (
       <VoiceCloning clonedVoices={clonedVoices} setClonedVoices={setClonedVoices} />
      )
    }
    {
      tab === "instructions" && (
       <Instructions />
      )
    }
    <MyFooter />
   </div>
  )
}

export default App
