import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import TextToSpeech from "./components/TextToSpeech"
import VoiceCloning from "./components/VoiceCloning"
import toast, { Toaster } from "react-hot-toast"
import Instructions from "./components/Instructions"
import MyFooter from "./components/MyFooter"


function App() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [clonedVoices, setClonedVoices] = useState([])
  const [tab, setTab] = useState("text_to_speech")

  const userList = [
    {
      username: "jawadali", password: "khanmeme", characters: 10000
    },
    {
      username: "jawadkhan", password: "jawadkhanme", characters: 10000
    },
    {
      username: "admin", password: "adminme", characters: 40000
    },
    {
      username: "superadmin", password: "superadminme", characters: 30000
    },
  ]

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"))
    setUser(data)
    
  }, [])

  function login() {
    if (!username) {
      toast.error("Please enter Username!");
      return;
    }
    if (!password) {
      toast.error("Please enter Password!");
      return;
    }
  
    // Find user in the list
    const user = userList.find(data => data.username === username && data.password === password);
  
    if (!user) {
      toast.error("Invalid Credentials!");
      return;
    }
  
    // Store user and update state
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Logged in successfully!");
    setUser(user);
  }

  return (
   <div className="w-[98%] md:w-[90%] lg:w-[85%] mx-auto">
    <Toaster
  position="top-center"
/>
  <div className="mb-10">
  <Navbar tab={tab} setTab={setTab} user={user} setUser={setUser} />
 
 {
  user && (
    <h1 className="text-gray-100 mx-10">In case of any issue, tell us with screenshot, We are working to make it cool! Thank You!</h1>
  )
 }
  </div>
    
    {
      user ? (
        <section>
    {
      tab === "text_to_speech" && (
        <TextToSpeech userList={userList} user={user} />
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
    </section>
      )
      :
      (
       <>
        
        <div className="flex flex-col gap-4 text-center py-10">
        <h1 className=" text-xl text-orange-500">Please login first</h1>
        <input type="text" className="py-4 px-4 outline-none border mx-2 text-sm  border-orange-500 duration-200 shadow-md focus:shadow-orange-600 rounded-md text-white" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" className="py-4 px-4 outline-none border mx-2 text-sm  border-orange-500 duration-200 shadow-md focus:shadow-orange-600 rounded-md text-white" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button
        onClick={() => login()}
        className="w-full cursor-pointer p-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700  transition disabled:bg-gray-800"
        >Login</button>
        </div>
       </>
      )
    }
    <MyFooter />
   </div>
  )
}

export default App
