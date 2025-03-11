import React from 'react'

export default function Navbar({tab, setTab, user, setUser}) {
  return (
    <div className='border border-gray-800 mx-8 my-4 rounded-lg shadow-lg shadow-gray-800 flex justify-center lg:justify-between items-start px-8 text-gray-100 py-4'>
      <div className="hidden lg:flex text-2xl font-bold text-white">JSF AI</div>

      <div className="lists flex justify-center items-center list-none gap-8">
        <li onClick={() => setTab("text_to_speech")} className={`cursor-pointer text-gray-200 hover:text-orange-600 duration-200 ${tab === "text_to_speech" && 'text-orange-600 underline underline-offset-8'}`}>Text to Speech</li>
        {/* <li onClick={() => setTab("clone_voice")} className={`cursor-pointer text-gray-200 hover:text-orange-600 duration-200 ${tab === "clone_voice" && 'text-orange-600 underline underline-offset-8'}`}>Voice Cloning</li> */}
        <li onClick={() => setTab("instructions")} className={`cursor-pointer text-gray-200 hover:text-orange-600 duration-200 ${tab === "instructions" && 'text-orange-600 underline underline-offset-8'}`}>Instructions</li>
       {
        user && (
          <li>
          <button
          onClick={() => {
            localStorage.removeItem("user")
            setUser(null)
          }}
          className='w-full cursor-pointer py-2 px-4 bg-orange-600 text-white font-bold rounded hover:bg-orange-700  transition disabled:bg-gray-800'
          >Logout</button>
        </li>
        )
       }
      </div>
    </div>
  )
}
