import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff } from "lucide-react";

interface CallOverlayProps {
  onAnswer: () => void;
  onDecline: () => void;
  onShow: () => void;
}

export default function CallOverlay({
  onAnswer,
  onDecline,
  onShow,
}: CallOverlayProps) {
  const [callDuration, setCallDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const callerImage = "";
  const callerName = "Sandra";
  const callerNumber = "=381 60 000 000";

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    onShow();

    audioRef.current = new Audio("/sounds/ringtone.mp3"); // You'll need to add this file to your public folder

    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onAnswer();
  };

  const handleDecline = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onDecline();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-purple-900 bg-opacity-95 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800 to-gray-900 opacity-80"></div>

      <div className="z-10 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Caller Profile */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {callerImage ? (
              <img
                src={callerImage}
                alt={callerName}
                className="h-32 w-32 rounded-full object-cover border-4 border-purple-400"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-purple-700 flex items-center justify-center border-4 border-purple-400">
                <span className="text-5xl font-bold">
                  {callerName.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute bottom-2 right-0 h-5 w-5 rounded-full bg-green-400 border-2 border-white"></div>
          </div>

          <h1 className="mt-6 text-3xl font-bold">{callerName}</h1>
          <p className="mt-2 text-purple-200">{callerNumber}</p>
          <p className="mt-4 text-lg text-gray-300">Incoming call...</p>
          <p className="mt-2 text-md text-gray-400">
            {formatTime(callDuration)}
          </p>
        </div>

        {/* Call Controls */}
        <div className="flex gap-24 mt-12">
          <button
            onClick={handleDecline}
            className="flex flex-col items-center space-y-2 transition-transform transform hover:scale-110"
          >
            <div className="p-5 rounded-full bg-red-600 hover:bg-red-700 shadow-lg">
              <PhoneOff size={32} />
            </div>
            <span className="text-sm">Decline</span>
          </button>

          <button
            onClick={handleAnswer}
            className="flex flex-col items-center space-y-2 transition-transform transform hover:scale-110"
          >
            <div className="p-5 rounded-full bg-green-600 hover:bg-green-700 shadow-lg">
              <Phone size={32} />
            </div>
            <span className="text-sm">Answer</span>
          </button>
        </div>
      </div>

      {/* Decorative pulsing rings */}
      <div className="absolute z-0 w-64 h-64 rounded-full border-4 border-purple-500 opacity-20 animate-ping"></div>
      <div
        className="absolute z-0 w-80 h-80 rounded-full border-4 border-purple-400 opacity-10 animate-ping"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
}
