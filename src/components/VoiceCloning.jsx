import { useState } from "react";
import { FiUploadCloud, FiMusic, FiCheckCircle } from "react-icons/fi";

const VoiceCloning = ({clonedVoices, setClonedVoices}) => {
  const [file, setFile] = useState(null);
    const [voiceName, setVoiceName] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["mp3", "wav"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isValidType = allowedExtensions.includes(fileExtension);
    const isValidSize = file.size <= 50 * 1024 * 1024;

    if (!isValidType) {
      alert("Invalid file type. Only MP3 and WAV are allowed.")
      return false;
    }
    if (!isValidSize) {
      alert("File size must be under 50MB.")
      return false;
    }

    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      if (audio.duration > 1200) {
        alert("Audio duration must be under 20 minutes.")
        setFile(null);
      }
    };
    return true;
  };

  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
        const base64File = await fileToBase64(selectedFile);
        setFile(base64File);
        alert("File selected successfully!")
    }
  };

  

function cloneVoice() {
    setIsProcessing(true)
    const data = {
        name: voiceName,
        audioFile: file
    }
    const dataForAddition = [clonedVoices,  JSON.stringify(data)]
    console.log(dataForAddition)
    localStorage.setItem("voices", dataForAddition)
    setIsProcessing(false)
}

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Voice Cloning</h2>

      <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-800 transition duration-200">
        <input type="file" accept=".mp3,.wav" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label htmlFor="fileUpload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 bg-gray-700 rounded-full">
              <FiUploadCloud className="text-orange-500 text-3xl" />
            </div>
            <p className="text-gray-400">Click or Drag & Drop your audio file (MP3, WAV)</p>
          </div>
        </label>
      </div>

      {file && (
        <p className="text-green-400 mt-2 text-center flex items-center justify-center gap-2">
          <FiMusic /> {file.name}
        </p>
      )}

      

      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Name Your Cloned Voice</label>
        <input
          type="text"
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          className="p-2 w-full border rounded-md bg-gray-700 text-white focus:border-orange-500"
          maxLength="30"
        />
      </div>

      <button
      onClick={() => cloneVoice()}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-all cursor-pointer"
      >
        {isProcessing ? (
          <><span className="animate-spin">⏳</span> Processing...</>
        ) : (
          <><FiCheckCircle />Clone Voice</>
        )}
      </button>
    </div>
  );
};

export default VoiceCloning;
