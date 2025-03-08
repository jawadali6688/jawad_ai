import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
// import toast from "react-hot-toast";

export default function VoicePlayer({ audioSrc, speakerName = "Unknown Speaker" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Handle seeking
  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  // Stop playing when audio ends
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl flex items-center space-x-4 shadow-md w-full">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700 transition cursor-pointer"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Voice Info & Seek Bar */}
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">
           Generated Voice
        </p>
        <div className="relative w-full h-2 bg-gray-700 rounded-lg mt-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 rounded-lg transition-all ease-in-out"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="text-gray-400 text-xs flex justify-between mt-1">
          {/* <span>{new Date(currentTime * 1000).toISOString().substring(14, 19)}</span> */}
          {/* <span>{new Date(duration * 1000).toISOString().substring(14, 19)}</span> */}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={() => {
          if (audioSrc) {
            const link = document.createElement("a");
            link.href = audioSrc;
            link.download = "generated_voice.wav";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // toast.error("No audio available to download.");
            alert("Error while downloading")
          }
        }}
        className="hover:text-white text-gray-400 cursor-pointer"
      >
        <Download size={26} />
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
        onEnded={handleEnded}
      />
    </div>
  );
}