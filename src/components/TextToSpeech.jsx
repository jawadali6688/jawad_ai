import React, { useEffect, useState } from "react";
import { ZyphraClient } from "@zyphra/client";
import VoicePlayer from "./VoicePlayer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
const TextToSpeech = () => {

  const messages = [
    "Grabbing some pixels...",
    "Just a sec... making it awesome!",
    "Loading magic... 🪄✨",
    "Still working... promise it’s worth it!",
    "Almost there... hold tight!",
    "Transforming bytes into fun!",
    "You’re gonna love this! 🧡",
    "Making data dance... 💃🕺",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const handleTextToSpeech = async () => {
    if (!text) {
        toast.error("Bhai kuch text to likh lo!");
        return;
    }
    if (!apiKey) {
        toast.error("Bhai API key to enter kro!");
        return;
    }
    if (!file) {
        toast.error("Bhai sample audio to do pehly!");
        return;
    }
    
    setLoading(true);
    setAudioUrl(null);

    try {
        const response = await axios.post(
            "https://api-backend-41dw.onrender.com/jawad_voice_generating",
            { text, sampleAudio: file, apiKey },
            {
                responseType: "arraybuffer", // Important for binary data
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Convert the response data into a Blob
        const responseBlob = new Blob([response.data], { type: "audio/mpeg" });

        // Generate a URL for the audio element
        const url = URL.createObjectURL(responseBlob);
        setAudioUrl(url);

        toast.success("Bhai voice ban gyii mzy kro!");
    } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while generating the audio.");
    } finally {
        setLoading(false);
    }
};



    // File validation function
    const validateFile = (file) => {
      return new Promise((resolve) => {
        if (!file) return resolve(false);
  
        const allowedExtensions = ["mp3", "wav"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const isValidType = allowedExtensions.includes(fileExtension);
        const isValidSize = file.size <= 5 * 1024 * 1024; // Max size 5MB
  
        if (!isValidType) {
          toast.error("Invalid file type. Only MP3 and WAV are allowed.");
          return resolve(false);
        }
  
        if (!isValidSize) {
          toast.error("File size must be under 5MB.");
          return resolve(false);
        }
  
        const objectUrl = URL.createObjectURL(file);
        const audio = new Audio(objectUrl);
  
        audio.onloadedmetadata = () => {
          if (audio.duration > 120) {
            toast.error("Audio duration must be under 2 minutes.");
            resolve(false);
          } else {
            resolve(true);
          }
          URL.revokeObjectURL(objectUrl); // Clean up URL
        };
  
        audio.onerror = () => {
          toast.error("Invalid audio file.");
          resolve(false);
          URL.revokeObjectURL(objectUrl); // Clean up URL
        };
      });
    };
  
    // Convert file to Base64
    const fileToBase64 = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };
  
    // Handle file selection
    const handleFileChange = async (e) => {
      const selectedFile = e.target.files[0];
  
      // Validate the file asynchronously
      const isValid = await validateFile(selectedFile);
  
      if (isValid) {
        const base64File = await fileToBase64(selectedFile);
        setFile(base64File);
        toast.success("File Selected!");
      } else {
        setFile(null);
        e.target.value = null;
      }
    };


  return (
    <>
    <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col lg:flex-row gap-5">
      {
        errorMessage && (
          <h1>
            Error occurred, please try again
          </h1>
        )
      }
        <div className="lg:w-[70%] bg-gray-800 p-1 rounded-lg">
        <textarea
          className="w-full h-[45vh] p-4 focus:outline-none text-white text-sm rounded-lg"
          value={text}
          maxLength={25000}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech"
        />
<div className="static mb-4 ml-2 text-gray-400 text-sm">
  <span>{text?.length || 0}</span> / <span>25000</span>
</div>
        <button
          onClick={handleTextToSpeech}
          className=" w-full cursor-pointer p-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700  transition disabled:bg-gray-800"
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center  ">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
            </div>
            <p className="mt-4 text-white font-semibold text-lg">
              {messages[messageIndex]}
            </p>
          </div>
          ) : "Generate"}
        </button>
        </div>

        <div className="lg:w-[30%] bg-gray-800 rounded-lg">
          <h1 className="py-2 text-center text-white text-md">Settings</h1>
                       <div className="flex flex-col gap-4">
                       <div className="flex flex-col ">
                        <span className="text-sm px-2 mb-2 text-green-600 border-b-2 pb-1 border-b-gray-500">
                          Please use mp3 or wav file with max size of 5mb for automatic voice cloning during voice generating.
                        </span>
                        <label htmlFor="" className="text-gray-200 px-4 pb-1">Sample Audio</label>
                       <input 
                       
                       type="file" accept=".mp3,.wav" className="py-4 px-4 outline-none border mx-2 text-sm  border-orange-500 duration-200 shadow-md focus:shadow-orange-600 rounded-md text-white" placeholder="Choose Audio File" onChange={(e) => handleFileChange(e)} />
                       </div>
                      
                       <div className="flex flex-col ">
                    
                         
                          <a 
                          target="_blank"
                          href="https://playground.zyphra.com/settings/api-keys" className="flex py-2 px-2 text-green-600 underline underline-offset-8 hover:text-orange-600">Click here to get API Key</a>
                        <label htmlFor="" className="text-gray-200 px-4 pb-1">API Key</label>
                       <input type="text" className="py-4 px-4 outline-none border mx-2 text-sm  border-orange-500 duration-200 shadow-md focus:shadow-orange-600 rounded-md text-white" placeholder="API Key" onChange={(e) => setApiKey(e.target.value)} />
                       </div>
                       </div>
        </div>


      
          
    
    </motion.div>

    {
      audioUrl && (
        <div className="mt-4">
            <VoicePlayer audioSrc={audioUrl} />
          </div>
      )
    }
    </>
  );
};

export default TextToSpeech;
